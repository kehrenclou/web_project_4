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

const closeButtons = document.querySelectorAll(".modal__button-close");

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
  const deleteButton = cardElement.querySelector("#place-delete-button");
  const likeButton = cardElement.querySelector(".cards__button_type_like");

  imageElement.src = card.link;
  imageElement.textContent = card.name;
  titleElement.textContent = card.name;

  //add event listeners
  imageElement.addEventListener("click", () => {
    modalImageElement.src = card.link;
    modalCaption.textContent = card.name;
    openModal(imageModal);
  });

  deleteButton.addEventListener("click", () => {
    const cardItem = deleteButton.closest(".cards__item");
    cardItem.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("cards__button_type_like-active");
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
/* ----------------------------- Event Handlers ----------------------------- */
function editProfileOpenButtonEvtHandler() {
  openModal(editProfileModal);
  populateProfileFormInputs();
}
function editProfileFormEvtHandler(e) {
  e.preventDefault();
  populateProfileFromFormInputs();
  closeModal(editProfileModal);
}
function addPlaceFormEvtHandler(e) {
  e.preventDefault();
  addPlaceToCards();
  closeModal(addPlaceModal);
}
/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */

editProfileOpenButton.addEventListener(
  "click",
  editProfileOpenButtonEvtHandler
);
editProfileForm.addEventListener("submit", editProfileFormEvtHandler, true);

addPlaceOpenButton.addEventListener(
  "click",
  () => openModal(addPlaceModal),
  true
);

addPlaceForm.addEventListener("submit", addPlaceFormEvtHandler);

/* -------------------------------------------------------------------------- */
/*                                 scripts                                */
/* -------------------------------------------------------------------------- */
initialCards.forEach(function (card) {
  //append to the list
  const newCard = createCard(card);
  renderCard(newCard);
});

closeButtons.forEach((closebutton) => {
  closebutton.addEventListener("click", () => {
    const modalName = closebutton.closest(".modal");
    closeModal(modalName);
  });
});
