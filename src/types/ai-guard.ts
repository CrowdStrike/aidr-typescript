/** biome-ignore-all lint/style/useConsistentArrayType: generated. */

/**
 * Response Schema
 *
 * Pangea standard response schema
 */
export type PangeaResponse = {
  /**
   * A unique identifier assigned to each request made to the API. It is used to track and identify a specific request and its associated data. The `request_id` can be helpful for troubleshooting, auditing, and tracing the flow of requests within the system. It allows users to reference and retrieve information related to a particular request, such as the response, parameters, and raw data associated with that specific request.
   *
   * ```
   * "request_id":"prq_x6fdiizbon6j3bsdvnpmwxsz2aan7fqd"
   * ```
   */
  request_id: string;
  /**
   * The timestamp indicates the exact moment when a request is made to the API. It represents the date and time at which the request was initiated by the client. The `request_time` is useful for tracking and analyzing the timing of requests, measuring response times, and monitoring performance metrics. It allows users to determine the duration between the request initiation and the corresponding response, aiding in the assessment of API performance and latency.
   *
   * ```
   * "request_time":"2022-09-21T17:24:33.105Z"
   * ```
   */
  request_time: string;
  /**
   * Duration it takes for the API to process a request and generate a response. It represents the elapsed time from when the request is received by the API to when the corresponding response is returned to the client.
   *
   * ```
   * "response_time":"2022-09-21T17:24:34.007Z"
   * ```
   */
  response_time: string;
  /**
   * It represents the status or outcome of the API request made for IP information. It indicates the current state or condition of the request and provides information on the success or failure of the request.
   *
   * ```
   * "status":"success"
   * ```
   */
  status: string;
  /**
   * Provides a concise and brief overview of the purpose or primary objective of the API endpoint. It serves as a high-level summary or description of the functionality or feature offered by the endpoint.
   */
  summary?: string;
  result?: {
    [key: string]: unknown;
  };
};

export type PangeaValidationErrors = PangeaResponse;

export type PangeaAcceptedResponse = PangeaResponse;

/**
 * Device status. Allowed values are active, pending, disabled
 */
export type AidrDeviceStatus = 'pending' | 'active' | 'disabled';

export type AidrIpv4OrV6 = string;

export type AidrDevice = {
  /**
   * client generated unique ID.
   */
  id: string;
  /**
   * Device name
   */
  name?: string;
  status?: AidrDeviceStatus;
  /**
   * Arbitrary device metadata.
   */
  metadata?: {
    [key: string]: unknown;
  };
  /**
   * Owning user identifier.
   */
  user_id?: string;
  /**
   * Last observed IP address for this device.
   */
  last_used_ip?: AidrIpv4OrV6;
};

export type AidrDeviceCheckResult = {
  device?: AidrDeviceResult;
  config?: AidrServiceConfigResult;
  access_token?: AidrDeviceTokenInfo;
};

export type AidrDeviceTokenInfo = {
  /**
   * The access token issued for given device.
   */
  token?: string;
  /**
   * The lifetime in seconds of the access token.
   */
  expires_in?: number;
  /**
   * Timestamp when the record when token is created (RFC 3339 format)
   */
  created_at?: string;
};

export type AidrDeviceResult = {
  /**
   * client generated unique ID.
   */
  id: string;
  /**
   * Device name
   */
  name?: string;
  status: AidrDeviceStatus;
  /**
   * Arbitrary device metadata.
   */
  metadata?: {
    [key: string]: unknown;
  };
  /**
   * Owning user identifier (UUID/string).
   */
  user_id?: string;
  /**
   * Last observed IP address for this device.
   */
  last_used_ip?: AidrIpv4OrV6;
  /**
   * Timestamp when the record was created (RFC 3339 format)
   */
  created_at?: string;
  /**
   * Timestamp when the record was last updated (RFC 3339 format)
   */
  updated_at?: string;
};

/**
 * client generated unique ID.
 */
export type AidrDeviceId = string;

/**
 * List or filter/search device records.
 */
export type AidrDeviceSearch = {
  filter?: {
    /**
     * Only records where created_at equals this value.
     */
    created_at?: string;
    /**
     * Only records where created_at is greater than this value.
     */
    created_at__gt?: string;
    /**
     * Only records where created_at is greater than or equal to this value.
     */
    created_at__gte?: string;
    /**
     * Only records where created_at is less than this value.
     */
    created_at__lt?: string;
    /**
     * Only records where created_at is less than or equal to this value.
     */
    created_at__lte?: string;
    /**
     * Only records where updated_at equals this value.
     */
    updated_at?: string;
    /**
     * Only records where updated_at is greater than this value.
     */
    updated_at__gt?: string;
    /**
     * Only records where updated_at is greater than or equal to this value.
     */
    updated_at__gte?: string;
    /**
     * Only records where updated_at is less than this value.
     */
    updated_at__lt?: string;
    /**
     * Only records where updated_at is less than or equal to this value.
     */
    updated_at__lte?: string;
    /**
     * Only records where id is equal to the value
     */
    id?: string;
    /**
     * Only records where id includes each substring.
     */
    id__contains?: Array<string>;
    /**
     * Only records where id equals one of the provided substrings.
     */
    id__in?: Array<string>;
    /**
     * Only records where name is equal to the value
     */
    name?: string;
    /**
     * Only records where name includes each substring.
     */
    name__contains?: Array<string>;
    /**
     * Only records where name equals one of the provided substrings.
     */
    name__in?: Array<string>;
    /**
     * Only records where status is equal to the value
     */
    status?: AidrDeviceStatus;
    /**
     * Only records where status includes each substring.
     */
    status__contains?: Array<AidrDeviceStatus>;
    /**
     * Only records where status equals one of the provided substrings.
     */
    status__in?: Array<AidrDeviceStatus>;
  };
  /**
   * Reflected value from a previous response to obtain the next page of results.
   */
  last?: string;
  /**
   * Order results asc(ending) or desc(ending).
   */
  order?: 'asc' | 'desc';
  /**
   * Which field to order results by.
   */
  order_by?: 'name' | 'created_at' | 'updated_at';
  /**
   * Maximum results to include in the response.
   */
  size?: number;
};

export type AidrDeviceSearchResult = {
  /**
   * Pagination count of returned records
   */
  count?: number;
  /**
   * Pagination last cursor
   */
  last?: string;
  devices?: Array<AidrDeviceResult>;
};

