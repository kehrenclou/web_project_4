/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
//import all the classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";

//import otherstuff
import { initialCards, selectors } from "../components/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { imageModal } from "../utils/utility.js";
// import { closeModal, openModal } from "../utils/utility.js";

/* -------------------------------------------------------------------------- */
/*                                Refactoring                                */
/* -------------------------------------------------------------------------- */
//create instances of all the classes
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = new Card(item, selectors.cardTemplate);
      cardSection.addItem(cardElement.createCard());
    },
  },
  selectors.cardSection
);

//initialize all my instances
cardSection.renderItems(initialCards);
//all the rest
/* ------------------------------- Popup Class ------------------------------ */
const newPopup = new Popup(selectors.addPlaceModalSelector);

// newPopup.setEventListeners();

// newPopup.open();

function handlePopupWithImage(imageSelector, title, link) {
  // const imageSelector = imageSelector;
  // // const imageElement = document.querySelector.imageSelector;
  // const imageTitle = title;
  // const imageLink = link;
  const newImagePopup = new PopupWithImage(imageSelector);
  // newImagePopup.open();
  // console.log("handlePopupWithImage is firing new imagepopou", newImagePopup);
  // console.log(imageTitle);
  newImagePopup.open(selectors.imageModalSelector, title, link);
}

export { handlePopupWithImage };
