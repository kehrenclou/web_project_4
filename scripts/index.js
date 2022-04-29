///////////////
//Declarations
///////////////

//Wrappers
const editProfileModal = document.querySelector("#modal-edit-profile");
const editProfileForm = document.querySelector("#modal-form-edit-profile");

//Form data
const profileNameInputValue = document.querySelector('[name="input-name"]');
const profileAboutInputValue = document.querySelector('[name="input-about"]');

//Buttons and other DOM elements
const editProfileOpenButton = document.querySelector(
  "#edit-profile-open-button"
);
const editProfileCloseButton = document.querySelector("#modal-close-button");

const profileName = document.querySelector("#profile-name");
const profileAbout = document.querySelector("#profile-about");
//Wrappers

/////////////
//Functions
////////////
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

/////////////////
//Event Handlers
////////////////

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
