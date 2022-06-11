const error = {
  NameTaken: (name) => `Error: The name '${name}' is already taken.`,
  UserDoesNotExist: (name) => `Error: user '${name}' dose not exist.`,
  ModifierDoesNotExist: (name) => `Error: modifier '${name}' dose not exist.`,
  ModifierExist: (name) =>
    `Error: The modifier '${name}' already exists on this account.`,
  IsRequired: (name) => `Error: '${name}' is required property`,
  NotValid: (name) => `Error: '${name}' contains invalid charactersis.`,
  InvalidUrl: (name) => `Error: '${name}': Invalid url`,
  ServerError: `Error: Server Error.`,
}

const info = {
  Removed: (name) => `Info: '${name}' Removed Successfully.`,
  Deleted: (name) => `Info: '${name}' Deleted Successfully.`,
}

export default { error, info }
