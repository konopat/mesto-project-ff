import '../pages/index.css' // Стили
import { initialCards } from './cards' // Массив карточек по умолчанию
import { renderCards } from './card'
import { openPopUp, closePopUp } from './modal'

// -- СЛУЖЕБНЫЕ КЛАССЫ
const pageClass = 'page'
// Классы карточек
const cardListClass = 'places__list'
// Классы попапов
const popUpClass = 'popup'
const popUpIsOpenedClass = 'popup_is-opened'
const popUpIsAnimatedClass = 'popup_is-animated'
const popUpCloseButtonClass = 'popup__close'
const popUpProfileEditorClass = 'popup_type_edit'
const popupNewCardFormClass = 'popup_type_new-card'
const imagePopUpTemplateClass = 'popup_type_image'
// Классы профиля
const profileTitleClass = 'profile__title'
const profileDescriptionClass = 'profile__description'
const profileEditButtonClass = 'profile__edit-button'
const profileAddButtonClass = 'profile__add-button'

// -- DOM-ЭЛЕМЕНТЫ
const page = document.querySelector('.' + pageClass)
// Карточки
const cardList = page.querySelector('.' + cardListClass)
const cardTemplate = page.querySelector('#card-template').content
// Профиль
const profileTitle = page.querySelector('.' + profileTitleClass)
const profileDescription = page.querySelector('.' + profileDescriptionClass)
const profileEditButton = page.querySelector('.' + profileEditButtonClass)
const profileAddButton = page.querySelector('.' + profileAddButtonClass)
// Попапы
const popupProfileEditor = page.querySelector('.' + popUpProfileEditorClass)
const popupNewCardForm = page.querySelector('.' + popupNewCardFormClass)
const popUps = page.querySelectorAll('.' + popUpClass)
const imagePopUpTemplate = page.querySelector('.' + imagePopUpTemplateClass)
// Формы
const editProfileForm = document.forms['edit-profile']
const newCardForm = document.forms['new-place']
const newCardFormInputPlaceName = newCardForm['place-name']
const newCardFormInputLink = newCardForm.link

// -- ОБРАБОТЧИКИ
// Сабмит формы редактирования профиля
const editProfileFormSubmitHandle = (evt) => {
  evt.preventDefault() // Отменяет стандартную отправку формы.
  profileTitle.textContent = editProfileForm.name.value
  profileDescription.textContent = editProfileForm.description.value
  const currentPopUp = getCurrentPopUp(evt) // Текущий попап
  closePopUp(currentPopUp, popUpIsOpenedClass) // Закрывает попап
}

// Сабмит формы добавления новой карточки
const newCardFormSubmitHandle = (evt) => {
  evt.preventDefault() // Отменяет стандартную отправку формы.
  // Создаем массив с объектом новой карточки, чтобы использовать единую функцию рендеринга
  const newcard = [
    {
      name: newCardFormInputPlaceName.value,
      link: newCardFormInputLink.value,
    },
  ]
  // Дорисовываем новую карточку
  renderCards(newcard, cardList, cardTemplate, imagePopUpTemplate)
  const currentPopUp = getCurrentPopUp(evt) // Получаем текущий попап
  closePopUp(currentPopUp, popUpIsOpenedClass) // Закрываем текущий попап
  newCardForm.reset() // Сбрасываем поля формы
}

// -- СЛУШАТЕЛИ
// Ждет всплывающее событие: нажатие по кнопке закрытия попапа
page.addEventListener('click', (evt) => {
  if (evt.target.classList.contains(popUpCloseButtonClass)) {
    const currentPopUp = getCurrentPopUp(evt) // Получаем текущий попап
    closePopUp(currentPopUp, popUpIsOpenedClass) // // Закрываем текущий попап
  }
})

// Ждет клик по кнопке "редактировать профиль"
profileEditButton.addEventListener('click', () =>
  openPopUp(popupProfileEditor, popUpIsOpenedClass)
)

// Ждет клик по кнопке "+"
profileAddButton.addEventListener('click', () =>
  openPopUp(popupNewCardForm, popUpIsOpenedClass)
)

// Ждет сабмит формы редактирования профиля
editProfileForm.addEventListener('submit', editProfileFormSubmitHandle)

// Ждет сабмит формы добавления новой карточки
newCardForm.addEventListener('submit', newCardFormSubmitHandle)

// -- РЕНДЕРИНГ
// Добавляем всем попапам плавные анимации
popUps.forEach((popUp) => {
  popUp.classList.add(popUpIsAnimatedClass)
})

// Формы
// Добавляем начальные значения инпутам формы редактирования профиля
editProfileForm.name.value = profileTitle.textContent
editProfileForm.description.value = profileDescription.textContent

// Карточки
// Выводим начальные карточки на экран
renderCards(initialCards, cardList, cardTemplate, imagePopUpTemplate)

// -- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
const getCurrentPopUp = (evt) => {
  return evt.target.closest('.' + popUpClass)
}
