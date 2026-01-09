export class UserInfo {
  constructor({ userName, userJob, baseUrl, headers }) {
    this._userName = document.querySelector(userName);
    this._userJob = document.querySelector(userJob);
    this._userImage = document.querySelector(".profile__img");
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  getUserInfo() {
    this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
      .then((result) => {
        this.setUserInfo({
          name: result.name,
          job: result.about,
          profileImage: result.avatar,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    return {
      name: this._userName.textContent,
      job: this._userJob.textContent,
      profileImage: this._userImage,
    };
  }
  setUserInfo({ name, job, profileImage }) {
    this._userName.textContent = name;
    this._userJob.textContent = job;
    this._userImage.src = profileImage || "../images/profile-img.jpg";
  }

  updateProfile(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((result) => {
      this.setUserInfo({
        name: result.name,
        job: result.about,
      });
    });
  }
  _request(url, options) {
    return fetch(url, options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Algo ha fallado: ${res.status}`);
    });
  }
}
