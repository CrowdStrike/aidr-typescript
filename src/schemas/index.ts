import * as v from 'valibot';

const BaseAPIResponseSchema = {
  request_id: v.string(),
  request_time: v.string(),
  response_time: v.string(),
  status: v.string(),
};

export const ErrorCodeSchema = v.picklist([
  'FieldRequired',
  'InvalidString',
  'InvalidNumber',
  'InvalidInteger',
  'InvalidObject',
  'InvalidArray',
  'InvalidNull',
  'InvalidBool',
  'BadFormat',
  'BadFormatPangeaDuration',
  'BadFormatDateTime',
  'BadFormatTime',
  'BadFormatDate',
  'BadFormatEmail',
  'BadFormatHostname',
  'BadFormatIPv4',
  'BadFormatIPv6',
  'BadFormatIPAddress',
  'BadFormatUUID',
  'BadFormatURI',
  'BadFormatURIReference',
  'BadFormatIRI',
  'BadFormatIRIReference',
  'BadFormatJSONPointer',
  'BadFormatRelativeJSONPointer',
  'BadFormatRegex',
  'BadFormatJSONPath',
  'BadFormatBase64',
  'DoesNotMatchPattern',
  'DoesNotMatchPatternProperties',
  'NotEnumMember',
  'AboveMaxLength',
  'BelowMinLength',
  'AboveMaxItems',
  'BelowMinItems',
  'NotMultipleOf',
  'NotWithinRange',
  'UnexpectedProperty',
  'InvalidPropertyName',
  'AboveMaxProperties',
  'BelowMinProperties',
  'NotContains',
  'ContainsTooMany',
  'ContainsTooFew',
  'ItemNotUnique',
  'UnexpectedAdditionalItem',
  'InvalidConst',
  'IsDependentOn',
  'IsTooBig',
  'IsTooSmall',
  'ShouldNotBeValid',
  'NoUnevaluatedItems',
  'NoUnevaluatedProperties',
  'DoesNotExist',
  'IsReadOnly',
  'CannotAddToDefault',
  'MustProvideOne',
  'MutuallyExclusive',
  'BadState',
  'InaccessibleURI',
  'ProviderDisabled',
  'ConfigProjectMismatch',
  'ConfigServiceMismatch',
  'ConfigNotExist',
]);

const ErrorDetailSchema = v.object({
  code: ErrorCodeSchema,
  detail: v.string(),
  source: v.string(),
  path: v.optional(v.string()),
});

export const AcceptedResponseSchema = v.object({
  ...BaseAPIResponseSchema,
  status: v.literal('Accepted'),
  result: v.object({
    ttl_mins: v.number(),
    retry_counter: v.number(),
    location: v.string(),
  }),
});

export const ErrorResponseSchema = v.object({
  ...BaseAPIResponseSchema,
  status: v.string(),
  result: v.nullable(v.array(ErrorDetailSchema)),
});

export const SuccessResponseSchema = <T extends v.GenericSchema>(
  resultSchema: T
) =>
  v.object({
    ...BaseAPIResponseSchema,
    status: v.literal('Success'),
    result: resultSchema,
  });

export const APIResponseSchema = <T extends v.GenericSchema>(resultSchema: T) =>
  v.union([
    AcceptedResponseSchema,
    SuccessResponseSchema(resultSchema),
    ErrorResponseSchema,
  ]);
