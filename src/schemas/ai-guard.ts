import * as v from 'valibot';

/**
 * Response Schema
 *
 * Pangea standard response schema
 */
export const PangeaResponseSchema = v.object({
  request_id: v.string(),
  request_time: v.pipe(v.string(), v.isoTimestamp()),
  response_time: v.pipe(v.string(), v.isoTimestamp()),
  status: v.string(),
  summary: v.optional(v.string()),
  result: v.optional(v.record(v.string(), v.unknown())),
});

export const PangeaValidationErrorsSchema = PangeaResponseSchema;

/**
 * Device status. Allowed values are active, pending, disabled
 */
export const AidrDeviceStatusSchema = v.picklist([
  'pending',
  'active',
  'disabled',
]);

export const AidrIpv4OrV6Schema = v.union([
  v.pipe(v.string(), v.ip()),
  v.pipe(v.string(), v.ip()),
]);

export const AidrDeviceSchema = v.strictObject({
  id: v.pipe(v.string(), v.minLength(1), v.maxLength(32)),
  name: v.optional(v.pipe(v.string(), v.minLength(1), v.maxLength(255))),
  status: v.optional(AidrDeviceStatusSchema),
  metadata: v.optional(v.record(v.string(), v.unknown())),
  user_id: v.optional(v.string()),
  last_used_ip: v.optional(AidrIpv4OrV6Schema),
});

export const AidrDeviceTokenInfoSchema = v.object({
  token: v.optional(v.string()),
  expires_in: v.optional(v.pipe(v.number(), v.integer())),
  created_at: v.optional(v.pipe(v.string(), v.isoTimestamp())),
});

export const AidrDeviceResultSchema = v.strictObject({
  id: v.pipe(v.string(), v.minLength(1), v.maxLength(32)),
  name: v.optional(v.pipe(v.string(), v.minLength(1), v.maxLength(255))),
  status: AidrDeviceStatusSchema,
  metadata: v.optional(v.record(v.string(), v.unknown())),
  user_id: v.optional(v.string()),
  last_used_ip: v.optional(AidrIpv4OrV6Schema),
  created_at: v.optional(v.pipe(v.string(), v.isoTimestamp())),
  updated_at: v.optional(v.pipe(v.string(), v.isoTimestamp())),
});

/**
 * client generated unique ID.
 */
export const AidrDeviceIdSchema = v.pipe(
  v.string(),
  v.minLength(1),
  v.maxLength(32)
);

/**
 * List or filter/search device records.
 */
export const AidrDeviceSearchSchema = v.strictObject({
  filter: v.optional(
    v.object({
      created_at: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      created_at__gt: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      created_at__gte: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      created_at__lt: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      created_at__lte: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      updated_at: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      updated_at__gt: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      updated_at__gte: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      updated_at__lt: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      updated_at__lte: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      id: v.optional(v.string()),
      id__contains: v.optional(v.array(v.string())),
      id__in: v.optional(v.array(v.string())),
      name: v.optional(v.string()),
      name__contains: v.optional(v.array(v.string())),
      name__in: v.optional(v.array(v.string())),
      status: v.optional(AidrDeviceStatusSchema),
      status__contains: v.optional(v.array(AidrDeviceStatusSchema)),
      status__in: v.optional(v.array(AidrDeviceStatusSchema)),
    })
  ),
  last: v.optional(v.string()),
  order: v.optional(v.picklist(['asc', 'desc'])),
  order_by: v.optional(v.picklist(['name', 'created_at', 'updated_at'])),
  size: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1))),
});

export const AidrDeviceSearchResultSchema = v.object({
  count: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1))),
  last: v.optional(v.string()),
  devices: v.optional(v.array(AidrDeviceResultSchema)),
});

/**
 * MetricEvent data
 */
export const AidrMetricOnlyDataSchema = v.strictObject({
  app_id: v.optional(v.string()),
  actor_id: v.optional(v.string()),
  llm_provider: v.optional(v.string()),
  model: v.optional(v.string()),
  model_version: v.optional(v.string()),
  request_token_count: v.optional(v.pipe(v.number(), v.integer())),
  response_token_count: v.optional(v.pipe(v.number(), v.integer())),
  source_ip: v.optional(v.pipe(v.string(), v.ip())),
  source_location: v.optional(v.string()),
  event_type: v.optional(v.string()),
  collector_instance_id: v.optional(v.string()),
  extra_info: v.optional(v.record(v.string(), v.unknown())),
});

/**
 * List or filter/search saved filter records.
 */
