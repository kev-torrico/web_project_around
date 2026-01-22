import { Api } from "./Api.js";

export class CardApi extends Api {
  constructor(config) {
    super(config);
  }
  fetchCards() {
    return this._request("cards/", {
      method: "GET",
      headers: {
        "Content-Type": this._headers.contentType,
        Authorization: this._headers.token,
      },
    });
  }
  createCard(cardData) {
    return this._request("cards/", {
      method: "POST",
      headers: {
        "Content-Type": this._headers.contentType,
        Authorization: this._headers.token,
      },
      body: JSON.stringify(cardData),
    });
  }
}
