//edit profile scripts
//variables

const openEditProfileButtonEl = document.querySelector(
  "#edit-profile-open-button"
);
const editProfileModalEl = document.querySelector("#modal-edit-profile");
const closeEditProfileButtonEl = document.querySelector("#modal-close-button");

const editProfileFormEl = document.querySelector("#modal-form-edit-profile");

const editFormNameInput = document.querySelector('[name="input-name"]');
const editFormAboutInput = document.querySelector('[name="input-about"]');

const profileName = document.querySelector("#profile-name");
const profileAbout = document.querySelector("#profile-about");

//functions
function openEditModal() {
  editProfileModalEl.classList.add("modal_open");
}
function closeEditModal() {
  editProfileModalEl.classList.remove("modal_open");
}

function populateFormInputs() {
  editFormNameInput.value = profileName.textContent;
  editFormAboutInput.value = profileAbout.textContent;
}

function populatePageFromFormInputs() {
  profileName.textContent = editFormNameInput.value;
  profileAbout.textContent = editFormAboutInput.value;
}

//event listeners

openEditProfileButtonEl.addEventListener(
  "click",
  openEditModal,
  true
); /*true sets capture handle parent first*/
openEditProfileButtonEl.addEventListener("click", populateFormInputs);

closeEditProfileButtonEl.addEventListener("click", closeEditModal);

editProfileFormEl.addEventListener(
  "submit",
  (e) => {
    e.preventDefault();
  },
  true
);
editProfileFormEl.addEventListener("submit", populatePageFromFormInputs);
editProfileFormEl.addEventListener("submit", closeEditModal);

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
