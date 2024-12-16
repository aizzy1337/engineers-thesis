export default class ForbiddenException extends Error {
    constructor(message = 'Forbidden') {
      super(message);
      this.name = 'ForbiddenException';
      this.status = 403;
    }
  }
  