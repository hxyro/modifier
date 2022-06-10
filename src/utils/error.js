export const error = {
  NameTaken: (name) => `Error: The name '${name}' is already taken.`,
  UserDoesNotExist: (name) => `Error: user '${name}' dose not exist.`,
  ModifierDoesNotExist: (name) => `Error: modifier '${name}' dose not exist.`,
  ServerError: `Error: Server Error.`,
}

export const info = {
  Removed: (name) => `Info: '${name}' Removed Successfully.`,
  Deleted: (name) => `Info: '${name}' Deleted Successfully.`,
}