export const AidrSavedFilterSearchSchema = v.strictObject({
  filter: v.optional(
    v.object({
      created_at: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      created_at__gt: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      created_at__gte: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      created_at__lt: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      created_at__lte: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      updated_at: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      updated_at__gt: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      updated_at__gte: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      updated_at__lt: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      updated_at__lte: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      id: v.optional(v.string()),
      id__contains: v.optional(v.array(v.string())),
      id__in: v.optional(v.array(v.string())),
      name: v.optional(v.string()),
      name__contains: v.optional(v.array(v.string())),
      name__in: v.optional(v.array(v.string())),
    })
  ),
  last: v.optional(v.string()),
  order: v.optional(v.picklist(['asc', 'desc'])),
  order_by: v.optional(v.picklist(['name', 'created_at', 'updated_at'])),
  size: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1))),
});

export const AidrSavedFilterSchema = v.strictObject({
  name: v.string(),
  filter: v.record(v.string(), v.unknown()),
});

export const AidrSavedFilterResultSchema = v.strictObject({
  name: v.string(),
  filter: v.record(v.string(), v.unknown()),
  created_at: v.pipe(v.string(), v.isoTimestamp()),
  updated_at: v.pipe(v.string(), v.isoTimestamp()),
});

export const AidrSavedFilterSearchResultSchema = v.object({
  count: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1))),
  last: v.optional(v.string()),
  saved_filters: v.optional(v.array(AidrSavedFilterResultSchema)),
});

/**
 * List or filter/search field alias records.
 */
export const AidrFieldAliasSearchSchema = v.strictObject({
  filter: v.optional(
    v.object({
      created_at: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      created_at__gt: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      created_at__gte: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      created_at__lt: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      created_at__lte: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      field_name: v.optional(v.string()),
      field_name__contains: v.optional(v.array(v.string())),
      field_name__in: v.optional(v.array(v.string())),
      field_type: v.optional(v.string()),
      field_type__contains: v.optional(v.array(v.string())),
      field_type__in: v.optional(v.array(v.string())),
      field_alias: v.optional(v.string()),
      field_alias__contains: v.optional(v.array(v.string())),
      field_alias__in: v.optional(v.array(v.string())),
      updated_at: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      updated_at__gt: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      updated_at__gte: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      updated_at__lt: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      updated_at__lte: v.optional(v.pipe(v.string(), v.isoTimestamp())),
    })
  ),
  last: v.optional(v.string()),
  order: v.optional(v.picklist(['asc', 'desc'])),
  order_by: v.optional(
    v.picklist([
      'field_name',
      'field_type',
      'created_at',
      'updated_at',
      'published_at',
      'field_alias',
    ])
  ),
  size: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1))),
});

export const AidrCustomlistSchema = v.object({
  name: v.optional(v.string()),
  type: v.optional(v.picklist(['site'])),
  content: v.optional(v.array(v.unknown())),
});

export const ChatCompletionsGuardSchema = v.strictObject({
  guard_input: v.record(v.string(), v.unknown()),
  app_id: v.optional(v.string()),
  user_id: v.optional(v.string()),
  llm_provider: v.optional(v.string()),
  model: v.optional(v.string()),
  model_version: v.optional(v.string()),
  source_ip: v.optional(v.string()),
  source_location: v.optional(v.string()),
  tenant_id: v.optional(v.string()),
  event_type: v.optional(
    v.picklist(['input', 'output', 'tool_input', 'tool_output', 'tool_listing'])
  ),
  collector_instance_id: v.optional(v.string()),
  extra_info: v.optional(
    v.objectWithRest(
      {
        app_name: v.optional(v.string()),
        app_group: v.optional(v.string()),
        app_version: v.optional(v.string()),
        actor_name: v.optional(v.string()),
        actor_group: v.optional(v.string()),
        source_region: v.optional(v.string()),
        sub_tenant: v.optional(v.string()),
        mcp_tools: v.optional(
          v.array(
            v.strictObject({
              server_name: v.pipe(v.string(), v.minLength(1)),
              tools: v.pipe(
                v.array(v.pipe(v.string(), v.minLength(1))),
                v.minLength(1)
              ),
            })
          )
        ),
      },
      v.unknown()
    )
  ),
});

export const AidrPromptInjectionResultSchema = v.object({
  action: v.optional(v.string()),
  analyzer_responses: v.optional(
    v.array(
      v.object({
        analyzer: v.string(),
        confidence: v.number(),
      })
    )
  ),
});

export const AidrRedactEntityResultSchema = v.object({
  entities: v.optional(
    v.array(
      v.object({
        action: v.string(),
        type: v.string(),
        value: v.string(),
        start_pos: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
      })
    )
  ),
});

export const AidrMaliciousEntityResultSchema = v.object({
  entities: v.optional(
    v.array(
      v.object({
        type: v.string(),
        value: v.string(),
        start_pos: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        raw: v.optional(v.record(v.string(), v.unknown())),
      })
    )
  ),
});

export const AidrSingleEntityResultSchema = v.object({
  action: v.optional(v.string()),
  entities: v.optional(v.array(v.string())),
});

