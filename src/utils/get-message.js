const messages = {
  // for validators:
//   INPUT_REQUIRED: "{{ input }} input not found.",
  INPUT_INVALID: '{{ input }} input is Invalid.',
  INPUT_STRING: '{{ input }} input should be string.',
  INVALID_URL: '{{ input }} input should be URL.',
  INVALID_TYPE: '{{ input }} input is not valid type.',
  EMAIL_VERIFY:'email already existed in the database',
  // devOps
  STATUS_UPDATED: 'Status updated',
};

// eslint-disable-next-line security/detect-object-injection
const getMessage = key => messages[key] || key;

module.exports = getMessage;
