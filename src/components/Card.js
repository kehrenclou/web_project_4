/* --------------------------------- import --------------------------------- */

import { selectors } from "../utils/constants.js";
/* -------------------------------------------------------------------------- */
/*                                Declarations                                */
/* -------------------------------------------------------------------------- */

/* ---------------------------------- class --------------------------------- */
class Card {
  constructor(
    data,
    userId,
    {
      templateSelector,
      handleCardClick,
      handleDeleteClick,
      handleLikeButtonClick,
    }
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;

    this._likesCount = data.likes;
    this._userId = userId;
    // this._ownerID = data.owner._id; //broke code on add place click
    this._imageOwnerId = data.owner._id;

    this._likesIdArray = data.likes.map((like) => like._id);

    this._templateSelector = templateSelector;
    this._cardListItemSelector = selectors.cardListItemSelector;
    this._imageModalSelector = selectors.imageModalID;
    this._deleteModalSelector = selectors.checkDeleteModalID;

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
    // this._handleFormSubmit=handleFormSubmit;
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

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeButtonClick);
    // this._likeButton.addEventListener("click", this._handleLikeCardButton);
    this._deleteButton.addEventListener("click", this._handleDeleteClick);

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._imageModalSelector, this._name, this._link);
    });
  }

  checkLikeArrayForUserId() {
    return this._likesIdArray.includes(this._userId);
  }
  updateLikeCount(data) {
    this._likesCount = data.likes;
    this._likesIdArray = data.likes.map((like) => like._id);
    this._likeCounter.textContent = this._likesCount.length;
    this._cardId = data.likes._id;
  }
  createCard() {
    // make card

    //declare templates, elements
    this._element = this._getTemplate();

    this._likeButton = this._element.querySelector(
      selectors.cardLikeButtonSelector
    );
    // **new
    this._likeCounter = this._element.querySelector(
      selectors.cardLikeCountSelector
    );
    // *end new

    this._deleteButton = this._element.querySelector(
      selectors.placeDeleteButtonID
    );

    this._cardImage = this._element.querySelector(selectors.cardImageID);
    const titleElement = this._element.querySelector(selectors.cardTitleID);

    //set up name, link, number of likes in card
    titleElement.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeCounter.textContent = this._likesCount.length;

    //check if userId matches imageOwnerId, set trash to active state
    if (this._userId === this._imageOwnerId) {
      this._deleteButton.classList.add("cards__button_type_delete-active");
    }

    //check if userId matches any userIds in likes, set to active state
    if (this._likesIdArray.includes(this._userId)) {
      this._likeButton.classList.add("cards__button_type_like-active");
    }

    //add event listeners
    this._setEventListeners();

    return this._element;
  }
}
/* --------------------------------- export --------------------------------- */
export default Card;