export const AidrLanguageResultSchema = v.object({
  action: v.optional(v.string()),
  language: v.optional(v.string()),
});

export const AidrTopicResultSchema = v.object({
  action: v.optional(v.string()),
  topics: v.optional(
    v.array(
      v.object({
        topic: v.string(),
        confidence: v.number(),
      })
    )
  ),
});

export const AidrCustomlistResultSchema = v.object({
  id: v.optional(v.string()),
  name: v.optional(v.string()),
  type: v.optional(v.picklist(['site'])),
  content: v.optional(v.array(v.record(v.string(), v.unknown()))),
  created_at: v.optional(v.pipe(v.string(), v.isoTimestamp())),
  updated_at: v.optional(v.pipe(v.string(), v.isoTimestamp())),
});

/**
 * List or filter/search policy records.
 */
export const AidrPolicySearchSchema = v.strictObject({
  filter: v.optional(
    v.object({
      key: v.optional(v.string()),
      key__contains: v.optional(v.array(v.string())),
      name__in: v.optional(v.array(v.string())),
      status: v.optional(v.string()),
    })
  ),
  last: v.optional(v.string()),
  order: v.optional(v.picklist(['asc', 'desc'])),
  order_by: v.optional(v.picklist(['key', 'name', 'created_at', 'updated_at'])),
  size: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1))),
});

export const AidrPromptItemSchema = v.object({
  id: v.optional(v.string()),
  type: v.optional(v.string()),
  content: v.optional(v.string()),
});

export const AidrPromptItemListResultSchema = v.object({
  policies: v.optional(v.array(AidrPromptItemSchema)),
});

export const AidrFieldAliasSchema = v.strictObject({
  field_name: v.string(),
  field_type: v.string(),
  field_alias: v.string(),
  field_tags: v.optional(v.array(v.string())),
});

export const AidrFieldAliasResultSchema = v.strictObject({
  field_name: v.string(),
  field_type: v.string(),
  field_alias: v.string(),
  field_tags: v.optional(v.array(v.string())),
  created_at: v.pipe(v.string(), v.isoTimestamp()),
  updated_at: v.pipe(v.string(), v.isoTimestamp()),
});

export const AidrFieldAliasSearchResultSchema = v.object({
  count: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1))),
  last: v.optional(v.string()),
  items: v.optional(v.array(AidrFieldAliasResultSchema)),
});

export const AidrPolicycollectionResultSchema = v.object({
  key: v.optional(v.string()),
  name: v.optional(v.string()),
  type: v.optional(
    v.picklist(['logging', 'gateway', 'browser', 'application', 'agentic'])
  ),
  settings: v.optional(v.record(v.string(), v.unknown())),
  created_at: v.optional(v.pipe(v.string(), v.isoTimestamp())),
  updated_at: v.optional(v.pipe(v.string(), v.isoTimestamp())),
});

/**
 * List or filter/search policy collection records.
 */
export const AidrPolicycollectionSearchSchema = v.strictObject({
  filter: v.optional(
    v.object({
      created_at: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      created_at__gt: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      created_at__gte: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      created_at__lt: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      created_at__lte: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      updated_at: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      updated_at__gt: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      updated_at__gte: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      updated_at__lt: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      updated_at__lte: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      type: v.optional(
        v.picklist(['logging', 'gateway', 'browser', 'application', 'agentic'])
      ),
      type__in: v.optional(
        v.array(
          v.picklist([
            'logging',
            'gateway',
            'browser',
            'application',
            'agentic',
          ])
        )
      ),
      key: v.optional(v.string()),
      key__contains: v.optional(v.array(v.string())),
      key__in: v.optional(v.array(v.string())),
      name: v.optional(v.string()),
      name__contains: v.optional(v.array(v.string())),
      name__in: v.optional(v.array(v.string())),
    })
  ),
  last: v.optional(v.string()),
  order: v.optional(v.picklist(['asc', 'desc'])),
  order_by: v.optional(
    v.picklist(['key', 'name', 'type', 'created_at', 'updated_at'])
  ),
  size: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1))),
});

export const AidrPolicycollectionSearchResultSchema = v.object({
  collections: v.optional(v.array(AidrPolicycollectionResultSchema)),
  count: v.optional(v.pipe(v.number(), v.integer())),
  last: v.optional(v.string()),
});

/**
 * List or filter/search list records.
 */
export const AidrCustomlistSearchSchema = v.strictObject({
  filter: v.optional(
    v.object({
      created_at: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      created_at__gt: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      created_at__gte: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      created_at__lt: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      created_at__lte: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      updated_at: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      updated_at__gt: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      updated_at__gte: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      updated_at__lt: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      updated_at__lte: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      type: v.optional(v.string()),
      name: v.optional(v.string()),
      name__contains: v.optional(v.array(v.string())),
      name__in: v.optional(v.array(v.string())),
    })
  ),
  last: v.optional(v.string()),
  order: v.optional(v.picklist(['asc', 'desc'])),
  order_by: v.optional(v.picklist(['id', 'name', 'created_at', 'updated_at'])),
  size: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1))),
});

