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

/* -------------------------------- Form data ------------------------------- */
const profileNameInputValue = document.querySelector('[name="input-name"]');
const profileAboutInputValue = document.querySelector('[name="input-about"]');

/* --------------------- Buttons and other DOM elements --------------------- */
const editProfileOpenButton = document.querySelector(
  "#edit-profile-open-button"
);
const editProfileCloseButton = document.querySelector("#modal-close-button");

const profileName = document.querySelector("#profile-name");
const profileAbout = document.querySelector("#profile-about");

/* -------------------------------- Templates ------------------------------- */
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".cards__item");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

/* ------------------------------ profile Edit ------------------------------ */
function openEditProfileModal() {
  editProfileModal.classList.add("modal_open");
}
function closeEditProfileModal() {
  editProfileModal.classList.remove("modal_open");
}

function populateProfileFormInputs() {
  profileNameInputValue.value = profileName.textContent;
  profileAboutInputValue.value = profileAbout.textContent;
}

function populateProfileFromFormInputs() {
  profileName.textContent = profileNameInputValue.value;
  profileAbout.textContent = profileAboutInputValue.value;
}

/* ------------------------------ card Template ----------------------------- */
function createCard(card) {
  //declarations - card template set globally
  //clone template
  const cardElement = cardTemplate.cloneNode(true);
  //assign card elements
  cardElement.querySelector(".cards__image").src = card.link;
  cardElement.querySelector("#card-image").alt = card.name;
  cardElement.querySelector(".cards__text").textContent = card.name;
  //return card to DOM
  return cardElement;

  //add event listener
}

function renderCard(card) {
  placesList.append(card);
}
/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

editProfileOpenButton.addEventListener(
  "click",
  openEditProfileModal,
  true
); /*true sets capture handle parent first*/
editProfileOpenButton.addEventListener("click", populateProfileFormInputs);

editProfileCloseButton.addEventListener("click", closeEditProfileModal);

editProfileForm.addEventListener(
  "submit",
  (e) => {
    e.preventDefault();
  },
  true
);
editProfileForm.addEventListener("submit", populateProfileFromFormInputs);
editProfileForm.addEventListener("submit", closeEditProfileModal);

// //heart scripts
// //variables
// const allHeartButtons = document.querySelectorAll(".cards__button-like");
// const heartButton = document.querySelector(".cards__button-like");

// //functions

// //eventlisteners
// allHeartButtons.forEach((heartButton) => {
//   heartButton.addEventListener("click", () => {
//     heartButton.classList.toggle("cards__button-like_active");
//   });
// });

initialCards.forEach(function (card) {
  //append to the list
  const newCard = createCard(card);
  renderCard(newCard);
  // placesList.append(newCard);
  //loop
});
