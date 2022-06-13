/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

import { closeModal, openModal } from "./utility.js";

/* -------------------------------------------------------------------------- */
/*                                Declarations                                */
/* -------------------------------------------------------------------------- */

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];
/* -------------------------------- wrappers -------------------------------- */
const editProfileModal = document.querySelector("#modal-edit-profile");
const editProfileForm = document.querySelector("#modal-form-edit-profile");

const placesList = document.querySelector(".cards__list"); //used in in scripts

const addPlaceModal = document.querySelector("#modal-add-place");
const addPlaceForm = document.querySelector("#modal-form-add-place");

/* -------------------------------- Form data ------------------------------- */
const profileNameInputElement = document.querySelector("#input-profile-name");
const profileAboutInputElement = document.querySelector("#input-profile-about");

const placeTitleInputElement = document.querySelector("#input-place-title");
const placeLinkInputElement = document.querySelector("#input-place-link");

/* --------------------- Buttons and other DOM elements --------------------- */
const editProfileOpenButton = document.querySelector(
  "#edit-profile-open-button"
);
const addPlaceOpenButton = document.querySelector("#add-place-open-button");

const closeButtons = document.querySelectorAll(".modal__button-close");

const profileName = document.querySelector("#profile-name");
const profileAbout = document.querySelector("#profile-about");

/* ------------------------------ profile Edit ------------------------------ */

function populateProfileFormInputs() {
  profileNameInputElement.value = profileName.textContent;
  profileAboutInputElement.value = profileAbout.textContent;
}
function populateProfileFromFormInputs() {
  profileName.textContent = profileNameInputElement.value;
  profileAbout.textContent = profileAboutInputElement.value;
}

/* ------------------------------- places Add ------------------------------- */

function renderCard(data, cardWrap) {
  const card = new Card(data, "#card-template").createCard();

  cardWrap.prepend(card);
}

function addPlaceToCards() {
  const newCard = {
    name: placeTitleInputElement.value,
    link: placeLinkInputElement.value,
  };
  renderCard(newCard, placesList);
}

/* ----------------------------- Event Handlers ----------------------------- */
function handleEditProfileOpenButtonClick() {
  openModal(editProfileModal);
  populateProfileFormInputs();
  editFormValidator.resetValidation();
}
function handleEditProfileFormSubmit(e) {
  e.preventDefault();
  populateProfileFromFormInputs();
  closeModal(editProfileModal);
}

function handleAddPlaceOpenButtonClick() {
  openModal(addPlaceModal);
  addFormValidator.resetValidation();
}
function handleAddPlaceFormSubmit(e) {
  e.preventDefault();
  addPlaceToCards();

  addPlaceForm.reset();
  closeModal(addPlaceModal);
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */

editProfileOpenButton.addEventListener(
  "click",
  handleEditProfileOpenButtonClick
);
editProfileForm.addEventListener("submit", handleEditProfileFormSubmit, true);

addPlaceOpenButton.addEventListener("click", handleAddPlaceOpenButtonClick);

addPlaceForm.addEventListener("submit", handleAddPlaceFormSubmit);

/* -------------------------------------------------------------------------- */
/*                                 scripts                                */
/* -------------------------------------------------------------------------- */
initialCards.forEach(function (card) {
  renderCard(card, placesList);
});

closeButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    const modalName = closeButton.closest(".modal");
    closeModal(modalName);
  });
});
/* ----------------------------- FormValidation ----------------------------- */
const formValidatorConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button-submit",
  inactiveButtonClass: "modal__button-submit_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const addFormValidator = new FormValidator(formValidatorConfig, addPlaceForm);
const editFormValidator = new FormValidator(
  formValidatorConfig,
  editProfileForm
);
addFormValidator.enableValidation();
editFormValidator.enableValidation();
