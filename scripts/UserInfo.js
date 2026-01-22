export class UserInfo {
  constructor({ userName, userJob }) {
    this._userName = document.querySelector(userName);
    this._userJob = document.querySelector(userJob);
    this._userImage = document.querySelector(".profile__img");
  }
  getUserInfo() {
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
}
