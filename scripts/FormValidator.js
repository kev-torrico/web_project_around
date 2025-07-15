export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _buttonNewMargin(inputList, buttonElement) {
    const lastInput = inputList[inputList.length - 1];
    if (lastInput.classList.contains(this._config.inputErrorClass)) {
      buttonElement.classList.add("popup__save_new-margin");
    } else {
      buttonElement.classList.remove("popup__save_new-margin");
    }
  }
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._config.inactiveButtonClass);
      buttonElement.disabled = true;
      this._buttonNewMargin(inputList, buttonElement);
    } else {
      buttonElement.classList.remove(this._config.inactiveButtonClass);
      buttonElement.disabled = false;
      this._buttonNewMargin(inputList, buttonElement);
    }
  }
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
  }
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }
  enableValidation() {
    this._setEventListeners();
  }
  resetValidation() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );

    inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(
        `.${inputElement.id}-error`
      );
      inputElement.classList.remove(this._config.inputErrorClass);
      errorElement.classList.remove(this._config.errorClass);
      errorElement.textContent = "";
    });

    buttonElement.classList.add(this._config.inactiveButtonClass);
    buttonElement.disabled = true;
  }
}
