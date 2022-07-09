/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
//import css

import "./index.css";
//import all the classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js"; //check if needed
import UserInfo from "../components/UserInfo.js";

//import otherstuff
import { selectors } from "../utils/constants.js";
// import { initialCards, selectors } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";

import Api from "..//utils/Api.js";
/* -------------------------------------------------------------------------- */
/*                                tokens                                      */
/* -------------------------------------------------------------------------- */
// Token: 72dee144-4e03-4ccf-86c7-08640cb55eca
// Group ID: group-12
// const baseUrl = "https://around.nomoreparties.co/v1/group-12";
// const token = "72dee144-4e03-4ccf-86c7-08640cb55eca";
/* -------------------------------- contents -------------------------------- */
//constants used only once
//Functions
//Event Listeners - Open Buttons
//UserInfo Class
//Api class - set up API
//Create initial cards - api.getInfo - Section Class
//Render Card - Card Class -api.addLikeOnCard/deleteLikeOnCard
//PopupWithConfirmation class - confirm Delete Place - api.deleteCard
//PopupWithForm class - Edit Avatar - api.patchProfileAvatar
//PopupWithForm class -Edit Profile - api.patchProfileData
//PopupWithForm class - Add Place - api.postNewCard
//FormValidation class
/* ------------------------ constants used only once ------------------------ */

//used in handleEditProfileOPenButton
const inputNameElement = document.querySelector(selectors.inputNameID);
const inputAboutElement = document.querySelector(selectors.inputAboutID);

//used in OpenEventListeners
const editProfileOpenButton = document.querySelector(
  selectors.editProfileOpenButtonID
);
const addPlaceOpenButton = document.querySelector(
  selectors.addPlaceOpenButtonID
);
const editAvatarOpenButton = document.querySelector(
  selectors.profileAvatarContainerID
);

//used in buttons "Saving"
const popupSubmitButton = document.querySelector(
  selectors.popupSubmitButtonSelector
);
const deletePlaceSubmitButton = document.querySelector(
  selectors.deletePlaceSubmitButtonID
);

//used in API class
const baseUrl = "https://around.nomoreparties.co/v1/group-12";
const token = "72dee144-4e03-4ccf-86c7-08640cb55eca";

/* -------------------------------- functions ------------------------------- */
function fillProfileForm(data) {
  inputNameElement.value = data.userName;
  inputAboutElement.value = data.userAbout;
}
function handleEditProfileOpenButtonClick() {
  fillProfileForm(userInfo.getUserInfo());
  editProfileForm.open();
}

function handleAddPlaceOpenButtonClick() {
  addPlaceForm.open();
}
function handleEditAvatarOpenButtonClick() {
  editAvatarForm.open();
}

/* --------------------- Event Listeners - Open Buttons --------------------- */

editProfileOpenButton.addEventListener(
  "click",
  handleEditProfileOpenButtonClick
);

addPlaceOpenButton.addEventListener("click", handleAddPlaceOpenButtonClick);

editAvatarOpenButton.addEventListener("click", handleEditAvatarOpenButtonClick);

/* ------------------------------ UserInfo Class ---------------------------- */

const userInfo = new UserInfo({
  nameSelector: selectors.profileNameID,
  aboutSelector: selectors.profileAboutID,
  avatarSelector: selectors.profileAvatarImageID, //
});

/* ------------------------- Api class - set up Api ------------------------- */
const api = new Api({
  baseUrl: baseUrl,
  headers: { authorization: token, "Content-Type": "application/json" },
});

/* ---------- Create initial cards - getAppInfo Api - Section Class --------- */
//set card section to null to reset in .then below
let cardSection = null;
let userId = null;
// pull in userData and initialCard data arrays
api
  .getAppInfo()
  // .then(api.handleResponse())
  // .catch((err) => {
  //   console.log("catch 122");
  //   api.handleErrorResponse(err);
  // })
  .then(([userData, initialCards]) => {
    //1. set UserInfo on page, grab userData._id
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
    userInfo.setUserID(userData._id);
    userId = userData._id; // how to get this globally accessable

    //2. create new section passing in initialCards
    cardSection = new Section(
      {
        items: initialCards,
        renderer: renderCard,
      },
      { containerSelector: selectors.cardSectionSelector }
    );
    //3. render items
    cardSection.renderItems();
    //4. catch errors
  })
  .catch((err) => {
    api.handleErrorResponse(err);
  });

/* ------ Render Card - Card Class -api.addLikeOnCard/deleteLikeOnCard ------ */

