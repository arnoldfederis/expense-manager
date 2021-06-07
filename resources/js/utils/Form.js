import Errors from "./Errors";

export default class Form {
  constructor(data) {
    this.originalData = data;

    for (let key in data) {
      this[key] = data[key];
    }

    this.errors = new Errors();

    return this;
  }

  data() {
    let dataCopy = {};

    for (let key in this.originalData) {
      dataCopy[key] = this[key];
    }

    return dataCopy;
  }

  post(url) {
    return this.submit('post', url);
  }

  put(url) {
    return this.submit('put', url);
  }

  patch(url) {
    return this.submit('patch', url);
  }

  delete(url) {
    return this.submit('delete', url);
  }

  submit(requestType, url) {
    const method = requestType.toLowerCase();
    const data = this.data();

    return new Promise((resolve, reject) => {
      window.axios.request({ method, url, data })
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          if (response.status === 422) {
            this.onError(response.data.errors);
          }

          reject(response);
        });
    });
  }

  onError(errors) {
    this.errors.record(errors);
  }

  reset() {
    for (let key in this.originalData) {
      this[key] = this.originalData[key];
    }

    this.errors.clear();
  }

  resetExcept(exceptions) {
    for (let key in this.originalData) {
      if (key === exceptions) {
        continue;
      }

      this[key] = this.originalData[key];
    }

    this.errors.clear();
  }
}
