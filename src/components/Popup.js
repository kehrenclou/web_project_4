//Create the Popup class that opens and closes the popup window,
//as per the following requirements:
// 	• The constructor has a single parameter, which is the popup selector.
// 	• It stores the public methods open() and close() that will open and close the popup.
// 	• It stores a private method named _handleEscClose() that stores the logic for closing the popup by pressing the Esc key.
// It stores a public method named setEventListeners() that adds a click event listener
//to the close icon of the popup.
//The modal window should also close when users click on the shaded area around the form. -->
/* --------------------------------- imports -------------------------------- */
import { selectors } from "../utils/constants.js";

/* ---------------------------------- class --------------------------------- */
export default class Popup {
  constructor(modalSelector) {
    this._modal = document.querySelector(modalSelector);
    this._form = this._modal.querySelector(selectors.formSelector);

    this._submitButton = this._modal.querySelector(
      selectors.popupSubmitButtonSelector
    );

    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleRemoteClickClose = this._handleRemoteClickClose.bind(this);

    this._closeButton = this._modal.querySelector(
      selectors.closeModalButtonSelector
    );

    this._handleCloseButton = this._handleCloseButton.bind(this);
    this.setEventListeners();
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }
  _handleRemoteClickClose(e) {
    const isOutside = e.target;

    if (isOutside === this._modal) {
      this.close();
    }
  }
  _handleCloseButton() {
    this.close();
  }


  open() {
    this._modal.classList.add("modal_open");
    // this.setEventListeners()//if this is used here creates a new set event lister every time popup opened and not removed on close
    document.addEventListener("keydown", this._handleEscClose);
    this._modal.addEventListener("mousedown", this._handleRemoteClickClose);
  }
  close() {
    this._modal.classList.remove("modal_open");
    document.removeEventListener("keydown", this._handleEscClose);
    this._modal.removeEventListener("mousedown", this._handleRemoteClickClose);
  }
  setEventListeners() {
    this._closeButton.addEventListener("click", this._handleCloseButton);
  }
}
