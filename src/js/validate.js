// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid
  })
}

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass)
    buttonElement.disabled = true
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass)
    buttonElement.disabled = false
  }
}

const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config)
  } else {
    hideInputError(formElement, inputElement, config)
  }
}

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`)
  inputElement.classList.add(config.inputErrorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(config.errorClass)
}

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`)
  inputElement.classList.remove(config.inputErrorClass)
  errorElement.classList.remove(config.errorClass)
  errorElement.textContent = ""
}

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
  const buttonElement = formElement.querySelector(config.submitButtonSelector)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, config)
      toggleButtonState(inputList, buttonElement, config)
    })
  })
}

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))

  formList.forEach((formElement) => {
    setEventListeners(formElement, config)
  })
}
