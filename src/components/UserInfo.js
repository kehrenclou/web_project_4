/* --------------------------------- imports -------------------------------- */

import { selectors } from "../utils/constants.js";

/* ---------------------------------- class --------------------------------- */
export default class UserInfo {
  //data is passing in access to selectors in constants...is it being used?
  //setUserInfo can access directly.  don't understand the point of passing in "data"
  //to constructor
  //is data: selectors being used in SetUserInfo or is it a direct call?

  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._profileNameElement = document.querySelector(nameSelector);
    this._profileAboutElement = document.querySelector(aboutSelector);
    this._profileAvatarElement = document.querySelector(avatarSelector);
  }
  // constructor({ nameSelector, aboutSelector }) {
  //   this._profileNameElement = document.querySelector(nameSelector);
  //   this._profileAboutElement = document.querySelector(aboutSelector);

  // }

  getUserInfo() {
    //returns an object with info about user from webpage
    //use to display user data in open form
    //called in index.js in handleEditProfileOpenButtonClick

    return {
      userName: this._profileNameElement.textContent,
      userAbout: this._profileAboutElement.textContent,
    };
  }

  setUserInfo(formData) {
    //takes new user data from form and adds it on the page

    this._profileNameElement.textContent = formData[selectors.inputNameName];
    this._profileAboutElement.textContent = formData[selectors.inputAboutName];
  }

  initializeUserInfo(serverData) {
    this._profileNameElement.textContent = serverData.name;
    this._profileAboutElement.textContent = serverData.about;
    this._profileAvatarElement.src = serverData.avatar;
  }
}
