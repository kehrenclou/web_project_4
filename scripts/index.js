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
const addPlaceForm = document.querySelector("#modal-form-add-place");

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

function openModal(modal) {
  modal.classList.add("modal_open");
}
function closeModal(modal) {
  modal.classList.remove("modal_open");
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
  imageElement.alt = card.name;
  titleElement.textContent = card.name;

  //add event listeners
  imageElement.addEventListener("click", () => {
    modalImageElement.src = card.link;
    modalImageElement.alt = card.name;
    modalCaption.textContent = card.name;
    openModal(imageModal);
  });

  deleteButton.addEventListener("click", () =>
    deletePlacefromCards(deleteButton)
  );

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("cards__button_type_like-active");
  });

  return cardElement;
}

function renderCard(card) {
  const newCardElement = createCard(card);
  placesList.prepend(newCardElement);
}

function addPlaceToCards() {
  const newCard = {
    name: placeTitleInputElement.value,
    link: placeLinkInputElement.value,
  };
  renderCard(newCard);
}

function resetForm() {
  document.getElementById("modal-form-add-place").reset();
}
function deletePlacefromCards(button) {
  const cardItem = button.closest(".cards__item");
  cardItem.remove();
}
function clickOutsideImageClose(e) {
  const isOutside = !e.target.closest(".modal__content_type_image");

  if (isOutside) {
    closeModal(imageModal);
  }
}

function clickEscapeImageClose(e) {
  if (e.key === "Escape") {
    closeModal(imageModal);
  }
}
/* ----------------------------- Event Handlers ----------------------------- */
function handleEditProfileOpenButtonClick() {
  openModal(editProfileModal);
  populateProfileFormInputs();
}
function handleEditProfileFormSubmit(e) {
  e.preventDefault();
  populateProfileFromFormInputs();
  closeModal(editProfileModal);
}
function handleAddPlaceFormSubmit(e) {
  e.preventDefault();
  addPlaceToCards();
  resetForm();
  closeModal(addPlaceModal);
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */

editProfileOpenButton.addEventListener(
  "click",
  handleEditProfileOpenButtonClick
);
editProfileForm.addEventListener("submit", HandleEditProfileFormSubmit, true);

addPlaceOpenButton.addEventListener(
  "click",
  () => openModal(addPlaceModal),
  true
);

addPlaceForm.addEventListener("submit", HandleAddPlaceFormSubmit);

imageModal.addEventListener("click", clickOutsideImageClose);
document.addEventListener("keydown", clickEscapeImageClose);

/* -------------------------------------------------------------------------- */
/*                                 scripts                                */
/* -------------------------------------------------------------------------- */
initialCards.forEach(function (card) {
  // const newCard = createCard(card);
  // renderCard(newCard);
  renderCard(card);
});

closeButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    const modalName = closeButton.closest(".modal");
    closeModal(modalName);
  });
});
