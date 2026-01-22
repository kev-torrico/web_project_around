export class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }
  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(
      this._checkResponse,
    );
  }
  _checkResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`Algo ha fallado: ${res.status}`);
  }
}
