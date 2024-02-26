import '../pages/index.css' // Стили
import { initialCards } from './cards'
import { createCard, deleteCard, likeCard } from './card'
import { openPopUp, closePopUp } from './modal'

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
  const img = popUpImage.querySelector('.popup__image')
  const caption = popUpImage.querySelector('.popup__caption')
  img.src = image.src
  img.alt = image.alt
  caption.textContent = image.alt
  openPopUp(popUpImage)
}

// Засабмитить форму редактирования профиля
const submitFormEditProfile = (evt) => {
  evt.preventDefault() // Отменяет стандартную отправку формы.
  titleProfile.textContent = formEditProfile.name.value
  descriptionProfile.textContent = formEditProfile.description.value
  const popUp = evt.target.closest('.popup')
  closePopUp(popUp) // Закрывает попап
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
  // Закрываем текущий попап
  const popUp = evt.target.closest('.popup')
  closePopUp(popUp)
  formAddCard.reset() // Сбрасываем поля формы
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

// Рендеринг
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

// Слушатели
// Ждет клик по кнопке "редактировать профиль"
buttonOpenPopUpEditProfile.addEventListener('click', () => {
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