/**
 * MetricEvent data
 */
export type AidrMetricOnlyData = {
  /**
   * Application ID
   */
  app_id?: string;
  /**
   * Actor/User ID
   */
  actor_id?: string;
  /**
   * LLM provider name
   */
  llm_provider?: string;
  /**
   * Model name
   */
  model?: string;
  /**
   * Version of the model
   */
  model_version?: string;
  /**
   * Number of tokens in the request
   */
  request_token_count?: number;
  /**
   * Number of tokens in the response
   */
  response_token_count?: number;
  /**
   * Source IP address
   */
  source_ip?: string;
  /**
   * Geographic source location
   */
  source_location?: string;
  /**
   * Type of event
   */
  event_type?: string;
  /**
   * Unique collector instance ID
   */
  collector_instance_id?: string;
  /**
   * Additional metadata as key-value pairs
   */
  extra_info?: {
    [key: string]: unknown;
  };
};

/**
 * List or filter/search saved filter records.
 */
export type AidrSavedFilterSearch = {
  filter?: {
    /**
     * Only records where created_at equals this value.
     */
    created_at?: string;
    /**
     * Only records where created_at is greater than this value.
     */
    created_at__gt?: string;
    /**
     * Only records where created_at is greater than or equal to this value.
     */
    created_at__gte?: string;
    /**
     * Only records where created_at is less than this value.
     */
    created_at__lt?: string;
    /**
     * Only records where created_at is less than or equal to this value.
     */
    created_at__lte?: string;
    /**
     * Only records where updated_at equals this value.
     */
    updated_at?: string;
    /**
     * Only records where updated_at is greater than this value.
     */
    updated_at__gt?: string;
    /**
     * Only records where updated_at is greater than or equal to this value.
     */
    updated_at__gte?: string;
    /**
     * Only records where updated_at is less than this value.
     */
    updated_at__lt?: string;
    /**
     * Only records where updated_at is less than or equal to this value.
     */
    updated_at__lte?: string;
    /**
     * Only records where id is equal to the value
     */
    id?: string;
    /**
     * Only records where id includes each substring.
     */
    id__contains?: Array<string>;
    /**
     * Only records where id equals one of the provided substrings.
     */
    id__in?: Array<string>;
    /**
     * Only records where name is equal to the value
     */
    name?: string;
    /**
     * Only records where name includes each substring.
     */
    name__contains?: Array<string>;
    /**
     * Only records where name equals one of the provided substrings.
     */
    name__in?: Array<string>;
  };
  /**
   * Reflected value from a previous response to obtain the next page of results.
   */
  last?: string;
  /**
   * Order results asc(ending) or desc(ending).
   */
  order?: 'asc' | 'desc';
  /**
   * Which field to order results by.
   */
  order_by?: 'name' | 'created_at' | 'updated_at';
  /**
   * Maximum results to include in the response.
   */
  size?: number;
};

export type AidrSavedFilterSearchResult = {
  /**
   * Pagination count of returned records
   */
  count?: number;
  /**
   * Pagination last cursor
   */
  last?: string;
  saved_filters?: Array<AidrSavedFilterResult>;
};

export type AidrSavedFilter = {
  /**
   * Unique name for the saved filter
   */
  name: string;
  /**
   * Filter details
   */
  filter: {
    [key: string]: unknown;
  };
};

export type AidrSavedFilterResult = {
  /**
   * Unique name for the saved filter
   */
  name: string;
  /**
   * Filter details
   */
  filter: {
    [key: string]: unknown;
  };
  /**
   * Timestamp when the record was created (RFC 3339 format)
   */
  created_at: string;
  /**
   * Timestamp when the record was last updated (RFC 3339 format)
   */
  updated_at: string;
};

/**
 * List or filter/search field alias records.
 */
export type AidrFieldAliasSearch = {
  filter?: {
    /**
     * Only records where created_at equals this value.
     */
    created_at?: string;
    /**
     * Only records where created_at is greater than this value.
     */
    created_at__gt?: string;
    /**
     * Only records where created_at is greater than or equal to this value.
     */
    created_at__gte?: string;
    /**
     * Only records where created_at is less than this value.
     */
    created_at__lt?: string;
    /**
     * Only records where created_at is less than or equal to this value.
     */
    created_at__lte?: string;
    /**
     * Only records where field name is equal to the value
     */
    field_name?: string;
    /**
     * Only records where field name includes each substring.
     */
    field_name__contains?: Array<string>;
    /**
     * Only records where name equals one of the provided substrings.
     */
    field_name__in?: Array<string>;
    /**
     * Only records where field type equals this value.
     */
    field_type?: string;
    /**
     * Only records where field type includes each substring.
     */
    field_type__contains?: Array<string>;
    /**
     * Only records where field type equals one of the provided substrings.
     */
    field_type__in?: Array<string>;
    /**
     * Only records where field alias equals this value.
     */
    field_alias?: string;
    /**
     * Only records where field alias includes each substring.
     */
    field_alias__contains?: Array<string>;
    /**
     * Only records where field alias equals one of the provided substrings.
     */
    field_alias__in?: Array<string>;
    /**
     * Only records where updated_at equals this value.
     */
    updated_at?: string;
    /**
     * Only records where updated_at is greater than this value.
     */
    updated_at__gt?: string;
    /**
     * Only records where updated_at is greater than or equal to this value.
     */
    updated_at__gte?: string;
    /**
     * Only records where updated_at is less than this value.
     */
    updated_at__lt?: string;
    /**
     * Only records where updated_at is less than or equal to this value.
     */
    updated_at__lte?: string;
  };
  /**
   * Reflected value from a previous response to obtain the next page of results.
   */
  last?: string;
  /**
   * Order results asc(ending) or desc(ending).
   */
  order?: 'asc' | 'desc';
  /**
   * Which field to order results by.
   */
  order_by?:
    | 'field_name'
    | 'field_type'
    | 'created_at'
    | 'updated_at'
    | 'published_at'
    | 'field_alias';
  /**
   * Maximum results to include in the response.
   */
  size?: number;
};

export type AidrFieldAliasSearchResult = {
  /**
   * Pagination limit
   */
  count?: number;
  /**
   * Pagination last count
   */
  last?: string;
  items?: Array<AidrFieldAliasResult>;
};

