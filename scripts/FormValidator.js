class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;

    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._submitButton = formElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(
      formElement.querySelectorAll(this._inputSelector)
    );
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    //add validation Message to span
    errorElement.textContent = inputElement.validationMessage;
    //show error message by adding class list
    errorElement.classList.add(this._errorClass);
    //add error class-changes line to red
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
    inputElement.classList.remove(this._inputErrorClass);
  }

  _toggleInputError(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    //.some executes on each item in inputlist - loops through each item in inputList,
    // returns those items in list that are not valid
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableSubmitButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  _setEventListeners() {
    // const inputList = Array.from(
    //   this._formElement.querySelectorAll(this._inputSelector)
    // );

    //this sets button to disable on first run
    this._toggleButtonState(this._inputList);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._toggleInputError(inputElement);
        this._toggleButtonState(this._inputList);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  resetValidation() {
    this._disableSubmitButton();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
/* ------------------------------------ x ----------------------------------- */

export default FormValidator;
