// Creating the PopupWithImage class
// Create the PopupWithImage class as a child class of Popup.
// This class has to change the parent open() method.
// In the open() method of the PopupWithImage class,
// you need to add an image to the popup
// and the corresponding image src attribute
// along with a caption for the image.
/* --------------------------------- imports -------------------------------- */
import Popup from "./Popup.js";
import { selectors } from "./constants.js";

/* ---------------------------------- class --------------------------------- */
export default class PopupWithImage extends Popup {
  constructor({ modalSelector }) {
    super(modalSelector);
    this._modalImageEl = this._modal.querySelector(selectors.imgSelector);
    this._modalCaptionEl = this._modal.querySelector(selectors.captionSelector);
  }

  open(title, link) {
    this._modalImageEl.src = link;
    this._modalImageEl.alt = title;
    this._modalCaptionEl.textContent = title;

    //get image element from within the popup set source and alt
    //call parent
    super.open();
  }
}
