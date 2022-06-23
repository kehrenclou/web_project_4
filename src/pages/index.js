/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
//import css
import "./index.css";
//import all the classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
// import Popup from "./components/Popup.js";//check if needed
import UserInfo from "../components/UserInfo.js";

//import otherstuff
import { initialCards, selectors } from "../components/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

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
function handleEditProfileOpenButtonClick() {
  //should creation of new UserInfo be done on button click here?
  const userInfo = newUserInfo.getUserInfo();

  inputNameElement.value = userInfo.userName;
  inputAboutElement.value = userInfo.userAbout;

  newEditProfileForm.open();
}

function handleAddPlaceOpenButtonClick() {
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
    },
  },
  { containerSelector: selectors.cardSectionSelector }
);

//initialize cards
cardSection.renderItems(initialCards);

/* ------------------------------ userinfoClass ----------------------------- */

const newUserInfo = new UserInfo({
  nameSelector: selectors.profileNameID,
  aboutSelector: selectors.profileAboutID,
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
      const newPlaceContainer = document.querySelector(
        selectors.cardSectionSelector
      );
      const placeData = {
        name: formData[selectors.inputTitleName],
        link: formData[selectors.inputLinkName],
      };

      const newPlace = new Card(
        placeData,
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

      newPlaceContainer.prepend(newPlace.createCard());
      newAddPlaceForm.close();
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
/* --------------------------------- export --------------------------------- */
