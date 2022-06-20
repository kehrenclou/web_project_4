/* --------------------------------- import --------------------------------- */

import { imageModal } from "../utils/utility.js";
// import { openModal, imageModal } from "../utils/utility.js";
/* -------------------------------------------------------------------------- */
/*                                Declarations                                */
/* -------------------------------------------------------------------------- */

const modalImageElement = imageModal.querySelector(".modal__image");
const modalImageCaption = imageModal.querySelector(".modal__caption");

/* ---------------------------------- class --------------------------------- */
class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    // grab template
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__item")
      .cloneNode(true);
    return cardTemplate;
  }

  // _handleModalImage() {
  //   modalImageElement.src = this._link;
  //   modalImageElement.alt = this._name;

  //   modalImageCaption.textContent = this._name;
  //   openModal(imageModal);
  // }

  _handleLikeCardButton(evt) {
    evt.target.classList.toggle("cards__button_type_like-active");
  }

  _handleDeleteCardButton(evt) {
    // console.log(this); //this is returning the delete button
    evt.target.closest(".cards__item").remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeCardButton);
    this._deleteButton.addEventListener("click", this._handleDeleteCardButton);
    this._cardImage.addEventListener("click", () => {
      this._handleModalImage();
    });
  }
  createCard() {
    // make card
    this._element = this._getTemplate();

    this._likeButton = this._element.querySelector(".cards__button_type_like");
    this._deleteButton = this._element.querySelector("#place-delete-button");
    this._cardImage = this._element.querySelector("#card-image");
    this._titleElement = this._element.querySelector("#card-text");

    this._titleElement.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    //add event listeners
    this._setEventListeners();
    return this._element;
  }
}
/* --------------------------------- export --------------------------------- */
export default Card;
