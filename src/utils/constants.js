// export const initialCards = [
//   {
//     name: "Yosemite Valley",
//     link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
//   },
//   {
//     name: "Lake Louise",
//     link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
//   },
//   {
//     name: "Bald Mountains",
//     link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
//   },
//   {
//     name: "Latemar",
//     link: "https://code.s3.yandex.net/web-code/latemar.jpg",
//   },
//   {
//     name: "Vanoise National Park",
//     link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
//   },
//   {
//     name: "Lago di Braies",
//     link: "https://code.s3.yandex.net/web-code/lago.jpg",
//   },
// ];

export const selectors = {
  cardSectionSelector: ".cards__list", //index.js
  cardTemplateId: "#card-template", //index.js, card.js
  cardListItemSelector: ".cards__item", //cards.js
  cardLikeButtonSelector: ".cards__button_type_like", // not yet but in card.js
  placeDeleteButtonID: "#place-delete-button", //card.js
  cardImageID: "#card-image", //card.js
  cardTitleID: "#card-text", //card.js

  imageModalID: "#modal-image-popup", //index.js
  imgSelector: ".modal__image", //section.js
  captionSelector: ".modal__caption", //section.js

  editProfileModalID: "#modal-edit-profile", //index.js
  addPlaceModalID: "#modal-add-place", //?need

  profileNameID: "#profile-name", //index.js
  profileAboutID: "#profile-about", //index.js
  profileAvatarID: "#profile-avatar", //index.js

  formSelector: ".modal__form", //popup.js
  placeFormName: "form-add-place", //index.js
  profileFormName:"form-edit-profile",//index.js
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
};
