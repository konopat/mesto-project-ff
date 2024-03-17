const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(validationConfig.inputErrorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(validationConfig.errorClass)
}

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(validationConfig.inputErrorClass)
  errorElement.classList.remove(validationConfig.errorClass)
  errorElement.textContent = ''
}

const checkInputValidity = (formElement, inputElement, validationConfig) => {
  const errorMessage =
    'Разрешены только латинские и кириллические буквы, знаки дефиса и пробелы.'
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(errorMessage)
    inputElement.setAttribute('data-error', errorMessage)
  } else {
    inputElement.setCustomValidity('')
    inputElement.removeAttribute('data-error')
  }
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    )
  } else {
    hideInputError(formElement, inputElement, validationConfig)
  }
}

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  )
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  )
  toggleButtonState(inputList, buttonElement, validationConfig)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationConfig)
      toggleButtonState(inputList, buttonElement, validationConfig)
    })
  })
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true
    buttonElement.classList.add(validationConfig.inactiveButtonClass)
  } else {
    buttonElement.disabled = false
    buttonElement.classList.remove(validationConfig.inactiveButtonClass)
  }
}

export const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  )
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault()
    })
    const fieldsetList = Array.from(formElement.querySelectorAll('fieldset'))
    fieldsetList.forEach((fieldset) =>
      setEventListeners(fieldset, validationConfig)
    )
  })
}

export const clearValidation = (formElement, validationConfig) => {
  // Достаем все инпуты в массив
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  )
  // Чистим каждый инпут от старых ошибок
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig)
  })
  // Отключаем кнопку отправки формы
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  )
  buttonElement.classList.add(validationConfig.inactiveButtonClass)
  buttonElement.disabled = true
}