export type AidrCustomlist = {
  /**
   * Name of the list
   */
  name?: string;
  /**
   * Type of the list
   */
  type?: 'site';
  /**
   * Content of the list based on type
   */
  content?: Array<unknown>;
};

export type ChatCompletionsGuard = {
  /**
   * 'messages' contains Prompt content and role array in JSON format. The `content` is the multimodel text or image input that will be analyzed.  Additional properties such as 'tools' may be provided for analysis.
   */
  guard_input: {
    [key: string]: unknown;
  };
  /**
   * Id of source application/agent
   */
  app_id?: string;
  /**
   * User/Service account id/service account
   */
  user_id?: string;
  /**
   * Underlying LLM.  Example: 'OpenAI'.
   */
  llm_provider?: string;
  /**
   * Model used to perform the event. Example: 'gpt'.
   */
  model?: string;
  /**
   * Model version used to perform the event. Example: '3.5'.
   */
  model_version?: string;
  /**
   * IP address of user or app or agent.
   */
  source_ip?: string;
  /**
   * Location of user or app or agent.
   */
  source_location?: string;
  /**
   * For gateway-like integrations with multi-tenant support.
   */
  tenant_id?: string;
  /**
   * (AIDR) Event Type.
   */
  event_type?: string;
  /**
   * (AIDR) collector instance id.
   */
  collector_instance_id?: string;
  /**
   * (AIDR) Logging schema.
   */
  extra_info?: {
    /**
     * Name of source application/agent.
     */
    app_name?: string;
    /**
     * The group of source application/agent.
     */
    app_group?: string;
    /**
     * Version of the source application/agent.
     */
    app_version?: string;
    /**
     * Name of subject actor/service account.
     */
    actor_name?: string;
    /**
     * The group of subject actor.
     */
    actor_group?: string;
    /**
     * Geographic region or data center.
     */
    source_region?: string;
    /**
     * Sub tenant of the user or organization
     */
    sub_tenant?: string;
    /**
     * MCP tools grouped by server
     *
     * Each item groups tools for a given MCP server.
     */
    mcp_tools?: Array<{
      /**
       * MCP server name
       */
      server_name: string;
      tools: Array<string>;
    }>;
    [key: string]:
      | unknown
      | string
      | Array<{
          /**
           * MCP server name
           */
          server_name: string;
          tools: Array<string>;
        }>
      | undefined;
  };
  /**
   * FPE (Format Preserving Encryption) context from a previous guard request. When provided, the encrypted input will be unredacted before processing.
   */
  input_fpe_context?: string;
};

export type AidrPromptInjectionResult = {
  /**
   * The action taken by this Detector
   */
  action?: string;
  /**
   * Triggered prompt injection analyzers.
   */
  analyzer_responses?: Array<{
    analyzer: string;
    confidence: number;
  }>;
};

export type AidrRedactEntityResult = {
  /**
   * Detected redaction rules.
   */
  entities?: Array<{
    /**
     * The action taken on this Entity
     */
    action: string;
    type: string;
    value: string;
    start_pos?: number;
  }>;
};

export type AidrMaliciousEntityResult = {
  /**
   * Detected harmful items.
   */
  entities?: Array<{
    type: string;
    value: string;
    start_pos?: number;
    raw?: {
      [key: string]: unknown;
    };
  }>;
};

export type AidrSingleEntityResult = {
  /**
   * The action taken by this Detector
   */
  action?: string;
  /**
   * Detected entities.
   */
  entities?: Array<string>;
};

export type AidrLanguageResult = {
  /**
   * The action taken by this Detector
   */
  action?: string;
  language?: string;
};

export type AidrTopicResult = {
  /**
   * The action taken by this Detector
   */
  action?: string;
  /**
   * List of topics detected
   */
  topics?: Array<{
    topic: string;
    confidence: number;
  }>;
};

/**
 * Result of the recipe evaluating configured rules
 */
export type AidrAccessRulesResponse = {
  [key: string]: unknown | AccessRuleResult;
};

export type AidrPolicy = {
  /**
   * Unique identifier for the policy
   */
  key: string;
  /**
   * A friendly display name for the policy
   */
  name: string;
  /**
   * A detailed description for the policy
   */
  description?: string;
  /**
   * The schema version used for the policy definition
   */
  schema_version: 'v1.1';
  /**
   * Settings for Detectors, including which detectors to enable and how they behave
   */
  detector_settings?: DetectorSettings;
  /**
   * Configuration for access rules used in an AIDR policy.
   */
  access_rules?: Array<AccessRuleSettings>;
  /**
   * Connector-level Redact configuration. These settings allow you to define reusable redaction parameters, such as FPE tweak value.
   */
  connector_settings?: {
    /**
     * Settings for Redact integration at the policy level
     */
    redact?: {
      /**
       * ID of a Vault secret containing the tweak value used for Format-Preserving Encryption (FPE). Enables deterministic encryption, ensuring that identical inputs produce consistent encrypted outputs.
       */
      fpe_tweak_vault_secret_id?: string;
    };
  };
};

export type AidrCustomlistResult = {
  /**
   * Unique identifier for the list
   */
  id?: string;
  /**
   * Name of the list
   */
  name?: string;
  /**
   * Type of the list
   */
  type?: 'site';
  /**
   * Content of the list
   */
  content?: Array<{
    [key: string]: unknown;
  }>;
  created_at?: string;
  updated_at?: string;
};

export type AidrPolicyResult = {
  id: PolicyId;
  /**
   * Unique identifier for the policy
   */
  key: string;
  /**
   * A friendly display name for the policy
   */
  name: string;
  /**
   * A detailed description for the policy
   */
  description?: string;
  /**
   * The schema version used for the policy definition
   */
  schema_version: 'v1.1';
  /**
   * The current revision of the policy
   */
  revision: number;
  /**
   * Settings for Detectors, including which detectors to enable and how they behave
   */
  detector_settings?: DetectorSettings;
  /**
   * Configuration for access rules used in an AIDR policy.
   */
  access_rules?: Array<AccessRuleSettings>;
  /**
   * Connector-level Redact configuration. These settings allow you to define reusable redaction parameters, such as FPE tweak value.
   */
  connector_settings?: {
    /**
     * Settings for Redact integration at the policy level
     */
    redact?: {
      /**
       * ID of a Vault secret containing the tweak value used for Format-Preserving Encryption (FPE). Enables deterministic encryption, ensuring that identical inputs produce consistent encrypted outputs.
       */
      fpe_tweak_vault_secret_id?: string;
    };
  };
  /**
   * Timestamp when the record was created (RFC 3339 format)
   */
  created_at?: string;
  /**
   * Timestamp when the record was last updated (RFC 3339 format)
   */
  updated_at?: string;
};

