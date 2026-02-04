import { Api } from "./Api.js";

export class UserApi extends Api {
  constructor(config) {
    super(config);
  }
  fetchUserInfo() {
    return this._request("users/me", {
      method: "GET",
      headers: {
        "Content-Type": this._headers.contentType,
        Authorization: this._headers.token,
      },
    });
  }
  updateProfile(data) {
    return this._request("users/me", {
      method: "PATCH",
      headers: {
        "Content-Type": this._headers.contentType,
        Authorization: this._headers.token,
      },
      body: JSON.stringify(data),
    });
  }
  updateAvatar(avatarUrl) {
    return this._request("users/me/avatar", {
      method: "PATCH",
      headers: {
        "Content-Type": this._headers.contentType,
        Authorization: this._headers.token,
      },
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    });
  }
}
