class Exception extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
    this.name = this.constructor.name;
  }
}

export default Exception;