export type AidrPolicyDefaults = {
  default_policies: {
    [key: string]: unknown | RecipeConfig;
  };
};

/**
 * List or filter/search policy records.
 */
export type AidrPolicySearch = {
  filter?: {
    /**
     * Only records where key is equal to the value
     */
    key?: string;
    /**
     * Only records where key includes each substring.
     */
    key__contains?: Array<string>;
    /**
     * Only records where name equals one of the provided substrings.
     */
    name__in?: Array<string>;
    /**
     * Only records where status equals this value.
     */
    status?: string;
  };
  /**
   * Reflected value from a previous response to obtain the next page of results.
   */
  last?: string;
  /**
   * Order results asc(ending) or desc(ending).
   */
  order?: 'asc' | 'desc';
  /**
   * Which field to order results by.
   */
  order_by?: 'key' | 'name' | 'created_at' | 'updated_at';
  /**
   * Maximum results to include in the response.
   */
  size?: number;
};

export type AidrPolicySearchResult = {
  /**
   * Pagination limit
   */
  count?: number;
  /**
   * Pagination last count
   */
  last?: string;
  policies?: Array<AidrPolicyResult>;
};

export type AidrPromptItemListResult = {
  policies?: Array<AidrPromptItem>;
};

export type AidrPromptItem = {
  /**
   * Unique id for the item
   */
  id?: string;
  /**
   * Type for the item
   */
  type?: string;
  /**
   * Data for the item
   */
  content?: string;
};

export type AidrFieldAlias = {
  /**
   * Unique name for the field
   */
  field_name: string;
  /**
   * Field type
   */
  field_type: string;
  /**
   * Alternate display name or alias
   */
  field_alias: string;
  /**
   * Array of tag strings
   */
  field_tags?: Array<string>;
};

export type AidrFieldAliasResult = {
  /**
   * Unique name for the field
   */
  field_name: string;
  /**
   * Field type
   */
  field_type: string;
  /**
   * Alternate display name or alias
   */
  field_alias: string;
  /**
   * Array of tag strings
   */
  field_tags?: Array<string>;
  /**
   * Timestamp when the record was created (RFC 3339 format)
   */
  created_at: string;
  /**
   * Timestamp when the record was last updated (RFC 3339 format)
   */
  updated_at: string;
};

export type AidrPolicycollectionResult = {
  /**
   * Unique identifier for the policy collection
   */
  key?: string;
  /**
   * Name of the policy collection
   */
  name?: string;
  /**
   * Type of the policy collection
   */
  type?: 'logging' | 'gateway' | 'browser' | 'application' | 'agentic';
  /**
   * Settings for the policy collection
   */
  settings?: {
    [key: string]: unknown;
  };
  created_at?: string;
  updated_at?: string;
};

/**
 * List or filter/search policy collection records.
 */
export type AidrPolicycollectionSearch = {
  filter?: {
    /**
     * Only records where created_at equals this value.
     */
    created_at?: string;
    /**
     * Only records where created_at is greater than this value.
     */
    created_at__gt?: string;
    /**
     * Only records where created_at is greater than or equal to this value.
     */
    created_at__gte?: string;
    /**
     * Only records where created_at is less than this value.
     */
    created_at__lt?: string;
    /**
     * Only records where created_at is less than or equal to this value.
     */
    created_at__lte?: string;
    /**
     * Only records where updated_at equals this value.
     */
    updated_at?: string;
    /**
     * Only records where updated_at is greater than this value.
     */
    updated_at__gt?: string;
    /**
     * Only records where updated_at is greater than or equal to this value.
     */
    updated_at__gte?: string;
    /**
     * Only records where updated_at is less than this value.
     */
    updated_at__lt?: string;
    /**
     * Only records where updated_at is less than or equal to this value.
     */
    updated_at__lte?: string;
    /**
     * Only records where type is equal to the value
     */
    type?: 'logging' | 'gateway' | 'browser' | 'application' | 'agentic';
    /**
     * Only records where type equals one of the provided values.
     */
    type__in?: Array<
      'logging' | 'gateway' | 'browser' | 'application' | 'agentic'
    >;
    /**
     * Only records where key is equal to the value
     */
    key?: string;
    /**
     * Only records where key includes each substring.
     */
    key__contains?: Array<string>;
    /**
     * Only records where key equals one of the provided substrings.
     */
    key__in?: Array<string>;
    /**
     * Only records where name is equal to the value
     */
    name?: string;
    /**
     * Only records where name includes each substring.
     */
    name__contains?: Array<string>;
    /**
     * Only records where name equals one of the provided substrings.
     */
    name__in?: Array<string>;
  };
  /**
   * Reflected value from a previous response to obtain the next page of results.
   */
  last?: string;
  /**
   * Order results asc(ending) or desc(ending).
   */
  order?: 'asc' | 'desc';
  /**
   * Which field to order results by.
   */
  order_by?: 'key' | 'name' | 'type' | 'created_at' | 'updated_at';
  /**
   * Maximum results to include in the response.
   */
  size?: number;
};

export type AidrPolicycollectionSearchResult = {
  collections?: Array<AidrPolicycollectionResult>;
  /**
   * Total number of policy collections
   */
  count?: number;
  /**
   * Pagination cursor
   */
  last?: string;
};

/**
 * List or filter/search list records.
 */
