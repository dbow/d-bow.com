export default class Request {
  constructor() {
    this.requests = {};
    this.errors = {};
  }

  initialize(data) {
    this.errors = data;
  }

  start(key) {
    this.requests[key] = true;
  }

  finish(key) {
    this.requests[key] = false;
    this.errors[key] = false;
  }

  inProgress(key) {
    return this.requests[key];
  }

  error(key) {
    this.requests[key] = false;
    this.errors[key] = true;
  }

  hasError(key) {
    return this.errors[key];
  }

  serialize() {
    return this.errors;
  }
}