export const AidrCustomlistSearchResultSchema = v.object({
  lists: v.optional(v.array(AidrCustomlistResultSchema)),
  count: v.optional(v.pipe(v.number(), v.integer())),
  last: v.optional(v.string()),
});

/**
 * AIDR Collector Summary list
 */
export const AidrSensorInsightsSchema = v.strictObject({
  is_instance_data: v.optional(v.boolean()),
  filters: v.optional(
    v.strictObject({
      collector_id: v.optional(v.string()),
      collector_id__contains: v.optional(v.array(v.string())),
      collector_id__in: v.optional(v.array(v.string())),
      instance_id: v.optional(v.string()),
      instance_id__contains: v.optional(v.array(v.string())),
      instance_id__in: v.optional(v.array(v.string())),
      collector_type: v.optional(v.string()),
      collector_type_contains: v.optional(v.array(v.string())),
      collector_type__in: v.optional(v.array(v.string())),
    })
  ),
  order_by: v.optional(v.string()),
  order: v.optional(v.picklist(['asc', 'desc'])),
  count: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1))),
  last: v.optional(v.string()),
});

/**
 * Duration string (e.g., '100ms', '2h')
 */
export const AidrGolangDurationSchema = v.union([v.unknown(), v.unknown()]);

/**
 * List or filter/config records.
 */
export const AidrServiceConfigListSchema = v.strictObject({
  filter: v.optional(
    v.strictObject({
      name: v.optional(v.string()),
      name__contains: v.optional(v.array(v.string())),
      name__in: v.optional(v.array(v.string())),
      collector_type: v.optional(v.string()),
      collector_type__contains: v.optional(v.array(v.string())),
      collector_type__in: v.optional(v.array(v.string())),
      id: v.optional(v.string()),
      id__contains: v.optional(v.array(v.string())),
      id__in: v.optional(v.array(v.string())),
      created_at: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      created_at__gt: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      created_at__gte: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      created_at__lt: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      created_at__lte: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      updated_at: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      updated_at__gt: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      updated_at__gte: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      updated_at__lt: v.optional(v.pipe(v.string(), v.isoTimestamp())),
      updated_at__lte: v.optional(v.pipe(v.string(), v.isoTimestamp())),
    })
  ),
  last: v.optional(v.string()),
  order: v.optional(v.picklist(['asc', 'desc'])),
  order_by: v.optional(v.picklist(['id', 'created_at', 'updated_at'])),
  size: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1))),
});

/**
 * A service config ID
 */
export const AidrMetricpoolIdSchema = v.pipe(
  v.string(),
  v.regex(/^pro_[a-z2-7]{32}$/)
);

export const AidrLogSchema = v.strictObject({
  event: v.record(v.string(), v.unknown()),
});

export const AidrLogsSchema = v.strictObject({
  events: v.pipe(
    v.array(v.record(v.string(), v.unknown())),
    v.minLength(1),
    v.maxLength(100)
  ),
});

/**
 * An empty object
 */
export const AidrEmptySchema = v.strictObject({});

/**
 * Collector health endpoint object
 */
export const AidrSensorHealthSchema = v.strictObject({
  collector_instance_id: v.string(),
});

/**
 * A service config ID
 */
export const ServiceConfigIdSchema = v.pipe(
  v.string(),
  v.regex(/^pci_[a-z2-7]{32}$/)
);

/**
 * AIDR Collector Summary Result Data
 */
export const AidrSensorInsightsItemSchema = v.strictObject({
  updated_at: v.pipe(v.string(), v.isoTimestamp()),
  created_at: v.pipe(v.string(), v.isoTimestamp()),
  count: v.pipe(v.number(), v.integer(), v.minValue(0)),
  collector_id: ServiceConfigIdSchema,
  instance_id: v.optional(v.string()),
  collector_type: v.string(),
});

/**
 * AIDR Collector Summary Result Data
 */
export const AidrSensorInsightsResultSchema = v.object({
  count: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1))),
  last: v.optional(v.string()),
  items: v.optional(v.array(AidrSensorInsightsItemSchema)),
});

/**
 * audit data activity configuration
 */
export const AidrAuditDataActivitySchema = v.object({
  audit_config_id: v.optional(ServiceConfigIdSchema),
  enabled: v.optional(v.boolean()),
});

/**
 * A filter ID
 */
export const FilterIdSchema = v.pipe(v.string(), v.regex(/^paf_[a-z2-7]{32}$/));

/**
 * A Policy ID
 */