export type AidrCustomlistSearch = {
  filter?: {
    /**
     * Only records where created_at equals this value.
     */
    created_at?: string;
    /**
     * Only records where created_at is greater than this value.
     */
    created_at__gt?: string;
    /**
     * Only records where created_at is greater than or equal to this value.
     */
    created_at__gte?: string;
    /**
     * Only records where created_at is less than this value.
     */
    created_at__lt?: string;
    /**
     * Only records where created_at is less than or equal to this value.
     */
    created_at__lte?: string;
    /**
     * Only records where updated_at equals this value.
     */
    updated_at?: string;
    /**
     * Only records where updated_at is greater than this value.
     */
    updated_at__gt?: string;
    /**
     * Only records where updated_at is greater than or equal to this value.
     */
    updated_at__gte?: string;
    /**
     * Only records where updated_at is less than this value.
     */
    updated_at__lt?: string;
    /**
     * Only records where updated_at is less than or equal to this value.
     */
    updated_at__lte?: string;
    /**
     * Only records where type is equal to the value
     */
    type?: string;
    /**
     * Only records where name is equal to the value
     */
    name?: string;
    /**
     * Only records where name includes each substring.
     */
    name__contains?: Array<string>;
    /**
     * Only records where name equals one of the provided substrings.
     */
    name__in?: Array<string>;
  };
  /**
   * Reflected value from a previous response to obtain the next page of results.
   */
  last?: string;
  /**
   * Order results asc(ending) or desc(ending).
   */
  order?: 'asc' | 'desc';
  /**
   * Which field to order results by.
   */
  order_by?: 'id' | 'name' | 'created_at' | 'updated_at';
  /**
   * Maximum results to include in the response.
   */
  size?: number;
};

export type AidrCustomlistSearchResult = {
  lists?: Array<AidrCustomlistResult>;
  /**
   * Total number of lists
   */
  count?: number;
  /**
   * Pagination cursor
   */
  last?: string;
};

/**
 * AIDR Collector Summary list
 */
export type AidrSensorInsights = {
  /**
   * set to get instance level data
   */
  is_instance_data?: boolean;
  /**
   * Optional filters of the form `<field>__contains` or `<field>__in`
   */
  filters?: {
    /**
     * Only records where id equals this value.
     */
    collector_id?: string;
    /**
     * Only records where id includes each substring.
     */
    collector_id__contains?: Array<string>;
    /**
     * Only records where id equals one of the provided substrings.
     */
    collector_id__in?: Array<string>;
    /**
     * Only records where instance id equals this value.
     */
    instance_id?: string;
    /**
     * Only records where id includes each substring.
     */
    instance_id__contains?: Array<string>;
    /**
     * Only records where id equals one of the provided substrings.
     */
    instance_id__in?: Array<string>;
    /**
     * Only records where sensor type equals this value.
     */
    collector_type?: string;
    /**
     * Only records where id includes each substring.
     */
    collector_type_contains?: Array<string>;
    /**
     * Only records where id equals one of the provided substrings.
     */
    collector_type__in?: Array<string>;
  };
  /**
   * field to sort by
   */
  order_by?: string;
  /**
   * Sort direction (default: asc)
   */
  order?: 'asc' | 'desc';
  /**
   * Pagination limit
   */
  count?: number;
  /**
   * Pagination last count
   */
  last?: string;
};

/**
 * AIDR Collector Summary Result Data
 */
export type AidrSensorInsightsResult = {
  /**
   * Pagination limit
   */
  count?: number;
  /**
   * Pagination last count
   */
  last?: string;
  items?: Array<AidrSensorInsightsItem>;
};

/**
 * AIDR Collector Summary Result Data
 */
export type AidrSensorInsightsItem = {
  /**
   * latest updated time
   */
  updated_at: string;
  /**
   * created time
   */
  created_at: string;
  /**
   * total event counts
   */
  count: number;
  collector_id: ServiceConfigId;
  /**
   * Collector instance id
   */
  instance_id?: string;
  /**
   * collector type
   */
  collector_type: string;
};

/**
 * AIDR Service Config Settings
 */
export type AidrServiceConfig = {
  id?: ServiceConfigId;
  name?: string;
  version?: string;
  metric_pool_rid?: AidrMetricpoolId;
  updated_at?: AidrTimestamp;
  collector_type?: string;
  /**
   * Collector type specific settings.
   */
  settings?: {
    [key: string]: unknown;
  };
  warning_threshold?: AidrGolangDuration;
  in_active_threshold?: AidrGolangDuration;
  [key: string]:
    | unknown
    | ServiceConfigId
    | string
    | AidrMetricpoolId
    | AidrTimestamp
    | {
        [key: string]: unknown;
      }
    | AidrGolangDuration
    | undefined;
};

/**
 * Duration string (e.g., '100ms', '2h')
 */
export type AidrGolangDuration = unknown | unknown;

/**
 * List or filter/config records.
 */
export type AidrServiceConfigList = {
  filter?: {
    /**
     * Only records where name equals this value.
     */
    name?: string;
    /**
     * Only records where name includes each substring.
     */
    name__contains?: Array<string>;
    /**
     * Only records where name equals one of the provided substrings.
     */
    name__in?: Array<string>;
    /**
     * Only records where collector_type equals this value.
     */
    collector_type?: string;
    /**
     * Only records where collector_type includes each substring.
     */
    collector_type__contains?: Array<string>;
    /**
     * Only records where collector_type equals one of the provided substrings.
     */
    collector_type__in?: Array<string>;
    /**
     * Only records where id equals this value.
     */
    id?: string;
    /**
     * Only records where id includes each substring.
     */
    id__contains?: Array<string>;
    /**
     * Only records where id equals one of the provided substrings.
     */
    id__in?: Array<string>;
    /**
     * Only records where created_at equals this value.
     */
    created_at?: string;
    /**
     * Only records where created_at is greater than this value.
     */
    created_at__gt?: string;
    /**
     * Only records where created_at is greater than or equal to this value.
     */
    created_at__gte?: string;
    /**
     * Only records where created_at is less than this value.
     */
    created_at__lt?: string;
    /**
     * Only records where created_at is less than or equal to this value.
     */
    created_at__lte?: string;
    /**
     * Only records where updated_at equals this value.
     */
    updated_at?: string;
    /**
     * Only records where updated_at is greater than this value.
     */
    updated_at__gt?: string;
    /**
     * Only records where updated_at is greater than or equal to this value.
     */
    updated_at__gte?: string;
    /**
     * Only records where updated_at is less than this value.
     */
    updated_at__lt?: string;
    /**
     * Only records where updated_at is less than or equal to this value.
     */
    updated_at__lte?: string;
  };
  /**
   * Reflected value from a previous response to obtain the next page of results.
   */
  last?: string;
  /**
   * Order results asc(ending) or desc(ending).
   */
  order?: 'asc' | 'desc';
  /**
   * Which field to order results by.
   */
  order_by?: 'id' | 'created_at' | 'updated_at';
  /**
   * Maximum results to include in the response.
   */
  size?: number;
};

