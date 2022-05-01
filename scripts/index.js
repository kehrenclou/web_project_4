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
const placesList = document.querySelector(".cards__list");

const addPlaceModal = document.querySelector("#modal-add-place");
const addPlaceForm = document.querySelector("#modal-add-place");

const imageModal = document.querySelector("#modal-image-popup");

/* -------------------------------- Form data ------------------------------- */
const profileNameInputElement = document.querySelector("#input-profile-name");
const profileAboutInputElement = document.querySelector("#input-profile-about");

const placeTitleInputElement = document.querySelector("#input-place-title");
const placeLinkInputElement = document.querySelector("#input-place-link");
/* --------------------- Buttons and other DOM elements --------------------- */
const editProfileOpenButton = document.querySelector(
  "#edit-profile-open-button"
);
const editProfileCloseButton = document.querySelector(
  "#edit-profile-close-button"
);
const addPlaceOpenButton = document.querySelector("#add-place-open-button");
const addPlaceCloseButton = document.querySelector("#add-place-close-button");

const deletePlaceButton = document.querySelector("#place-delete-button");

const profileName = document.querySelector("#profile-name");
const profileAbout = document.querySelector("#profile-about");

const modalImageElement = imageModal.querySelector(".modal__image");
const modalCaption = imageModal.querySelector(".modal__caption");
/* -------------------------------- Templates ------------------------------- */
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".cards__item");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
/* ---------------------------------- modals --------------------------------- */

function openModal(modalName) {
  modalName.classList.add("modal_open");
}
function closeModal(modalName) {
  modalName.classList.remove("modal_open");
}
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
function createCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const imageElement = cardElement.querySelector("#card-image");
  const titleElement = cardElement.querySelector("#card-text");

  imageElement.src = card.link;
  imageElement.textContent = card.name;
  titleElement.textContent = card.name;

  //add event listener
  imageElement.addEventListener("click", () => {
    modalImageElement.src = card.link;
    modalCaption.textContent = card.name;
    openModal(imageModal);
  });

  return cardElement;
}

function renderCard(card) {
  placesList.append(card);
}

function addPlaceToCards() {
  const newCard = {
    name: placeTitleInputElement.value,
    link: placeLinkInputElement.value,
  };
  const newCardElement = createCard(newCard);
  placesList.prepend(newCardElement);
}

// function deletePlace() {
//   const card = deletePlaceButton.closest(".cards__item");
//   console.log(card);
// }
/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
/* ------------------------- profile Edit Listeners ------------------------- */
editProfileOpenButton.addEventListener(
  "click",
  () => openModal(editProfileModal),
  true
); /*true sets capture handle parent first*/
editProfileOpenButton.addEventListener("click", populateProfileFormInputs);

editProfileCloseButton.addEventListener("click", () =>
  closeModal(editProfileModal)
);
editProfileForm.addEventListener(
  "submit",
  (e) => {
    e.preventDefault();
  },
  true
);
editProfileForm.addEventListener("submit", populateProfileFromFormInputs);

editProfileForm.addEventListener("submit", () => closeModal(editProfileModal));

/* -------------------------- places Add Listeners -------------------------- */
addPlaceOpenButton.addEventListener(
  "click",
  () => openModal(addPlaceModal),
  true
);
addPlaceCloseButton.addEventListener("click", () => closeModal(addPlaceModal));
addPlaceForm.addEventListener(
  "submit",
  (e) => {
    e.preventDefault();
  },
  true
);

addPlaceForm.addEventListener("submit", addPlaceToCards);

addPlaceForm.addEventListener("submit", () => closeModal(addPlaceModal));

// deletePlaceButton.addEventListener(
//   "click",
//   deletePlace
//   // find location in array
//   // remove from array ?splice
// );

/* -------------------------------------------------------------------------- */
/*                                  Test Area - scripts                                */
/* -------------------------------------------------------------------------- */
initialCards.forEach(function (card) {
  //append to the list
  const newCard = createCard(card);
  renderCard(newCard);
  // placesList.append(newCard);
  //loop
});
/*------------------------------------------------------------------ */
/*                                heart scripts                               */
/* -------------------------------------------------------------------------- */

// //variables
// const allHeartButtons = document.querySelectorAll(".cards__button_type_like");
// const heartButton = document.querySelector(".cards__button_type_like");

// //functions

// //eventlisteners
// allHeartButtons.forEach((heartButton) => {
//   heartButton.addEventListener("click", () => {
//     heartButton.classList.toggle("cards__button_type_like_active");
//   });
// });
