import { Client } from '../client';
import type { RequestOptions } from '../internal/request-options';
import type { MaybeAcceptedResponse } from '../types';
import type {
  AidrPostV1GuardChatCompletionsResponses,
  AidrPostV1UnredactData,
  AidrPostV1UnredactResponses,
  ChatCompletionsGuard,
} from '../types/ai-guard';

export class AIGuard extends Client {
  serviceName = 'aiguard';

  /**
   * Analyze and redact content to avoid manipulation of the model, addition of
   * malicious content, and other undesirable data transfers.
   */
  guardChatCompletions(
    body: ChatCompletionsGuard,
    options?: RequestOptions
  ): Promise<
    MaybeAcceptedResponse<
      AidrPostV1GuardChatCompletionsResponses[200]['result']
    >
  > {
    return this.post('/v1/guard_chat_completions', {
      body,
      ...options,
    });
  }

  /**
   * Decrypt or unredact fpe redactions
   */
  unredact(
    body: AidrPostV1UnredactData['body'],
    options?: RequestOptions
  ): Promise<
    MaybeAcceptedResponse<AidrPostV1UnredactResponses[200]['result']>
  > {
    return this.post('/v1/unredact', { body, ...options });
  }
}
