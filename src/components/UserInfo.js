/* --------------------------------- imports -------------------------------- */

import { selectors, names, profileName, profileAbout } from "./constants.js";

/* ---------------------------------- class --------------------------------- */
export default class UserInfo {
  constructor(formData) {
    this.name = formData[names.inputName];
    this.about = formData[names.inputAbout];
  }

  getUserInfo() {
    //returns an object with info about user
    //use to display user data in open form
  }

  setUserInfo() {
    //takes new user data from form and adds it on the page
    profileName.textContent = this.name;
    profileAbout.textContent = this.about;
    // profileName.textContent = formData["input-name"];
    // profileAbout.textContent = formData["input-about"];
  }
}

//? constructor(name, title){
// this.name=name;
//this.title=title;
//}
