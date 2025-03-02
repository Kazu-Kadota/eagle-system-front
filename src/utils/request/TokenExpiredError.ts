export class TokenExpiredError extends Error {
  constructor() {
    super('Token expirado, faça login novamente.');
  }
}