const renderCard = (item) => {
  // console.log(item);
  //item has likes array, owner, cardid
  //userid is passing in null
  const cardElement = new Card(item, userId, {
    templateSelector: selectors.cardTemplateId,

    handleCardClick: (imageModalSelector, title, link) => {
      const imagePopup = new PopupWithImage({
        modalSelector: imageModalSelector,
      });
      imagePopup.open(title, link);
    },

    handleDeleteClick: (evt) => {
      checkDeletePopup.open(item._id, evt);
      //this passes image id to class. opens check delete popup
    },

    handleLikeButtonClick: (evt) => {
      if (cardElement.checkLikeArrayForUserId()) {
        //delete like from server
        api
          .deleteLikeOnCard(item._id)
          .then((data) => {
            //update count and array/remove active class
            cardElement.updateLikes(data);
          })
          .catch((err) => {
            api.handleErrorResponse(err);
          });
      } else {
        //add like to server
        api
          .addLikeOnCard(item._id)
          .then((data) => {
            //update count/add active class
            cardElement.updateLikes(data);
          })
          .catch((err) => {
            api.handleErrorResponse(err);
          });
      }
    },
  });

  cardSection.addItem(cardElement.createCard());
};
/* ------ PopupWithConfirmation class - confirm Delete Place - api.deleteCard ----- */

const checkDeletePopup = new PopupWithConfirmation(
  { modalSelector: selectors.checkDeleteModalID },
  {
    handleFormSubmit: (cardId) => {
      checkDeletePopup.changeSubmitTextOnUpload();
      api.deleteCard(cardId).then(() => {
        //change button text back/remove card/close

        checkDeletePopup.removeCard();
        checkDeletePopup.close();
        checkDeletePopup.revertSubmitTextAfterUpload();
      });
    },
  }
);
/* ------- PopupWithForm class - Edit Avatar - api.patchProfileAvatar ------- */

const editAvatarForm = new PopupWithForm(
  {
    modalSelector: selectors.editAvatarModalID,
  },
  {
    handleFormSubmit: (formData) => {
      const { [selectors.inputAvatarLinkName]: avatar } = formData;
      // transform key from <image>'s name property to avatarLink
      editAvatarForm.changeSubmitTextOnUpload();

      api.patchProfileAvatar(avatar).then(() => {
        editAvatarForm.revertSubmitTextAfterUpload();
        userInfo.setUserAvatar(avatar);

        editAvatarForm.close();

        formValidators[selectors.avatarFormName].disableSubmitButton();
      });
    },
  }
);
/* -------- PopupWithForm class -Edit Profile - api.patchProfileData -------- */

const editProfileForm = new PopupWithForm(
  { modalSelector: selectors.editProfileModalID },
  {
    handleFormSubmit: (formData) => {
      const {
        [selectors.inputNameName]: name,
        [selectors.inputAboutName]: about,
      } = formData;

      editProfileForm.changeSubmitTextOnUpload();

      api.patchProfileData(name, about).then(() => {
        userInfo.setUserInfo(name, about);
        editProfileForm.close();
        formValidators[selectors.profileFormName].disableSubmitButton();
        editProfileForm.revertSubmitTextAfterUpload();
      });
    },
  }
);

/* ------------ PopupWithForm class - Add Place - api.postNewCard ----------- */

const addPlaceForm = new PopupWithForm(
  { modalSelector: selectors.addPlaceModalID },
  {
    handleFormSubmit: (formData) => {
      const {
        [selectors.inputTitleName]: inputName,
        [selectors.inputLinkName]: inputLink,
      } = formData;

      addPlaceForm.changeSubmitTextOnUpload();

      api.postNewCard(inputName, inputLink).then((data) => {
        renderCard({
          name: data.name,
          link: data.link,
          likes: data.likes,
          owner: data.owner,
          _id: data._id,
          // data
        });

        addPlaceForm.close();
        addPlaceForm.revertSubmitTextAfterUpload();

        formValidators[selectors.placeFormName].disableSubmitButton();
      });
    },
  }
);
/* ----------------------------- FormValidation ----------------------------- */

const formValidatorConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button-submit",
  inactiveButtonClass: "modal__button-submit_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
  formSelector: ".modal__form",
};

//create empty object to store form validators
const formValidators = {};

const createValidatorInstances = (config) => {
  //create array of all forms on page
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  //for each form,
  formList.forEach((formElement) => {
    //instantiate a formValidator instance
    const validator = new FormValidator(config, formElement);
    //get name of form
    const formName = formElement.getAttribute("name");

    //store validator by name of form
    formValidators[formName] = validator;

    //run validator.enableValidation() (from FormValidator.js)
    validator.enableValidation();
  });
};

createValidatorInstances(formValidatorConfig);

/* ---------------------------------- test ---------------------------------- */

/* --------------------------------- export --------------------------------- */
