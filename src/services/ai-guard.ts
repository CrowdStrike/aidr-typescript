import { Client } from '../client';
import type { RequestOptions } from '../internal/request-options';
import type { MaybeAcceptedResponse } from '../types';
import type {
  AidrPostV1GuardChatCompletionsResponse,
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
    MaybeAcceptedResponse<AidrPostV1GuardChatCompletionsResponse['result']>
  > {
    return this.post('/v1/guard_chat_completions', {
      body,
      ...options,
    });
  }
}
