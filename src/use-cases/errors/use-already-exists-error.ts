export class UserAlreadyExistsError extends Error {
  constructor() {
    super('E-Mail Already Exists.')
  }
}
