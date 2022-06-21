/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
//import all the classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";

//import otherstuff
import { initialCards, selectors } from "../components/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
// import { imageModal } from "../utils/utility.js";
// import { closeModal, openModal } from "../utils/utility.js";

/* ------------------------ constants used only once ------------------------ */
const profileName = document.querySelector("#profile-name");
const profileAbout = document.querySelector("#profile-about");

const editProfileOpenButton = document.querySelector(
  "#edit-profile-open-button"
);

/* -------------------------------------------------------------------------- */
/*                                Refactoring                                */
/* -------------------------------------------------------------------------- */
/* -------------------------------- functions ------------------------------- */
function handleEditProfileOpenButtonClick() {
  newEditProfileForm.open();
  // populateProfileFormInputs();
  // formValidators[editProfileForm.getAttribute("name")].resetValidation();
}
function populateProfileFromFormInputs(formData) {
  profileName.textContent = formData["input-name"];
  profileAbout.textContent = formData["input-about"];
}

/* -------------------------- open event listeners -------------------------- */
editProfileOpenButton.addEventListener(
  "click",
  handleEditProfileOpenButtonClick
);

/* ------------------------------- Card class ------------------------------- */
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = new Card(item, selectors.cardTemplate);
      cardSection.addItem(cardElement.createCard());
    },
  },
  selectors.cardSection
);

//initialize cards
cardSection.renderItems(initialCards);
//all the rest
/* ------------------------------- Popup Class ------------------------------ */
// const newPopup = new Popup(selectors.addPlaceModalSelector);

/* -------------------------- PopupWithImage Class -------------------------- */
function handlePopupWithImage(imageSelector, title, link) {
  const newImagePopup = new PopupWithImage(selectors.imageModalSelector);

  newImagePopup.open(selectors.imageModalSelector, title, link);
}

/* --------------------------- PopupWithForm Class -------------------------- */
//edit profile

const newEditProfileForm = new PopupWithForm(
  selectors.editProfileModalSelector,
  {
    handleFormSubmit: (formData) => {
      //pass formData object containing data from form
      //to a new instance of PopupWithForm
      //formData parameter is a value that will pass
      //to this._handleFormSubmit() when calling it in PopupWith Form
      //it is an object returned by this._getInputValues()method

      //prevent default put onto event listener
      //get input values is done in class and put into dom
      //close modal
      populateProfileFromFormInputs(formData);
      newEditProfileForm.close();
    },
  }
);

newEditProfileForm.open();
/* --------------------------------- export --------------------------------- */
export { handlePopupWithImage };
