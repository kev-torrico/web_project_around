export class Section {
  constructor({ items, renderer, baseUrl, headers }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  renderItems() {
    this._initialArray.forEach((item) => {
      this._renderer(item);
    });
  }
  addItem(element) {
    this._container.prepend(element);
  }
  setItems(items) {
    this._initialArray = items;
  }
  getItems() {
    this._request(`${this._baseUrl}/cards/`, {
      method: "GET",
      headers: this._headers,
    });
  }
  _request(url, options) {
    return fetch(url, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Algo ha fallado ${res.status}`);
      })
      .then((cards) => {
        this.setItems(cards);
        this.renderItems(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
