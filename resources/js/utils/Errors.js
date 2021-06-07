export default class Errors {
  constructor() {
    this.errors = {};
  }

  getAll() {
    return this.errors;
  }

  any() {
    return Object.keys(this.getAll()).length > 0;
  }

  set(field, message) {
    field = this.normalizeToArray(field);
    const fieldKey = field.shift();
    message = this.buildNestedObject(field, message, this.errors[fieldKey]);
    let obj = {};
    obj[fieldKey] = message;
    this.errors = Object.assign(this.errors, obj);
    return this;
  }

  has(field) {
    const fieldArray = this.normalizeToArray(field);
    let result = this.errors;

    while (fieldArray.length > 0) {
      let fieldPart = fieldArray.shift();
      result = result[fieldPart];
      if (!result) {
        return false;
      }
    }

    return true;
  }

  get(field) {
    if (this.has(field)) {
      return this.errors[field][0];
    }
  }

  clear(field) {
    if (!field) {
      this.errors = {};
      return this;
    }

    const fieldArray = this.normalizeToArray(field);
    let result = this.errors;

    while (fieldArray.length > 0) {
      let fieldPart = fieldArray.shift();
      if (fieldArray.length === 0) {
        delete result[fieldPart];
        break;
      }
      result = result[fieldPart];
      if (result === undefined) {
        break;
      }
    }

    return this;
  }

  clearAll() {
    this.errors = {};
  }

  record(errors) {
    this.errors = {};
    for (let key in errors) {
      this.set(key, errors[key]);
    }

    return this;
  }

  inputMessage(field) {
    if (!this.has(field)) {
      return;
    }

    return { [this.get(field)]: this.has(field) };
  }

  inputType(field) {
    if (!this.has(field)) {
      return;
    }

    return { 'is-danger': this.has(field) };
  }

  normalizeToArray(value, splitOn = '.') {
    if (!Array.isArray(value)) {
      return value.split(splitOn);
    }

    return value.slice();
  }

  buildNestedObject(fieldParts, message, existingObj) {
    fieldParts.reverse();

    while (fieldParts.length > 0) {
      let obj = {};
      let fieldPart = fieldParts.shift();
      obj[fieldPart] = message;
      message = obj;
    }

    if (typeof message === "string" || message instanceof String) {
      return message;
    }

    return Object.assign({}, existingObj, message);
  }
}