export const PolicyIdSchema = v.pipe(v.string(), v.regex(/^pap_[a-z2-7]{32}$/));

/**
 * A time in ISO-8601 format
 */
export const AidrTimestampSchema = v.pipe(v.string(), v.isoTimestamp());

/**
 * AIDR Service Config Settings
 */
export const AidrServiceConfigSchema = v.objectWithRest(
  {
    id: v.optional(ServiceConfigIdSchema),
    name: v.optional(v.string()),
    version: v.optional(v.string()),
    metric_pool_rid: v.optional(AidrMetricpoolIdSchema),
    updated_at: v.optional(AidrTimestampSchema),
    collector_type: v.optional(v.string()),
    settings: v.optional(v.record(v.string(), v.unknown())),
    warning_threshold: v.optional(AidrGolangDurationSchema),
    in_active_threshold: v.optional(AidrGolangDurationSchema),
  },
  v.unknown()
);

export const AidrServiceConfigResultSchema = AidrServiceConfigSchema;

export const AidrDeviceCheckResultSchema = v.strictObject({
  device: v.optional(AidrDeviceResultSchema),
  config: v.optional(AidrServiceConfigResultSchema),
  access_token: v.optional(AidrDeviceTokenInfoSchema),
});

/**
 * Define field name and path mapping to extract from the log
 */
