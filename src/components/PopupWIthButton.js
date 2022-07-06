/* --------------------------------- imports -------------------------------- */
import Popup from "./Popup.js";
import { selectors } from "../utils/constants.js";

/* ---------------------------------- class --------------------------------- */
export default class PopupWithButton extends Popup {
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

  open(id,evt) {
   
    this._imageId = id;
    this._card = evt.target.parentElement;
  
    super.open();
  }
  removeCard(){
    this._card.remove();
  }
  close() {
    
    super.close();
  }
}
