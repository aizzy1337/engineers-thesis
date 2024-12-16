export default class NotFoundException extends Error {
    constructor(message = 'Not Found') {
      super(message);
      this.name = 'NotFoundException';
      this.status = 404;
    }
}