/**
 * audit data activity configuration
 */
export type AidrAuditDataActivity = {
  audit_config_id?: ServiceConfigId;
  enabled?: boolean;
};

/**
 * A service config ID
 */
export type AidrMetricpoolId = string;

export type AidrLog = {
  event: {
    [key: string]: unknown;
  };
};

export type AidrLogs = {
  events: Array<{
    [key: string]: unknown;
  }>;
};

/**
 * An empty object
 */
export type AidrEmpty = {
  [key: string]: never;
};

/**
 * Collector health endpoint object
 */
export type AidrSensorHealth = {
  collector_instance_id: string;
};

/**
 * A service config ID
 */
export type ServiceConfigId = string;

/**
 * A filter ID
 */
export type FilterId = string;

/**
 * A Policy ID
 */
export type PolicyId = string;

export type AidrServiceConfigResult = AidrServiceConfig;

/**
 * A time in ISO-8601 format
 */
export type AidrTimestamp = string;

/**
 * Define field name and path mapping to extract from the log
 */
export type AidrResourceFieldMapping = {
  [key: string]: {
    path: string;
    type: 'string' | 'int' | 'bool';
    disabled?: boolean;
  };
};

/**
 * AIDR metric pool settings
 */
export type AidrMetricpoolResource = {
  id?: AidrMetricpoolId;
  updated_at?: AidrTimestamp;
  field_mappings?: AidrResourceFieldMapping;
};

export type AidrOtelResourceLogs = {
  resource?: AidrOtelResource;
  scopeLogs: Array<AidrOtelScopeLogs>;
  [key: string]:
    | unknown
    | AidrOtelResource
    | Array<AidrOtelScopeLogs>
    | undefined;
};

export type AidrOtelResource = {
  attributes?: Array<AidrOtelKeyValue>;
  [key: string]: unknown | Array<AidrOtelKeyValue> | undefined;
};

export type AidrOtelScopeLogs = {
  scope?: AidrOtelInstrumentationScope;
  logRecords: Array<AidrOtelLogRecord>;
  [key: string]:
    | unknown
    | AidrOtelInstrumentationScope
    | Array<AidrOtelLogRecord>
    | undefined;
};

export type AidrOtelInstrumentationScope = {
  name?: string;
  version?: string;
  [key: string]: unknown | string | undefined;
};

export type AidrOtelLogRecord = {
  timeUnixNano?: string;
  observedTimeUnixNano?: string;
  severityNumber?: number;
  severityText?: string;
  name?: string;
  body: AidrOtelAnyValue;
  attributes?: Array<AidrOtelKeyValue>;
  flags?: number;
  traceId?: string;
  spanId?: string;
  traceFlags?: string;
  [key: string]:
    | unknown
    | string
    | number
    | string
    | AidrOtelAnyValue
    | Array<AidrOtelKeyValue>
    | undefined;
};

export type AidrOtelKeyValue = {
  key: string;
  value: AidrOtelAnyValue;
  [key: string]: unknown | string | AidrOtelAnyValue;
};

export type AidrOtelAnyValue =
  | {
      stringValue: string;
    }
  | {
      boolValue: boolean | 'true' | 'false' | 'True' | 'False';
    }
  | {
      intValue: number | string;
    }
  | {
      doubleValue: number | string;
    }
  | {
      arrayValue: AidrOtelArrayValue;
    }
  | {
      kvlistValue: AidrOtelKeyValueList;
    }
  | {
      bytesValue: string;
    };

export type AidrOtelArrayValue = {
  values: Array<AidrOtelAnyValue>;
  [key: string]: unknown | Array<AidrOtelAnyValue>;
};

export type AidrOtelKeyValueList = {
  values: Array<AidrOtelKeyValue>;
  [key: string]: unknown | Array<AidrOtelKeyValue>;
};

/**
 * AIDR Search Request
 */
export type AidrMetric = {
  /**
   * start of the query window
   */
  start_time: string;
  /**
   * end of the query window, if not specified then current time is used as end_time
   */
  end_time?: string;
  /**
   * Bucket size for time‐series aggregation
   */
  interval?: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  /**
   * Optional filters for the field. For example `<field>__gte` or `<field>__lt`
   */
  filters?: {
    [key: string]: number | number | boolean | number | boolean;
  };
  /**
   * Optional tag filters of the tag fields. For example `<field>__contains` or `<field>__in`
   */
  tag_filters?: {
    [key: string]: Array<string>;
  };
  /**
   * Per-detector filters. Use '<key>__exists' for key existence, or '<key>.(count|detected_count)__{op}' for numeric comparisons.
   */
  detector_filters?: {
    [key: string]: number | boolean;
  };
  /**
   * Optional list of tag keys to group by (for bar‑chart or Sankey)
   */
  group_by?: Array<string>;
  /**
   * field to sort by
   */
  order_by?: string;
  /**
   * Sort direction (default: asc)
   */
  order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
};

/**
 * AIDR Aggregate Search Request
 */
export type AidrMetricAggregatesSearchParams = {
  /**
   * start of the query window
   */
  start_time: string;
  /**
   * end of the query window, if not specified then current time is used as end_time
   */
  end_time?: string;
  /**
   * Bucket size for time‐series aggregation
   */
  interval?: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  /**
   * list of tag keys to aggregate
   */
  aggregate_fields?: Array<string>;
  /**
   * Optional filters for the field. For example `<field>__gte` or `<field>__lt`
   */
  filters?: {
    [key: string]: number | number | boolean | number | boolean;
  };
  /**
   * Per-detector filters. Use '<key>__exists' for key existence, or '<key>.(count|detected_count)__{op}' for numeric comparisons.
   */
  detector_filters?: {
    [key: string]: number | boolean;
  };
  /**
   * Optional tag filters of the tag fields. For example `<field>__contains` or `<field>__in`
   */
  tag_filters?: {
    [key: string]: Array<string>;
  };
  /**
   * Optional list of tag keys to group by (for bar‑chart or Sankey)
   */
  group_by?: Array<string>;
  /**
   * field to sort by
   */
  order_by?: string;
  /**
   * Sort direction (default: asc)
   */
  order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
};

/**
 * AIDR Metric Search Result Data
 */
export type AidrMetricResult = {
  items?: Array<AidrMetricItem>;
};

/**
 * AIDR Metric Search Aggregate Result Data
 */
