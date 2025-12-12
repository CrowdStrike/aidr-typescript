import type { FinalRequestOptions } from './request-options';

export type APIResponseProps = {
  controller: AbortController;
  options: FinalRequestOptions;
  response: Response;
};

export async function defaultParseResponse<T>(
  props: APIResponseProps
): Promise<T> {
  const { response } = props;
  return await (async () => {
    if (response.status === 204) {
      return null as T;
    }

    const contentType = response.headers.get('content-type');
    const mediaType = contentType?.split(';')[0]?.trim();
    const isJSON =
      mediaType?.includes('application/json') || mediaType?.endsWith('+json');
    if (isJSON) {
      const json = await response.json();
      return json as T;
    }

    const text = await response.text();
    return text as unknown as T;
  })();
}
