/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
//import css
import "./index.css";
//import all the classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js"; //check if needed
import UserInfo from "../components/UserInfo.js";

//import otherstuff
import { selectors } from "../utils/constants.js";
// import { initialCards, selectors } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

import { Api, baseUrl, token } from "..//components/Api.js";

/* ------------------------ constants used only once ------------------------ */

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
function fillProfileForm(data) {
  inputNameElement.value = data.userName;
  inputAboutElement.value = data.userAbout;
}
function handleEditProfileOpenButtonClick() {
  fillProfileForm(userInfo.getUserInfo());
  editProfileForm.open();
}

function handleAddPlaceOpenButtonClick() {
  addPlaceForm.open();
}
/* --------------------------------- methods -------------------------------- */

const renderCard = (item) => {
  const cardElement = new Card(
    item,
    {
      templateSelector: selectors.cardTemplateId,
    },
    {
      handleCardClick: (imageModalSelector, title, link) => {
        const imagePopup = new PopupWithImage({
          modalSelector: imageModalSelector,
        });
        imagePopup.open(title, link);
      },
    }
  );

  cardSection.addItem(cardElement.createCard());
};
/* -------------------------- open event listeners -------------------------- */
editProfileOpenButton.addEventListener(
  "click",
  handleEditProfileOpenButtonClick
);

addPlaceOpenButton.addEventListener("click", handleAddPlaceOpenButtonClick);

/* ------------------------------- Section and Card class ------------------------------- */
//now called in API stuff at bottom
// const cardSection = new Section(
//   {
//     items: initialCards,
//     renderer: renderCard,
//   },
//   { containerSelector: selectors.cardSectionSelector }
// );

// //initialize cards
// // cardSection.renderItems(initialCards);//don't need to pass initial cards here
// cardSection.renderItems();

/* ------------------------------ userinfoClass ----------------------------- */

const userInfo = new UserInfo({
  nameSelector: selectors.profileNameID,
  aboutSelector: selectors.profileAboutID,
  avatarSelector: selectors.profileAvatarID,
});
// const userInfo = new UserInfo({
//   nameSelector: selectors.profileNameID,
//   aboutSelector: selectors.profileAboutID,
// });

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

const editProfileForm = new PopupWithForm(
  { modalSelector: selectors.editProfileModalID },
  {
    handleFormSubmit: (formData) => {
      userInfo.setUserInfo(formData);
      editProfileForm.close();
      formValidators[selectors.profileFormName].disableSubmitButton();
    },
  }
);

/* -------------------- PopupWithForms Class - Add Place -------------------- */
const addPlaceForm = new PopupWithForm(
  { modalSelector: selectors.addPlaceModalID },
  {
    handleFormSubmit: (formData) => {
      renderCard({
        name: formData[selectors.inputTitleName],
        link: formData[selectors.inputLinkName],
      });

      addPlaceForm.close();
      addPlaceForm.reset();

      formValidators[selectors.placeFormName].disableSubmitButton();
    },
  }
);

/* ----------------------------- FormValidation ----------------------------- */
const formValidatorConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button-submit",
  inactiveButtonClass: "modal__button-submit_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
  formSelector: ".modal__form",
};

//create empty object to store form validators
const formValidators = {};

const createValidatorInstances = (config) => {
  //create array of all forms on page
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  //for each form,
  formList.forEach((formElement) => {
    //instantiate a formValidator instance
    const validator = new FormValidator(config, formElement);
    //get name of form
    const formName = formElement.getAttribute("name");

    //store validator by name of form
    formValidators[formName] = validator;

    //run validator.enableValidation() (from FormValidator.js)
    validator.enableValidation();
  });
};

createValidatorInstances(formValidatorConfig);

/* ---------------------------------- test ---------------------------------- */
// Token: 72dee144-4e03-4ccf-86c7-08640cb55eca
// Group ID: group-12
// const baseUrl = "https://around.nomoreparties.co/v1/group-12";
// const token = "72dee144-4e03-4ccf-86c7-08640cb55eca";

//set Api connection
const api = new Api({
  baseUrl: baseUrl,
  headers: { authorization: token, "Content-Type": "application/json" },
});

//set card section to null to reset in .then below
let cardSection = null;
// let userID = null;


api.getAppInfo().then(([userData, initialCards]) => {

  // userID = userData._id;

//   //1. set UserInfo on page
  userInfo.initializeUserInfo(userData);

  //2. create new section passing in initialCards
 cardSection = new Section(
    {
      items: initialCards,
      renderer: renderCard,
    },
    { containerSelector: selectors.cardSectionSelector }
  );
  //3. render items
  cardSection.renderItems();
});

/* --------------------------------- export --------------------------------- */
