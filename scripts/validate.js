const showInputError = (formElement, inputElement, errorMessage, settings) => {
  //find error message element
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  //show error message by adding class list

  errorElement.classList.add(settings.errorClass);
  //add error class-changes line to red
  inputElement.classList.add(settings.inputErrorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
  inputElement.classList.remove(settings.inputErrorClass);
};

const isValid = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings
    );
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const disableSubmitButton = (buttonElement, buttonClass) => {
  buttonElement.classList.add(buttonClass);
  buttonElement.disabled = true;
};

const enableSubmitButton = (buttonElement, buttonClass) => {
  buttonElement.classList.remove(buttonClass);
  buttonElement.disabled = false;
};
const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, settings.inactiveButtonClass);
  } else {
    enableSubmitButton(buttonElement, settings.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const enableValidation = (settings) => {
  //  find all forms
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    // loop through forms array, add submit event listener, prevent default
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    //find all inputs
    //loop through and add setevent listener function
    setEventListeners(formElement, settings);
  });
};

// enabling validation by calling enableValidation()
// pass all the settings on call
enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button-submit",
  inactiveButtonClass: "modal__button-submit_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
});
