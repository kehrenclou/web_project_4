/* --------------------------------- imports -------------------------------- */
import Popup from "./Popup.js";
import { selectors } from "../utils/constants.js";

/* ---------------------------------- class --------------------------------- */
export default class PopupWithConfirmation extends Popup {
  constructor({ modalSelector }, { handleFormSubmit }) {
    super(modalSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._imageId);
    });
    super.setEventListeners();
  }

  changeSubmitTextOnUpload() {
   
    this._submitButton.textContent = "Deleting";
  }
  revertSubmitTextAfterUpload() {
    this._submitButton.textContent = "Yes";
  }

  open(id, evt) {
    this._imageId = id;
    this._card = evt.target.parentElement;

    super.open();
  }
  removeCard() {
    this._card.remove();
  }
  close() {
    super.close();
  }
}
