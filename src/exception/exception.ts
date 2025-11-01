export default class Exception extends Error {
  constructor(public status: number, public message: string) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
  }
}