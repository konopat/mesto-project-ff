// Открыть модальное окно
export const openPopUp = (popUp) => {
  popUp.classList.add('popup_is-opened')
  // Вешаем временные слушатели
  addTemporaryListeners()
}

// Закрыть модальное окно
export const closePopUp = (popUp) => {
  popUp.classList.toggle('popup_is-opened')
  // Снимаем временные слушатели
  removeTemporaryListeners()
}

// Функция-обработчик события нажатия Esc
const escapeKeydownHandler = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopUp = findOpenedPopUp()
    closePopUp(openedPopUp)
  }
}

// Функция-обработчик события клика по оверлею
const overlayClickHandler = (evt) => {
  if (evt.target.classList.contains('popup_is-opened')) {
    const openedPopUp = findOpenedPopUp()
    closePopUp(openedPopUp)
  }
}

// Найти открытый попап
const findOpenedPopUp = () => {
  return document.querySelector('.popup_is-opened')
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
