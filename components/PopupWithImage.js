// Creating the PopupWithImage class
// Create the PopupWithImage class as a child class of Popup.
// This class has to change the parent open() method.
// In the open() method of the PopupWithImage class,
// you need to add an image to the popup
// and the corresponding image src attribute
// along with a caption for the image.
/* --------------------------------- imports -------------------------------- */
import Popup from "./Popup.js";

/* ---------------------------------- class --------------------------------- */
export default class PopupWithImage extends Popup {
  constructor(modalSelector) {
    super(modalSelector);
    this._cardImage = this._modal.querySelector("modal__image");
  }
  // console.log(data);
  test() {
    console.log(this._link);
  }

  open(imageSelector, title, link) {
    console.log("this is new open");
    console.log(this._modal);
    console.log(imageSelector, title, link);
    super.open();
  }
}
