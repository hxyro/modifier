const error = {
  NotFound: 'not found',
  NameTaken: (name) => `Error: The name '${name}' is already taken.`,
  DoesNotExist: (name, value) => `Error: ${name} '${value}' dose not exist.`,
  AlreadyExist: (name, value) =>
    `Error: The ${name} '${value}' already exists on this account.`,
  IsRequired: (name) => `Error: '${name}' is required property`,
  NotValid: (name) => `Error: '${name}' contains invalid charactersis.`,
  InvalidUrl: (name) => `Error: '${name}': Invalid url`,
  ServerError: `Error: Server Error.`,
  LengthExceeded: (obj) => `${obj.field} should be less than ${obj.len}`,
}

const info = {
  Removed: (name) => `Info: '${name}' Removed Successfully.`,
  Deleted: (name) => `Info: '${name}' Deleted Successfully.`,
}

export default { error, info }
