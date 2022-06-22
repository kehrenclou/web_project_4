/* --------------------------------- imports -------------------------------- */

import { selectors, names } from "./constants.js";
import { profileName } from "../pages/index.js";

/* ---------------------------------- class --------------------------------- */
export default class UserInfo {
  constructor(names, selectors) {
    this._profileNameElement = profileName;
    // this._profileNameElement = document.querySelector("#profile-name");
    this._profileAboutElement = document.querySelector("#profile-about");
    // these const aer also in index js - clean up or change
  }

  test() {
    console.log("profileName: ", this._profileNameElement);
    console.log("profileAbout: ", this._profileAboutElement);
  }

  getUserInfo() {
    //returns an object with info about user from webpage
    //use to display user data in open form
    //called in index.js in handleEditProfileOpenButtonClick

    // this.inputName = this._profileNameElement.textContent;
    // this.inputAbout = this._profileAboutElement.textContent;
    return {
      userName: this._profileNameElement.textContent,
      userAbout: this._profileAboutElement.textContent,
    };

    //in constants:
    // export const profileName = document.querySelector("#profile-name");
    // export const profileAbout = document.querySelector("#profile-about");
  }

  setUserInfo(formData) {
    //takes new user data from form and adds it on the page

    this._profileNameElement.textContent = formData["input-name"];
    this._profileAboutElement.textContent = formData["input-about"];
    // profileName.textContent = formData["input-name"];
    // profileAbout.textContent = formData["input-about"];
  }
}

//? constructor(name, title){
// this.name=name;
//this.title=title;
//}