export type AidrMetricAggregatesResult = {
  items?: Array<AidrMetricAggregateItem>;
};

export type AidrMetricAggregateItem = Array<{
  /**
   * Bucketed time or null.
   */
  bucket_time?: string | null;
  /**
   * Map of tag keys to unique count.
   */
  counts: {
    [key: string]: number;
  };
}>;

export type AidrMetricItem = Array<{
  /**
   * Bucketed time or null.
   */
  bucket_time?: string | null;
  /**
   * Map of tag keys to values.
   */
  tags?: {
    [key: string]: string;
  };
  count: number;
  detectors_count: number;
  is_blocked: boolean;
  request_token_count: number;
  response_token_count: number;
  detectors: AidrMetricResultDetectorItem;
}>;

export type AidrMetricResultDetectorItem = {
  [key: string]:
    | unknown
    | {
        /**
         * Total occurrences for this detector key.
         */
        count: number;
        /**
         * Occurrences that were flagged/detected.
         */
        detected_count: number;
      };
};

/**
 * Configuration for an individual access rule used in an AI Guard recipe. Each rule defines its matching logic and the action to apply when the logic evaluates to true.
 */
export type AccessRuleSettings = {
  /**
   * Unique identifier for this rule. Should be user-readable and consistent across recipe updates.
   */
  rule_key: string;
  /**
   * Display label for the rule shown in user interfaces.
   */
  name: string;
  /**
   * Action to apply if the rule matches. Use 'block' to stop further processing or 'report' to simply log the match.
   */
  state: 'block' | 'report';
  /**
   * JSON Logic condition that determines whether this rule matches.
   */
  logic: {
    [key: string]: unknown;
  };
};

/**
 * Details about the evaluation of a single rule, including whether it matched, the action to take, the rule name, and optional debugging information.
 */
export type AccessRuleResult = {
  /**
   * Whether this rule's logic evaluated to true for the input.
   */
  matched: boolean;
  /**
   * The action resulting from the rule evaluation. One of 'allowed', 'blocked', or 'reported'.
   */
  action: string;
  /**
   * A human-readable name for the rule.
   */
  name: string;
  /**
   * The JSON logic expression evaluated for this rule.
   */
  logic?: {
    [key: string]: unknown;
  };
  /**
   * The input attribute values that were available during rule evaluation.
   */
  attributes?: {
    [key: string]: unknown;
  };
};

/**
 * Configuration for individual detectors used in an AI Guard recipe. Each entry specifies the detector to use, its enabled state, detector-specific settings, and the [action](https://pangea.cloud/docs/ai-guard/recipes#actions) to apply when detections occur.
 */
export type DetectorSettings = Array<{
  /**
   * Identifier of the detector to apply, such as `prompt_injection`, `pii_entity`, or `malicious_entity`
   */
  detector_name: string;
  /**
   * Specifies whether the detector is enabled or disabled in this configuration
   */
  state: 'disabled' | 'enabled';
  /**
   * Detector-specific settings
   */
  settings: {
    /**
     * List of detection and redaction rules applied by this detector
     */
    rules?: Array<{
      /**
       * Identifier of the redaction rule to apply. This should match a rule defined in the [Redact service](https://pangea.cloud/docs/redact/using-redact/using-redact).
       */
      redact_rule_id: string;
      redaction: RuleRedactionConfig;
      /**
       * If `true`, indicates that further processing should be stopped when this rule is triggered
       */
      block?: boolean;
      /**
       * If `true`, disables this specific rule even if the detector is enabled
       */
      disabled?: boolean;
      /**
       * If `true`, performs a reputation check using the configured intel provider. Applies to the Malicious Entity detector when using IP, URL, or Domain Intel services.
       */
      reputation_check?: boolean;
      /**
       * If `true`, applies redaction or transformation when the detected value is determined to be malicious by intel analysis
       */
      transform_if_malicious?: boolean;
    }>;
  };
}>;

/**
 * Defines an AI Guard recipe - a named configuration of detectors and redaction settings used to analyze and protect data flows in AI-powered applications.
 *
 * Recipes specify which detectors are active, how they behave, and may include reusable settings such as FPE tweaks.
 *
 * For details, see the [AI Guard Recipes](https://pangea.cloud/docs/ai-guard/recipes) documentation.
 */
export type RecipeConfig = {
  /**
   * Human-readable name of the recipe
   */
  name: string;
  /**
   * Detailed description of the recipe's purpose or use case
   */
  description: string;
  /**
   * Optional version identifier for the recipe. Can be used to track changes.
   */
  version?: string;
  /**
   * Settings for [AI Guard Detectors](https://pangea.cloud/docs/ai-guard/recipes#detectors), including which detectors to enable and how they behave
   */
  detectors?: DetectorSettings;
  /**
   * Configuration for access rules used in an AI Guard recipe.
   */
  access_rules?: Array<AccessRuleSettings>;
  /**
   * Connector-level Redact configuration. These settings allow you to define reusable redaction parameters, such as FPE tweak value.
   */
  connector_settings?: {
    /**
     * Settings for Redact integration at the recipe level
     */
    redact?: {
      /**
       * ID of a Vault secret containing the tweak value used for Format-Preserving Encryption (FPE). Enables deterministic encryption, ensuring that identical inputs produce consistent encrypted outputs.
       */
      fpe_tweak_vault_secret_id?: string;
    };
  };
};

