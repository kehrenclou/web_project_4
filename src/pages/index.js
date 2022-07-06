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
import PopupWithButton from "../components/PopupWIthButton";

import { Api, baseUrl, token } from "..//components/Api.js";

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

const avatarPictureButton=document.querySelector(selectors.profileAvatarImageID)
/* ------------------------------ userinfoClass ----------------------------- */

const userInfo = new UserInfo({
  nameSelector: selectors.profileNameID,
  aboutSelector: selectors.profileAboutID,
  avatarSelector: selectors.profileAvatarImageID,
});

/* -------------------------------------------------------------------------- */
/*                                Refactoring                                */
/* -------------------------------------------------------------------------- */
// Token: 72dee144-4e03-4ccf-86c7-08640cb55eca
// Group ID: group-12
// const baseUrl = "https://around.nomoreparties.co/v1/group-12";
// const token = "72dee144-4e03-4ccf-86c7-08640cb55eca";

/* --------------------------------- set Api -------------------------------- */
const api = new Api({
  baseUrl: baseUrl,
  headers: { authorization: token, "Content-Type": "application/json" },
});

/* -------------------------- create initial cards -------------------------- */
//set card section to null to reset in .then below
let cardSection = null;
let userId = null;
// pull in userData and initialCard data arrays
api.getAppInfo().then(([userData, initialCards]) => {
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
});
/* --------------------------------- methods -------------------------------- */

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
        api.deleteLikeOnCard(item._id).then((data) => {
          //remove active class
          evt.target.classList.remove("cards__button_type_like-active");
          //update count and array
          cardElement.updateLikeCount(data);
        });
      } else {
        //add like to server
        api.addLikeOnCard(item._id).then((data) => {
          //add active class
          evt.target.classList.add("cards__button_type_like-active");
          //update count
          cardElement.updateLikeCount(data);
        });
      }
    },
  });

  cardSection.addItem(cardElement.createCard());
};
/* -------------------------- confirm delete image Ppup -------------------------- */
const checkDeletePopup = new PopupWithButton(
  { modalSelector: selectors.checkDeleteModalID },
  {
    handleFormSubmit: (cardId) => {
      api.deleteCard(cardId).then(() => {
        //close form/ remove card
        checkDeletePopup.removeCard();
        checkDeletePopup.close();
      });
    },
  }
);
/* ---------------------------- edit the profile ---------------------------- */

const editProfileForm = new PopupWithForm(
  { modalSelector: selectors.editProfileModalID },
  {
    handleFormSubmit: (formData) => {
      const {
        [selectors.inputNameName]: name,
        [selectors.inputAboutName]: about,
      } = formData;

      api.patchProfileData(name, about).then(() => {
        userInfo.setUserInfo(name, about);
        editProfileForm.close();
        formValidators[selectors.profileFormName].disableSubmitButton();
      });
    },
  }
);
/* -------------------- PopupWithForms Class - Add Place -------------------- */

const addPlaceForm = new PopupWithForm(
  { modalSelector: selectors.addPlaceModalID },
  {
    handleFormSubmit: (formData) => {
      const {
        [selectors.inputTitleName]: inputName,
        [selectors.inputLinkName]: inputLink,
      } = formData;

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
        addPlaceForm.reset();

        formValidators[selectors.placeFormName].disableSubmitButton();
      });
    },
  }
);

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

/* -------------------------- open event listeners -------------------------- */
editProfileOpenButton.addEventListener(
  "click",
  handleEditProfileOpenButtonClick
);

addPlaceOpenButton.addEventListener("click", handleAddPlaceOpenButtonClick);

/* ------------------------------- Section and Card class ------------------------------- */
//now called in API stuff at bottom
// const cardSection = new Section(
//   {
//     items: initialCards,
//     renderer: renderCard,
//   },
//   { containerSelector: selectors.cardSectionSelector }
// );

// //initialize cards
// // cardSection.renderItems(initialCards);//don't need to pass initial cards here
// cardSection.renderItems();

/* --------------------------- PopupWithForms Class - Edit Profile -------------------------- */
//pass formData object containing data from form
//to a new instance of PopupWithForm
//formData parameter is a value that will pass
//to this._handleFormSubmit() when calling it in PopupWith Form
//on submit click event listener
//it is an object returned by this._getInputValues()method

//prevent default put onto event listener
//get input values is done in PopupwithForm class  and put into dom
//close modal

// const editProfileForm = new PopupWithForm(
//   { modalSelector: selectors.editProfileModalID },
//   {
//     handleFormSubmit: (formData) => {
//       const {
//         [selectors.inputNameName]: name,
//         [selectors.inputAboutName]: about,
//       } = formData;

//       userInfo.setUserInfo(name, about);
//       editProfileForm.close();
//       formValidators[selectors.profileFormName].disableSubmitButton();
//     },
//   }
// );

// /* -------------------- PopupWithForms Class - Add Place -------------------- */
// const addPlaceForm = new PopupWithForm(
//   { modalSelector: selectors.addPlaceModalID },
//   {
//     handleFormSubmit: (formData) => {
//       renderCard({
//         name: formData[selectors.inputTitleName],
//         link: formData[selectors.inputLinkName],
//       });

//       addPlaceForm.close();
//       addPlaceForm.reset();

//       formValidators[selectors.placeFormName].disableSubmitButton();
//     },
//   }
// );

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
