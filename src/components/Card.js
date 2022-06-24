/* --------------------------------- import --------------------------------- */

import { selectors } from "../utils/constants.js";
/* -------------------------------------------------------------------------- */
/*                                Declarations                                */
/* -------------------------------------------------------------------------- */

/* ---------------------------------- class --------------------------------- */
class Card {
  constructor(data, { templateSelector }, { handleCardClick }) {
    this._name = data.name;
    this._link = data.link;

    this._templateSelector = templateSelector;
    this._cardListItemSelector = selectors.cardListItemSelector;
    this._imageModalSelector = selectors.imageModalID;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    // grab template
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(this._cardListItemSelector)
      .cloneNode(true);
    return cardTemplate;
  }

  _handleLikeCardButton(evt) {
    evt.target.classList.toggle("cards__button_type_like-active");
  }

  _handleDeleteCardButton = (evt) => {
    this._element.remove();
    this._element = null;
  };

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeCardButton);
    this._deleteButton.addEventListener("click", this._handleDeleteCardButton);

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._imageModalSelector, this._name, this._link);
    });
  }
  createCard() {
    // make card
    this._element = this._getTemplate();

    this._likeButton = this._element.querySelector(selectors.cardLikeButtonSelector);
    // this._likeButton = this._element.querySelector(".cards__button_type_like");
    this._deleteButton = this._element.querySelector("#place-delete-button");
    this._cardImage = this._element.querySelector("#card-image");
    const titleElement = this._element.querySelector("#card-text");

    titleElement.textContent = this._name;

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;


    //add event listeners
    this._setEventListeners();
    return this._element;
  }
}
/* --------------------------------- export --------------------------------- */
export default Card;
