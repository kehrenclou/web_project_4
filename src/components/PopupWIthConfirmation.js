/* --------------------------------- imports -------------------------------- */
import Popup from "./Popup.js";
import { selectors } from "../utils/constants.js";

/* ---------------------------------- class --------------------------------- */
export default class PopupWithConfirmation extends Popup {
  constructor({ modalSelector }) {
    super(modalSelector);
  }

  changeSubmitTextOnUpload() {
    this._submitButton.textContent = "Deleting";
  }

  revertSubmitTextAfterUpload() {
    this._submitButton.textContent = "Yes";
  }

  open(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;

    super.open();
  }

  // removeCard(cardEl) {
  //   cardEl.remove();
  // }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._handleFormSubmit();
    });
    super.setEventListeners();
  }
}
