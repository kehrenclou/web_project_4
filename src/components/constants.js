export const initialCards = [
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

export const selectors = {
  cardSectionSelector: ".cards__list", //index.js
  cardTemplateId: "#card-template", //index.js, card.js
  cardListItemSelector: ".cards__item", //cards.js
  cardLikeButtonSelector: ".cards_button_type_like", // not yet but in card.js

  imageModalID: "#modal-image-popup", //index.js
  imgSelector: ".modal__image", //section.js
  captionSelector: ".modal__caption", //section.js

  // modalSelector: ".modal", //not sure if used can't find doesn't break
  editProfileModalID: "#modal-edit-profile", //index.js
  addPlaceModalID: "#modal-add-place", //?need

  formSelector: ".modal__form", //popup.js //gets cannot access b4 initialization error on open button click
  inputSelector: ".modal__input", //popupWithForm.js
  inputNameID: "#input-profile-name", //index.js
  inputAboutID: "#input-profile-about", //index.js
  inputNameName: "input-name", //userinfo.js
  inputAboutName: "input-about", //userinfo.js
  inputTitleName: "input-place-title", //index.js
  inputLinkName: "input-place-link", //index.js

  editProfileOpenButtonID: "#edit-profile-open-button", //index.js
  addPlaceOpenButtonID: "#add-place-open-button", //index.js
  closeModalButtonSelector: ".modal__button-close",

  // inputPlaceLinkName: "input-place-link",//not used yet
  // inputPlaceTitleName: "input-place-title",not used yet
  sprofileNameID: "#profile-name",
  sprofileAboutID: "#profile-about",
};

//consider refactoring to inputs like selectors

export const profileName = document.querySelector("#profile-name");
export const profileAbout = document.querySelector("#profile-about");

//UserInfo const
// export const profileNameID = "#profile-name"; //Userinfo.js
// export const profileAboutID = "#profile-about"; //not used yet
