// Класс, который отвечает за открытие попапа
// Изменяется на актуальный при открытии попапа
let currentClassForOpeningPopUp = 'default_class_for_opening_popup'

// Открыть попап
export const openPopUp = (popUp, classForOpening) => {
  // Актуализируем класс, который отвечает за открытие попапа
  currentClassForOpeningPopUp = classForOpening
  // Открываем попап
  popUp.classList.add(classForOpening)
  // Вешаем временные слушатели
  addTemporaryListeners()
}

// Закрыть попап
export const closePopUp = (popUp, classForToggle) => {
  // Закрываем попап
  popUp.classList.toggle(classForToggle)
  // Снимаем временные слушатели
  removeTemporaryListeners()
}

// Обработчик клавиши Esc
const escapeKeydownHandler = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopUp = findOpenedPopUp()
    closePopUp(openedPopUp, currentClassForOpeningPopUp)
  }
}

// Обработчик клика по overlay
const overlayClickHandler = (evt) => {
  if (evt.target.classList.contains(currentClassForOpeningPopUp)) {
    const openedPopUp = findOpenedPopUp()
    closePopUp(openedPopUp, currentClassForOpeningPopUp)
  }
}

// Найти открытый попап
const findOpenedPopUp = () => {
  return document.querySelector('.' + currentClassForOpeningPopUp)
}

// Добавить временные слушатели
const addTemporaryListeners = () => {
  document.addEventListener('click', overlayClickHandler)
  document.addEventListener('keydown', escapeKeydownHandler)
}

// Снять временные слушатели
const removeTemporaryListeners = () => {
  document.removeEventListener('click', overlayClickHandler)
  document.removeEventListener('keydown', escapeKeydownHandler)
}
