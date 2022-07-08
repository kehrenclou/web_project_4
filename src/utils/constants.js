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
  cardListItemSelector: ".cards__item", //card.js
  cardLikeCountSelector: ".cards__like-count", //Card.js
  cardImageID: "#card-image", //card.js
  cardTitleID: "#card-text", //card.js
  cardTrashButtonActiveSelector:"cards__button_type_delete-active", //card.js
  cardLikeButtonActiveSelector:"cards__button_type_like-active", //card.js

  imgSelector: ".modal__image", //section.js
  captionSelector: ".modal__caption", //section.js

  imageModalID: "#modal-image-popup", //index.js
  editAvatarModalID: "#modal-change-avatar", //index.js
  editProfileModalID: "#modal-edit-profile", //index.js
  addPlaceModalID: "#modal-add-place", //?need
  checkDeleteModalID: "#modal-check-delete", //index.js

  profileNameID: "#profile-name", //index.js
  profileAboutID: "#profile-about", //index.js

  profileAvatarImageID: "#profile-avatar-image", //index.js

  formSelector: ".modal__form", //popup.js
  placeFormName: "form-add-place", //index.js
  profileFormName: "form-edit-profile", //index.js
  avatarFormName: "form-change-avatar", //index.js

  inputSelector: ".modal__input", //popupWithForm.js
  inputNameID: "#input-profile-name", //index.js
  inputAboutID: "#input-profile-about", //index.js
  inputNameName: "input-name", //userinfo.js
  inputAboutName: "input-about", //userinfo.js
  inputTitleName: "input-place-title", //index.js
  inputLinkName: "input-place-link", //index.js
  inputAvatarLinkName: "input-avatar-link", //index.js

  closeModalButtonSelector: ".modal__button-close",

  profileAvatarContainerID: "#profile-avatar-container", //index.js - div works like a button
  editProfileOpenButtonID: "#edit-profile-open-button", //index.js
  addPlaceOpenButtonID: "#add-place-open-button", //index.js
  deletePlaceButtonID: "#place-delete-button", //card.js
  likePlaceButtonID: "#place-like-button", //card.js

  deletePlaceSubmitButtonID:"#check-delete-submit-button", //index.js
  popupSubmitButtonSelector:".modal__button-submit",//index.js
};
