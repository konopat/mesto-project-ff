import '../pages/index.css' // Стили
import { initialCards } from './cards'
import { createCard, deleteCard, likeCard } from './card'
import { openPopUp, closePopUp } from './modal'
import { enableValidation, clearValidation } from './validation'

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}

// DOM - элементы
const page = document.querySelector('.page')
// Карточки
const cardList = page.querySelector('.places__list')
const cardTemplate = page.querySelector('#card-template').content
// Модальные окна
const popUps = page.querySelectorAll('.popup')
const popUpEditProfile = page.querySelector('.popup_type_edit')
const popUpAddCard = page.querySelector('.popup_type_new-card')
const popUpImage = page.querySelector('.popup_type_image')
const imgInsidePopUp = popUpImage.querySelector('.popup__image')
const captionInsidePopUp = popUpImage.querySelector('.popup__caption')
const buttonsClosePopUp = page.querySelectorAll('.popup__close')
const buttonOpenPopUpEditProfile = page.querySelector('.profile__edit-button')
const buttonOpenPopUpAddCard = page.querySelector('.profile__add-button')
// Формы
const formEditProfile = document.forms['edit-profile']
const formAddCard = document.forms['new-place']
// Профиль
const titleProfile = page.querySelector('.profile__title')
const descriptionProfile = page.querySelector('.profile__description')

// -- ОБРАБОТЧИКИ
// Открыть изображение карточки в модальном окне
const openImagePopUp = (image) => {
  imgInsidePopUp.src = image.src
  imgInsidePopUp.alt = image.alt
  captionInsidePopUp.textContent = image.alt
  openPopUp(popUpImage)
}

// Засабмитить форму редактирования профиля
const submitFormEditProfile = (evt) => {
  evt.preventDefault() // Отменяем стандартную отправку формы.
  titleProfile.textContent = formEditProfile.name.value
  descriptionProfile.textContent = formEditProfile.description.value
  closePopUp(popUpEditProfile) // Закрываем попап
}

// Засабмитить форму добавления новой карточки
const submitFormAddCard = (evt) => {
  evt.preventDefault() // Отменяем стандартную отправку формы.
  // Готовим данные для создания карточки
  const data = {
    name: formAddCard['place-name'].value,
    link: formAddCard.link.value,
  }
  // Создаем карточку
  const card = createCard(
    data,
    cardTemplate,
    deleteCard,
    likeCard,
    openImagePopUp
  )
  addCard(card) // Добавляем карточку в DOM
  closePopUp(popUpAddCard) // Закрываем попап
  formAddCard.reset() // Сбрасываем поля формы
  clearValidation(formAddCard, validationConfig) // Отключаем сабмит
}

// Добавить карточку
const addCard = (card) => {
  cardList.prepend(card)
}

// Вывести на страницу карточки по умолчанию
const renderDefaultCards = (dataSet) => {
  dataSet.reverse().forEach((data) => {
    const card = createCard(
      data,
      cardTemplate,
      deleteCard,
      likeCard,
      openImagePopUp
    )
    addCard(card)
  })
}

// -- РЕНДЕРИНГ
// Добавляем всем попапам плавные анимации
popUps.forEach((popUp) => {
  popUp.classList.add('popup_is-animated')
})

// Добавляем слушатели на кнопки закрытия попапов
buttonsClosePopUp.forEach((button) => {
  button.addEventListener('click', (evt) => {
    const popUp = evt.target.closest('.popup')
    closePopUp(popUp)
  })
})

// Отрисовываем карточки по умолчанию
renderDefaultCards(initialCards)

// Активируем валидацию форм
enableValidation(validationConfig)

// -- СЛУШАТЕЛИ
// Ждет клик по кнопке "редактировать профиль"
buttonOpenPopUpEditProfile.addEventListener('click', () => {
  clearValidation(formEditProfile, validationConfig)
  formEditProfile.name.value = titleProfile.textContent
  formEditProfile.description.value = descriptionProfile.textContent
  openPopUp(popUpEditProfile)
})

// Ждет сабмит формы редактирования профиля
formEditProfile.addEventListener('submit', submitFormEditProfile)

// Ждет клик по кнопке "+"
buttonOpenPopUpAddCard.addEventListener('click', () => openPopUp(popUpAddCard))

// Ждет сабмит формы добавления новой карточки
formAddCard.addEventListener('submit', submitFormAddCard)