export const AidrResourceFieldMappingSchema = v.record(
  v.string(),
  v.strictObject({
    path: v.pipe(
      v.string(),
      v.regex(/^([\w]+|\*)(\.(\*|[\w]+|#(\(\w+(==|!=|=~|>|<)[^)]*\))?|\d+))*$/)
    ),
    type: v.picklist(['string', 'int', 'bool']),
    disabled: v.optional(v.boolean()),
  })
);

/**
 * AIDR metric pool settings
 */
export const AidrMetricpoolResourceSchema = v.object({
  id: v.optional(AidrMetricpoolIdSchema),
  updated_at: v.optional(AidrTimestampSchema),
  field_mappings: v.optional(AidrResourceFieldMappingSchema),
});

export const AidrOtelInstrumentationScopeSchema = v.objectWithRest(
  {
    name: v.optional(v.string()),
    version: v.optional(v.string()),
  },
  v.unknown()
);

/**
 * AIDR Search Request
 */
export const AidrMetricSchema = v.strictObject({
  start_time: v.pipe(v.string(), v.isoTimestamp()),
  end_time: v.optional(v.pipe(v.string(), v.isoTimestamp())),
  interval: v.optional(
    v.picklist(['hourly', 'daily', 'weekly', 'monthly', 'yearly'])
  ),
  filters: v.optional(v.strictObject({})),
  tag_filters: v.optional(v.strictObject({})),
  detector_filters: v.optional(v.strictObject({})),
  group_by: v.optional(
    v.array(v.pipe(v.string(), v.regex(/^[A-Za-z_][A-Za-z0-9_]{0,63}$/)))
  ),
  order_by: v.optional(v.string()),
  order: v.optional(v.picklist(['asc', 'desc'])),
  limit: v.optional(v.pipe(v.number(), v.integer())),
  offset: v.optional(v.pipe(v.number(), v.integer())),
});

/**
 * AIDR Aggregate Search Request
 */
export const AidrMetricAggregatesSearchParamsSchema = v.strictObject({
  start_time: v.pipe(v.string(), v.isoTimestamp()),
  end_time: v.optional(v.pipe(v.string(), v.isoTimestamp())),
  interval: v.optional(
    v.picklist(['hourly', 'daily', 'weekly', 'monthly', 'yearly'])
  ),
  aggregate_fields: v.optional(
    v.array(v.pipe(v.string(), v.regex(/^[A-Za-z_][A-Za-z0-9_]{0,63}$/)))
  ),
  filters: v.optional(v.strictObject({})),
  detector_filters: v.optional(v.strictObject({})),
  tag_filters: v.optional(v.strictObject({})),
  group_by: v.optional(
    v.array(v.pipe(v.string(), v.regex(/^[A-Za-z_][A-Za-z0-9_]{0,63}$/)))
  ),
  order_by: v.optional(v.string()),
  order: v.optional(v.picklist(['asc', 'desc'])),
  limit: v.optional(v.pipe(v.number(), v.integer())),
  offset: v.optional(v.pipe(v.number(), v.integer())),
});

export const AidrMetricAggregateItemSchema = v.array(
  v.object({
    bucket_time: v.optional(
      v.union([v.pipe(v.string(), v.isoTimestamp()), v.null()])
    ),
    counts: v.record(v.string(), v.pipe(v.number(), v.integer())),
  })
);

/**
 * AIDR Metric Search Aggregate Result Data
 */
export const AidrMetricAggregatesResultSchema = v.object({
  items: v.optional(v.array(AidrMetricAggregateItemSchema)),
});

export const AidrMetricResultDetectorItemSchema = v.optional(
  v.record(v.string(), v.unknown()),
  {}
);

export const AidrMetricItemSchema = v.array(
  v.object({
    bucket_time: v.optional(
      v.union([v.pipe(v.string(), v.isoTimestamp()), v.null()])
    ),
    tags: v.optional(v.record(v.string(), v.string())),
    count: v.pipe(v.number(), v.integer()),
    detectors_count: v.pipe(v.number(), v.integer()),
    is_blocked: v.boolean(),
    request_token_count: v.pipe(v.number(), v.integer()),
    response_token_count: v.pipe(v.number(), v.integer()),
    detectors: AidrMetricResultDetectorItemSchema,
  })
);

/**
 * AIDR Metric Search Result Data
 */
export const AidrMetricResultSchema = v.object({
  items: v.optional(v.array(AidrMetricItemSchema)),
});

/**
 * A time in ISO-8601 format
 */
export const AuthnTimestampSchema = v.pipe(v.string(), v.isoTimestamp());

/**
 * A time in ISO-8601 format or null
 */
export const AirdTimestampNullableSchema = v.union([
  AuthnTimestampSchema,
  v.null(),
]);

/**
 * Details about the evaluation of a single rule, including whether it matched, the action to take, the rule name, and optional debugging information.
 */
export const AccessRuleResultSchema = v.strictObject({
  matched: v.boolean(),
  action: v.string(),
  name: v.string(),
  logic: v.optional(v.record(v.string(), v.unknown())),
  attributes: v.optional(v.record(v.string(), v.unknown())),
});

/**
 * Result of the recipe evaluating configured rules
 */
export const AidrAccessRulesResponseSchema = v.record(v.string(), v.unknown());

export const RuleRedactionConfigSchema = v.intersect([
  v.union([
    v.object({
      redaction_type: v.optional(v.picklist(['mask', 'detect_only'])),
    }),
    v.object({
      redaction_type: v.optional(v.literal('replacement')),
    }),
    v.object({
      redaction_type: v.optional(v.literal('partial_masking')),
    }),
    v.object({
      redaction_type: v.optional(v.literal('hash')),
    }),
    v.object({
      redaction_type: v.optional(v.literal('fpe')),
    }),
  ]),
  v.strictObject({
    redaction_type: v.picklist([
      'mask',
      'partial_masking',
      'replacement',
      'hash',
      'detect_only',
      'fpe',
    ]),
    redaction_value: v.optional(v.string()),
    partial_masking: v.optional(
      v.object({
        masking_type: v.optional(v.picklist(['unmask', 'mask'])),
        unmasked_from_left: v.optional(
          v.pipe(v.number(), v.integer(), v.minValue(0))
        ),
        unmasked_from_right: v.optional(
          v.pipe(v.number(), v.integer(), v.minValue(0))
        ),
        masked_from_left: v.optional(
          v.pipe(v.number(), v.integer(), v.minValue(0))
        ),
        masked_from_right: v.optional(
          v.pipe(v.number(), v.integer(), v.minValue(0))
        ),
        chars_to_ignore: v.optional(v.array(v.pipe(v.string(), v.length(1)))),
        masking_char: v.optional(v.pipe(v.string(), v.length(1)), '*'),
      })
    ),
    hash: v.optional(
      v.union([
        v.object({
          hash_type: v.picklist(['md5', 'sha256']),
        }),
        v.null(),
      ])
    ),
    fpe_alphabet: v.optional(
      v.union([
        v.literal('numeric'),
        v.literal('alphalower'),
        v.literal('alphaupper'),
        v.literal('alpha'),
        v.literal('alphanumericlower'),
        v.literal('alphanumericupper'),
        v.literal('alphanumeric'),
        v.null(),
      ])
    ),
  }),
]);

/**
 * Configuration for individual detectors used in an AI Guard recipe. Each entry specifies the detector to use, its enabled state, detector-specific settings, and the [action](https://pangea.cloud/docs/ai-guard/recipes#actions) to apply when detections occur.
 */
export const DetectorSettingsSchema = v.array(
  v.strictObject({
    detector_name: v.string(),
    state: v.picklist(['disabled', 'enabled']),
    settings: v.object({
      rules: v.optional(
        v.array(
          v.strictObject({
            redact_rule_id: v.string(),
            redaction: RuleRedactionConfigSchema,
            block: v.optional(v.boolean()),
            disabled: v.optional(v.boolean()),
            reputation_check: v.optional(v.boolean()),
            transform_if_malicious: v.optional(v.boolean()),
          })
        )
      ),
    }),
  })
);

/**
 * Configuration for an individual access rule used in an AI Guard recipe. Each rule defines its matching logic and the action to apply when the logic evaluates to true.
 */
export const AccessRuleSettingsSchema = v.strictObject({
  rule_key: v.pipe(v.string(), v.regex(/^([a-zA-Z0-9_][a-zA-Z0-9/|_]*)$/)),
  name: v.string(),
  state: v.picklist(['block', 'report']),
  logic: v.record(v.string(), v.unknown()),
});

export const AidrPolicySchema = v.strictObject({
  key: v.string(),
  name: v.string(),
  description: v.optional(v.string()),
  schema_version: v.picklist(['v1.1']),
  detector_settings: v.optional(DetectorSettingsSchema),
  access_rules: v.optional(v.array(AccessRuleSettingsSchema)),
  connector_settings: v.optional(
    v.object({
      redact: v.optional(
        v.object({
          fpe_tweak_vault_secret_id: v.optional(v.string()),
        })
      ),
    })
  ),
});

export const AidrPolicyResultSchema = v.strictObject({
  id: PolicyIdSchema,
  key: v.string(),
  name: v.string(),
  description: v.optional(v.string()),
  schema_version: v.picklist(['v1.1']),
  revision: v.number(),
  detector_settings: v.optional(DetectorSettingsSchema),
  access_rules: v.optional(v.array(AccessRuleSettingsSchema)),
  connector_settings: v.optional(
    v.object({
      redact: v.optional(
        v.object({
          fpe_tweak_vault_secret_id: v.optional(v.string()),
        })
      ),
    })
  ),
  created_at: v.optional(v.pipe(v.string(), v.isoTimestamp())),
  updated_at: v.optional(v.pipe(v.string(), v.isoTimestamp())),
});

export const AidrPolicySearchResultSchema = v.object({
  count: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1))),
  last: v.optional(v.string()),
  policies: v.optional(v.array(AidrPolicyResultSchema)),
});