export type RuleRedactionConfig = (
  | {
      redaction_type?: 'mask' | 'detect_only';
    }
  | {
      redaction_type?: 'replacement';
    }
  | {
      redaction_type?: 'partial_masking';
    }
  | {
      redaction_type?: 'hash';
    }
  | {
      redaction_type?: 'fpe';
    }
) & {
  /**
   * Redaction method to apply for this rule
   */
  redaction_type:
    | 'mask'
    | 'partial_masking'
    | 'replacement'
    | 'hash'
    | 'detect_only'
    | 'fpe';
  /**
   * Replacement string to use when `redaction_type` is `replacement`
   */
  redaction_value?: string;
  /**
   * Parameters to control how text is masked when `redaction_type` is `partial_masking`
   */
  partial_masking?: {
    /**
     * Defines the masking strategy. Use `unmask` to specify how many characters to keep visible. Use `mask` to specify how many to hide.
     */
    masking_type?: 'unmask' | 'mask';
    /**
     * Number of leading characters to leave unmasked when `masking_type` is `unmask`
     */
    unmasked_from_left?: number;
    /**
     * Number of trailing characters to leave unmasked when `masking_type` is `unmask`
     */
    unmasked_from_right?: number;
    /**
     * Number of leading characters to mask when `masking_type` is `mask`
     */
    masked_from_left?: number;
    /**
     * Number of trailing characters to mask when `masking_type` is `mask`
     */
    masked_from_right?: number;
    /**
     * List of characters that should not be masked (for example, hyphens or periods)
     */
    chars_to_ignore?: Array<string>;
    /**
     * Character to use when masking text
     */
    masking_char?: string;
  };
  /**
   * Hash configuration when `redaction_type` is `hash`
   */
  hash?: {
    /**
     * Hashing algorithm to use for redaction
     */
    hash_type: 'md5' | 'sha256';
  } | null;
  /**
   * Alphabet used for Format-Preserving Encryption (FPE). Determines the character set for encryption.
   */
  fpe_alphabet?:
    | 'numeric'
    | 'alphalower'
    | 'alphaupper'
    | 'alpha'
    | 'alphanumericlower'
    | 'alphanumericupper'
    | 'alphanumeric'
    | null;
};

export type AidrPostV1GuardChatCompletionsData = {
  body?: ChatCompletionsGuard;
  path?: never;
  query?: never;
  url: '/v1/guard_chat_completions';
};

export type AidrPostV1GuardChatCompletionsErrors = {
  /**
   * Validation errors
   */
  400: PangeaResponse & PangeaValidationErrors;
};

export type AidrPostV1GuardChatCompletionsError =
  AidrPostV1GuardChatCompletionsErrors[keyof AidrPostV1GuardChatCompletionsErrors];

export type AidrPostV1GuardChatCompletionsResponses = {
  /**
   * No description provided
   */
  200: PangeaResponse & {
    result?: {
      /**
       * Updated structured prompt.
       */
      guard_output?: {
        [key: string]: unknown;
      };
      /**
       * Whether or not the prompt triggered a block detection.
       */
      blocked?: boolean;
      /**
       * Whether or not the original input was transformed.
       */
      transformed?: boolean;
      /**
       * The Policy that was used.
       */
      policy?: string;
      /**
       * Result of the policy analyzing and input prompt.
       */
      detectors: {
        malicious_prompt?: {
          /**
           * Whether or not the Malicious Prompt was detected.
           */
          detected?: boolean;
          /**
           * Details about the analyzers.
           */
          data?: AidrPromptInjectionResult;
        };
        confidential_and_pii_entity?: {
          /**
           * Whether or not the PII Entities were detected.
           */
          detected?: boolean;
          /**
           * Details about the detected entities.
           */
          data?: AidrRedactEntityResult;
        };
        malicious_entity?: {
          /**
           * Whether or not the Malicious Entities were detected.
           */
          detected?: boolean;
          /**
           * Details about the detected entities.
           */
          data?: AidrMaliciousEntityResult;
        };
        custom_entity?: {
          /**
           * Whether or not the Custom Entities were detected.
           */
          detected?: boolean;
          /**
           * Details about the detected entities.
           */
          data?: AidrRedactEntityResult;
        };
        secret_and_key_entity?: {
          /**
           * Whether or not the Secret Entities were detected.
           */
          detected?: boolean;
          /**
           * Details about the detected entities.
           */
          data?: AidrRedactEntityResult;
        };
        competitors?: {
          /**
           * Whether or not the Competitors were detected.
           */
          detected?: boolean;
          /**
           * Details about the detected entities.
           */
          data?: AidrSingleEntityResult;
        };
        language?: {
          /**
           * Whether or not the Languages were detected.
           */
          detected?: boolean;
          /**
           * Details about the detected languages.
           */
          data?: AidrLanguageResult;
        };
        topic?: {
          /**
           * Whether or not the Topics were detected.
           */
          detected?: boolean;
          /**
           * Details about the detected topics.
           */
          data?: AidrTopicResult;
        };
        code?: {
          /**
           * Whether or not the Code was detected.
           */
          detected?: boolean;
          /**
           * Details about the detected code.
           */
          data?: AidrLanguageResult;
        };
      };
      access_rules?: AidrAccessRulesResponse;
      /**
       * If an FPE redaction method returned results, this will be the context passed to unredact.
       */
      fpe_context?: string;
    };
  };
  /**
   * Asynchronous request in progress
   */
  202: PangeaResponse & PangeaAcceptedResponse;
};

export type AidrPostV1GuardChatCompletionsResponse =
  AidrPostV1GuardChatCompletionsResponses[keyof AidrPostV1GuardChatCompletionsResponses];

export type AidrPostV1UnredactData = {
  body?: {
    /**
     * Data to unredact
     */
    redacted_data: unknown;
    /**
     * FPE context used to decrypt and unredact data
     */
    fpe_context: string;
  };
  path?: never;
  query?: never;
  url: '/v1/unredact';
};

export type AidrPostV1UnredactErrors = {
  /**
   * Validation errors
   */
  400: PangeaResponse & PangeaValidationErrors;
};

export type AidrPostV1UnredactError =
  AidrPostV1UnredactErrors[keyof AidrPostV1UnredactErrors];

export type AidrPostV1UnredactResponses = {
  /**
   * The unredacted data
   */
  200: PangeaResponse & {
    result?: {
      /**
       * The unredacted data
       */
      data: unknown;
    };
  };
  /**
   * Asynchronous request in progress
   */
  202: PangeaResponse & PangeaAcceptedResponse;
};

export type AidrPostV1UnredactResponse =
  AidrPostV1UnredactResponses[keyof AidrPostV1UnredactResponses];

export type GetAsyncRequestData = {
  body?: never;
  path: {
    /**
     * The request ID to poll
     */
    requestId: string;
  };
  query?: never;
  url: '/request/{requestId}';
};

export type GetAsyncRequestResponses = {
  /**
   * Response
   */
  200: PangeaResponse;
  /**
   * Asynchronous request in progress
   */
  202: PangeaResponse & {
    result: {
      ttl_mins?: number;
      retry_counter?: number;
      location?: string;
    };
    status: 'Accepted';
  };
};

export type GetAsyncRequestResponse =
  GetAsyncRequestResponses[keyof GetAsyncRequestResponses];
