/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
//import all the classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import UserInfo from "../components/UserInfo.js";

//import otherstuff
import { initialCards, selectors } from "../components/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

/* ------------------------ constants used only once ------------------------ */
//used in new UserInfo
const profileNameID = "#profile-name"; //Userinfo.js
const profileAboutID = "#profile-about"; //not used yet

//used in handleEditProfileOPenButton
const inputNameElement = document.querySelector(selectors.inputNameID);
const inputAboutElement = document.querySelector(selectors.inputAboutID);

//used in OpenEventListeners
const editProfileOpenButton = document.querySelector(
  selectors.editProfileOpenButtonID
);
const addPlaceOpenButton = document.querySelector(
  selectors.addPlaceOpenButtonID
);
/* -------------------------------------------------------------------------- */
/*                                Refactoring                                */
/* -------------------------------------------------------------------------- */
/* -------------------------------- functions ------------------------------- */
function handleEditProfileOpenButtonClick() {
  //should creation of new UserInfo be done on button click here?
  const userInfo = newUserInfo.getUserInfo();

  inputNameElement.value = userInfo.userName;
  inputAboutElement.value = userInfo.userAbout;

  newEditProfileForm.open();
}
function handleAddPlaceOpenButtonClick() {
  console.log("handleAddPlaceOpenButonClick called");
  newAddPlaceForm.open();
}
/* -------------------------- open event listeners -------------------------- */
editProfileOpenButton.addEventListener(
  "click",
  handleEditProfileOpenButtonClick
);

addPlaceOpenButton.addEventListener("click", handleAddPlaceOpenButtonClick);

/* ------------------------------- Section and Card class ------------------------------- */
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = new Card(item, {
        templateSelector: selectors.cardTemplateId,
      });
      cardSection.addItem(cardElement.createCard());
    },
  },
  { containerSelector: selectors.cardSectionSelector }
);

//initialize cards
cardSection.renderItems(initialCards);

/* -------------------------- PopupWithImage Class -------------------------- */
//should be handleCardClick(){}
function handlePopupWithImage(imageModalSelector, title, link) {
  const newImagePopup = new PopupWithImage({
    modalSelector: imageModalSelector,
  });

  newImagePopup.open(title, link);
}

/* ------------------------------ userinfoClass ----------------------------- */

const newUserInfo = new UserInfo({
  nameSelector: profileNameID,
  aboutSelector: profileAboutID,
});

/* --------------------------- PopupWithForms Class - Edit Profile -------------------------- */
//pass formData object containing data from form
//to a new instance of PopupWithForm
//formData parameter is a value that will pass
//to this._handleFormSubmit() when calling it in PopupWith Form
//on submit click event listener
//it is an object returned by this._getInputValues()method

//prevent default put onto event listener
//get input values is done in PopupwithForm class  and put into dom
//close modal

const newEditProfileForm = new PopupWithForm(
  { modalSelector: selectors.editProfileModalID },
  {
    handleFormSubmit: (formData) => {
      newUserInfo.setUserInfo(formData);

      newEditProfileForm.close();
    },
  }
);

/* -------------------- PopupWithForms Class - Add Place -------------------- */

const newAddPlaceForm = new PopupWithForm(
  { modalSelector: selectors.addPlaceModalID },
  {
    handleFormSubmit: (formData) => {
      //need to set new src, alt and place name
      //gets input list array on submit - formData
      //need to grab these things and set up the new place card
      const newPlaceContainer = document.querySelector(
        selectors.cardSectionSelector
      );
      const placeData = {
        name: formData[selectors.inputTitleName],
        link: formData[selectors.inputLinkName],
      };
      // const { "input-place-link": link, "input-place-title": name } = formData;

      const newPlace = new Card(placeData, {
        templateSelector: selectors.cardTemplateId,
      });

      newPlaceContainer.prepend(newPlace.createCard());
      newAddPlaceForm.close();
    },
  }
);

/* --------------------------------- export --------------------------------- */
export { handlePopupWithImage }; //imports in Card
