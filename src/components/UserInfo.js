/* --------------------------------- imports -------------------------------- */

import { selectors } from "../utils/constants.js"; //check if still used

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
 

  getUserInfo() {
    //returns an object with info about user from webpage
    //use to display user data in open form
    //called in index.js in handleEditProfileOpenButtonClick

    return {
      userName: this._profileNameElement.textContent,
      userAbout: this._profileAboutElement.textContent,
    };
  }


  setUserInfo(userName, userAbout) {
    //takes new user data from form or server and adds it on the page
    this._profileNameElement.textContent = userName;
    this._profileAboutElement.textContent = userAbout;
  }

  setUserAvatar(userAvatar) {
    this._profileAvatarElement.src = userAvatar;
  }

  setUserID(userId) {
    this._userId = userId;
   
  }
  getUserId() {//returns undefined check if used or how to use it!
   
    return this._userId;
  
  }
}
