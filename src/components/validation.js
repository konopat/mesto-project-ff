// Показать ошибки
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) => {
  // Ищем элемент, в котором будет отображаться ошибка
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  // Добавляем текст ошибки
  errorElement.textContent = errorMessage
  // Добавляем класс ошибки для активации отображения на экране
  errorElement.classList.add(validationConfig.errorClass)
  // Добавляем инпуту, который не прошел валидацию, класс ошибки для стилизации
  inputElement.classList.add(validationConfig.inputErrorClass)
}

// Отчистить ошибки
const hideInputError = (formElement, inputElement, validationConfig) => {
  // Ищем элемент, в котором будет отображаться ошибка
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  // Удаляем класс ошибки для деактивации отображения на экране
  errorElement.classList.remove(validationConfig.errorClass)
  // Удаляем текст ошибки
  errorElement.textContent = ''
  // Удаляем класс ошибки у инпута
  inputElement.classList.remove(validationConfig.inputErrorClass)
}

// Проверяем валидность инпута
const checkInputValidity = (formElement, inputElement, validationConfig) => {
  // Кастомная ошибка паттерна добавится в атрибут data и прокинется в текст ошибки
  const errorMessage =
    'Разрешены только латинские и кириллические буквы, знаки дефиса и пробелы.'

  // Если ошибка паттерна
  if (inputElement.validity.patternMismatch) {
    // Прокидываем ошибку в инпут
    inputElement.setCustomValidity(errorMessage)
    // Добавляем ошибку в атрибут data-*
    inputElement.setAttribute('data-error', errorMessage)
  } else {
    // Если ошибок нет
    // Чистим текст ошибки в инпуте
    inputElement.setCustomValidity('')
    // Убираем атрибут ошибки
    inputElement.removeAttribute('data-error')
  }

  // Если инпут не прошел валидацию
  if (!inputElement.validity.valid) {
    // Показать ошибку
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    )
  } else {
    // Если инпут валиден
    // Отчистить ошибки
    hideInputError(formElement, inputElement, validationConfig)
  }
}

// Добавить слушатели на инпуты
const setEventListeners = (formElement, validationConfig) => {
  // Пакуем все инпуты полученной формы в массив
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  )
  // Ищем кнопку сабмита формы
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  )
  // Переключаем текущее состояние кнопки
  toggleButtonState(inputList, buttonElement, validationConfig)
  // Вешаем слушатели
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      // Проверить валидность
      checkInputValidity(formElement, inputElement, validationConfig)
      // Изменить состояние кнопки
      toggleButtonState(inputList, buttonElement, validationConfig)
    })
  })
}

// Проверить найден ли невалидный инпут
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

// Переключить состояние кнопки
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  // Если найден невалидный инпут
  if (hasInvalidInput(inputList)) {
    // Выключаем кнопку
    buttonElement.disabled = true
    // Добавляем класс неактивной кнопки
    buttonElement.classList.add(validationConfig.inactiveButtonClass)
  } else {
    // Если все инпуты валидны
    // Активируем кнопку
    buttonElement.disabled = false
    // Удаляем класс неактивной кнопки
    buttonElement.classList.remove(validationConfig.inactiveButtonClass)
  }
}

// Активировать валидацию форм
export const enableValidation = (validationConfig) => {
  // Пакуем список форм в массив
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  )
  // Отключаем базовое поведение форм по сабмиту
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault()
    })
    // Достаем список полей формы в массив
    const fieldsetList = Array.from(formElement.querySelectorAll('fieldset'))
    // Вешаем слушатели на полученные инпуты
    fieldsetList.forEach((fieldset) =>
      setEventListeners(fieldset, validationConfig)
    )
  })
}

// Отчистить ошибки валидации
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
  toggleButtonState(inputList, buttonElement, validationConfig)
}