/**
 * Defines an AI Guard recipe - a named configuration of detectors and redaction settings used to analyze and protect data flows in AI-powered applications.
 *
 * Recipes specify which detectors are active, how they behave, and may include reusable settings such as FPE tweaks.
 *
 * For details, see the [AI Guard Recipes](https://pangea.cloud/docs/ai-guard/recipes) documentation.
 */
export const RecipeConfigSchema = v.strictObject({
  name: v.string(),
  description: v.string(),
  version: v.optional(v.string(), 'v1'),
  detectors: v.optional(DetectorSettingsSchema),
  access_rules: v.optional(v.array(AccessRuleSettingsSchema)),
  connector_settings: v.optional(
    v.object({
      redact: v.optional(
        v.object({
          fpe_tweak_vault_secret_id: v.optional(v.string()),
        })
      ),
    })
  ),
});

export const AidrPolicyDefaultsSchema = v.object({
  default_policies: v.record(v.string(), v.unknown()),
});

export const LanguageResultSchema = v.object({
  action: v.optional(v.string()),
  language: v.optional(v.string()),
});

export const RedactEntityResultSchema = v.object({
  entities: v.optional(
    v.array(
      v.object({
        action: v.string(),
        type: v.string(),
        value: v.string(),
        redacted: v.boolean(),
        start_pos: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
      })
    )
  ),
});

export const MaliciousEntityActionSchema = v.picklist([
  'report',
  'defang',
  'disabled',
  'block',
]);

export const PiiEntityActionSchema = v.picklist([
  'disabled',
  'report',
  'block',
  'mask',
  'partial_masking',
  'replacement',
  'hash',
  'fpe',
]);

export const AidrOtelResourceLogsSchema: v.GenericSchema = v.objectWithRest(
  {
    resource: v.optional(v.lazy(() => AidrOtelResourceSchema)),
    scopeLogs: v.array(v.lazy(() => AidrOtelScopeLogsSchema)),
  },
  v.unknown()
);

export const AidrOtelResourceSchema: v.GenericSchema = v.objectWithRest(
  {
    attributes: v.optional(v.array(v.lazy(() => AidrOtelKeyValueSchema))),
  },
  v.unknown()
);

export const AidrOtelScopeLogsSchema: v.GenericSchema = v.objectWithRest(
  {
    scope: v.optional(AidrOtelInstrumentationScopeSchema),
    logRecords: v.array(v.lazy(() => AidrOtelLogRecordSchema)),
  },
  v.unknown()
);

export const AidrOtelLogRecordSchema: v.GenericSchema = v.objectWithRest(
  {
    timeUnixNano: v.optional(v.pipe(v.string(), v.regex(/^[0-9]+$/))),
    observedTimeUnixNano: v.optional(v.pipe(v.string(), v.regex(/^[0-9]+$/))),
    severityNumber: v.optional(v.pipe(v.number(), v.integer())),
    severityText: v.optional(v.string()),
    name: v.optional(v.string()),
    body: v.lazy(() => AidrOtelAnyValueSchema),
    attributes: v.optional(v.array(v.lazy(() => AidrOtelKeyValueSchema))),
    flags: v.optional(v.pipe(v.number(), v.integer())),
    traceId: v.optional(v.string()),
    spanId: v.optional(v.string()),
    traceFlags: v.optional(v.string()),
  },
  v.unknown()
);

