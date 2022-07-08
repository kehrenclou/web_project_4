// Create PopupWithForm as a child class of Popup. The PopupWithForm class
//must comply with the following requirements:
// 	• It takes two arguments: the popup selector,
//     and a callback function which PopupWithForm calls
//     when the form’s submit event fires.
// 	• It stores a private method named _getInputValues(),
//     which collects data from all the input fields and
//     returns that data as an object.
// 	• It modifies the setEventListeners() parent method.
//     The setEventListeners() method of the PopupWithForm class
//     has to add the submit event handler to the form and
//     the click event listener to the close icon.
// 	• It modifies the close() parent method in order
//     to reset the form once the popup is closed.

// Create an instance of the PopupWithForm class for each popup.

/* --------------------------------- imports -------------------------------- */
import Popup from "./Popup.js";
import { selectors } from "../utils/constants.js";

/* ---------------------------------- class --------------------------------- */
export default class PopupWithForm extends Popup {
  constructor({ modalSelector }, { handleFormSubmit }) {
    super(modalSelector);

    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    //get all inputs
    const inputList = this._form.querySelectorAll(selectors.inputSelector);
    //create an empty object
    const formValues = {};
    //add values of field to this object
    inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    //return the values object

    return formValues;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
  
    });
    super.setEventListeners();
  }
  reset() {
    this._form.reset();
  }

  close() {
    super.close();
    // this._form.reset(); //check if this needs to happen on submit
  }
}
