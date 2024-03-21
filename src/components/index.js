import '../pages/index.css' // Стили
import { createCard, deleteCard, likeCard } from './card'
import { openPopUp, closePopUp } from './modal'
import { enableValidation, clearValidation } from './validation'
import { validationConfig } from './validation.config'
import {
  addCard as pushCardOnServer,
  editProfile,
  getCards,
  getUser,
  changeAvatar,
} from './api'
import { apiConfig } from './api.config'

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
const popUpAvatar = page.querySelector('.popup_type_edit_avatar')
const imgInsidePopUp = popUpImage.querySelector('.popup__image')
const captionInsidePopUp = popUpImage.querySelector('.popup__caption')
const buttonsClosePopUp = page.querySelectorAll('.popup__close')
const buttonOpenPopUpEditProfile = page.querySelector('.profile__edit-button')
const buttonOpenPopUpAddCard = page.querySelector('.profile__add-button')
// Формы
const formEditProfile = document.forms['edit-profile']
const buttonSubmitFormEditProfile =
  formEditProfile.querySelector('.popup__button')
const formAddCard = document.forms['new-place']
const buttonSubmitFormAddCard = formAddCard.querySelector('.popup__button')
const formEditAvatar = document.forms['edit-avatar']
const buttonSubmitFormEditAvatar =
  formEditAvatar.querySelector('.popup__button')
// Профиль
const titleProfile = page.querySelector('.profile__title')
const descriptionProfile = page.querySelector('.profile__description')
const avatar = page.querySelector('.profile__image')

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
  buttonSubmitFormEditProfile.textContent = 'Сохранение...'
  // Создаем объект с новыми данными пользователя
  const user = {
    name: formEditProfile.name.value,
    about: formEditProfile.description.value,
  }
  // Отправляем запрос на сервер
  editProfile(apiConfig, user)
    // Если удачно, отрисовывем изменения в DOM
    .then((user) => {
      titleProfile.textContent = user.name
      descriptionProfile.textContent = user.about
    })
    .finally(() => {
      buttonSubmitFormEditProfile.textContent = 'Сохранить'
      closePopUp(popUpEditProfile) // Закрываем попап
    })
    .catch((err) => {
      console.error(err)
    })
}

// Засабмитить форму добавления новой карточки
const submitFormAddCard = (evt) => {
  evt.preventDefault() // Отменяем стандартную отправку формы.
  // Готовим данные для создания карточки
  const data = {
    name: formAddCard['place-name'].value,
    link: formAddCard.link.value,
  }
  buttonSubmitFormAddCard.textContent = 'Сохранение...'
  // Отправляем данные на сервер
  pushCardOnServer(apiConfig, data)
    // Если сервер вернул созданную карточку
    .then((card) => {
      // Создаем карточку как элемент DOM
      const elementCard = createCard(
        card,
        cardTemplate,
        deleteCard,
        likeCard,
        openImagePopUp,
        card.owner
      )
      addCard(elementCard) // Добавляем карточку в DOM
    })
    .finally(() => {
      buttonSubmitFormAddCard.textContent = 'Сохранить'
      formAddCard.reset() // Сбрасываем поля формы
      clearValidation(formAddCard, validationConfig) // Отключаем сабмит
      closePopUp(popUpAddCard) // Закрываем попап
    })
    .catch((err) => {
      console.error(err)
    })
}

// Добавить карточку
const addCard = (card) => {
  cardList.prepend(card)
}

// Вывести карточки на страницу
const renderCards = (dataset, currentUser) => {
  dataset.reverse()
  dataset.forEach((data) => {
    const card = createCard(
      data,
      cardTemplate,
      deleteCard,
      likeCard,
      openImagePopUp,
      currentUser
    )
    addCard(card)
  })
}

// Вывести на страницу актуальные карточки, полученные с сервера
const renderActualCards = (config) => {
  // Запрашиваем пользователя и карточки одновременно
  Promise.all([getUser(config), getCards(config)])
    .then((res) => {
      const user = res[0]
      // Если удалось идентифицировать пользователя
      if (user.name != config.anon.name) {
        // Отрисовываем карточки
        const cards = res[1]
        renderCards(cards, user)
        // Отрисовываем пользователя
        renderProfile(user)
      } // Если нет, то список карточек будет пустым, а вместо пользователя будет отображаться аноним
    })
    .catch((err) => {
      console.error(err)
    })
}

// Открыть редактор аватара
const editAvatar = () => {
  openPopUp(popUpAvatar)
}

// Засабмитить форму редактора аватара
const submitFormEditAvatar = (evt) => {
  evt.preventDefault() // Отменяем стандартную отправку формы.
  buttonSubmitFormEditAvatar.textContent = 'Сохранение...'
  // Вынимаем ссылку на новую аватарку
  const link = formEditAvatar.link.value
  // Отправляем запрос на сервер
  changeAvatar(apiConfig, link)
    // Если удачно, отрисовывем изменения в DOM
    .then((user) => {
      avatar.style.backgroundImage = 'url(' + user.avatar + ')'
    })
    .finally(() => {
      buttonSubmitFormEditAvatar.textContent = 'Сохранить'
      closePopUp(popUpAvatar) // Закрываем попап
      formEditAvatar.reset() // Сбрасываем поля формы
      clearValidation(formEditAvatar, validationConfig) // Отключаем сабмит
    })
    .catch((err) => {
      console.error(err)
    })
}

// Отрисовать профиль
const renderProfile = (user) => {
  titleProfile.textContent = user.name
  descriptionProfile.textContent = user.about
  avatar.style.backgroundImage = 'url(' + user.avatar + ')'
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

// Отрисовываем карточки
renderActualCards(apiConfig)

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

// Ждет клик по аватарке
avatar.addEventListener('click', editAvatar)

// Ждет сабмит формы редактирования аватарки
formEditAvatar.addEventListener('submit', submitFormEditAvatar)