export const AidrOtelKeyValueSchema: v.GenericSchema = v.objectWithRest(
  {
    key: v.string(),
    value: v.lazy(() => AidrOtelAnyValueSchema),
  },
  v.unknown()
);

export const AidrOtelAnyValueSchema: v.GenericSchema = v.union([
  v.object({
    stringValue: v.string(),
  }),
  v.object({
    boolValue: v.union([
      v.boolean(),
      v.literal('true'),
      v.literal('false'),
      v.literal('True'),
      v.literal('False'),
    ]),
  }),
  v.object({
    intValue: v.union([
      v.pipe(v.number(), v.integer()),
      v.pipe(v.string(), v.regex(/^-?\d+$/)),
    ]),
  }),
  v.object({
    doubleValue: v.union([
      v.number(),
      v.pipe(v.string(), v.regex(/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/)),
    ]),
  }),
  v.object({
    arrayValue: v.lazy(() => AidrOtelArrayValueSchema),
  }),
  v.object({
    kvlistValue: v.lazy(() => AidrOtelKeyValueListSchema),
  }),
  v.object({
    bytesValue: v.string(),
  }),
]);

export const AidrOtelArrayValueSchema = v.objectWithRest(
  {
    values: v.array(AidrOtelAnyValueSchema),
  },
  v.unknown()
);

export const AidrOtelKeyValueListSchema = v.objectWithRest(
  {
    values: v.array(AidrOtelKeyValueSchema),
  },
  v.unknown()
);

export const AidrPostV1GuardChatCompletionsRequestSchema = v.object({
  body: v.optional(ChatCompletionsGuardSchema),
  path: v.optional(v.never()),
  query: v.optional(v.never()),
});

/**
 * No description provided
 */
export const AidrPostV1GuardChatCompletionsResponseSchema = v.intersect([
  PangeaResponseSchema,
  v.object({
    result: v.optional(
      v.object({
        guard_output: v.optional(v.record(v.string(), v.unknown())),
        blocked: v.optional(v.boolean()),
        transformed: v.optional(v.boolean()),
        policy: v.optional(v.string()),
        detectors: v.object({
          malicious_prompt: v.optional(
            v.object({
              detected: v.optional(v.boolean()),
              data: v.optional(AidrPromptInjectionResultSchema),
            })
          ),
          confidential_and_pii_entity: v.optional(
            v.object({
              detected: v.optional(v.boolean()),
              data: v.optional(AidrRedactEntityResultSchema),
            })
          ),
          malicious_entity: v.optional(
            v.object({
              detected: v.optional(v.boolean()),
              data: v.optional(AidrMaliciousEntityResultSchema),
            })
          ),
          custom_entity: v.optional(
            v.object({
              detected: v.optional(v.boolean()),
              data: v.optional(AidrRedactEntityResultSchema),
            })
          ),
          secret_and_key_entity: v.optional(
            v.object({
              detected: v.optional(v.boolean()),
              data: v.optional(AidrRedactEntityResultSchema),
            })
          ),
          competitors: v.optional(
            v.object({
              detected: v.optional(v.boolean()),
              data: v.optional(AidrSingleEntityResultSchema),
            })
          ),
          language: v.optional(
            v.object({
              detected: v.optional(v.boolean()),
              data: v.optional(AidrLanguageResultSchema),
            })
          ),
          topic: v.optional(
            v.object({
              detected: v.optional(v.boolean()),
              data: v.optional(AidrTopicResultSchema),
            })
          ),
          code: v.optional(
            v.object({
              detected: v.optional(v.boolean()),
              data: v.optional(AidrLanguageResultSchema),
            })
          ),
        }),
        access_rules: v.optional(AidrAccessRulesResponseSchema),
        fpe_context: v.optional(v.string()),
      })
    ),
  }),
]);

export const GetAsyncRequestRequestSchema = v.object({
  body: v.optional(v.never()),
  path: v.object({
    requestId: v.string(),
  }),
  query: v.optional(v.never()),
});

export const GetAsyncRequestResponseSchema = v.union([
  PangeaResponseSchema,
  v.intersect([
    PangeaResponseSchema,
    v.object({
      result: v.optional(
        v.object({
          ttl_mins: v.optional(v.pipe(v.number(), v.integer())),
          retry_counter: v.optional(v.pipe(v.number(), v.integer())),
          location: v.optional(v.string()),
        })
      ),
    }),
  ]),
]);
