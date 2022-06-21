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
  cardSection: ".cards__list",
  cardTemplate: "#card-template",
  modalSelector: ".modal",
  editProfileModalSelector: "#modal-edit-profile",
  addPlaceModalSelector: "#modal-add-place",
  imageModalSelector: "#modal-image-popup",
  imgSelector: ".modal__image",
  captionSelector: ".modal__caption",
  inputSelector: ".modal__input",
  // profileNameSelector:"#profile-name", // maynot need
  // profileAboutSelector:"#profile-about" //may not need
};

export const names = {
  inputName: "input-name",
  inputAbout: "input-about",
  inputPlaceLink: "input-place-link",
  inputPlaceTitle: "input-place-title",
};
//consider refactoring to inputs like selectors
export const profileName = document.querySelector("#profile-name");
export const profileAbout = document.querySelector("#profile-about");
