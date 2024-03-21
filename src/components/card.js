import noimage from '../images/noimage.jpg' // Заглушка для не загрузившихся изображений
import {
  deleteCardFromServer,
  dislikeCardOnServer,
  getLikes,
  likeCardOnServer,
} from './api'
import { apiConfig } from './api.config'

// Создание карточки
export const createCard = (
  data,
  template,
  deleteCard,
  likeCard,
  openImagePopUp,
  currentUser
) => {
  // Клонируем структуру элемента из шаблона
  const card = template.querySelector('.card').cloneNode(true)
  const image = card.querySelector('.card__image')
  const title = card.querySelector('.card__title')
  const buttonDelete = card.querySelector('.card__delete-button')
  const buttonLike = card.querySelector('.card__like-button')
  const likeCounter = card.querySelector('.card__like-counter')
  // Проверяем лайки текущего пользователя в списке лайков текущей карточки
  const isLikedByCurrentUser = data.likes.find(
    (item) => item._id === currentUser._id
  )
  // Наполняем элемент
  // Если текущий пользователь уже лайкал карточку
  if (isLikedByCurrentUser) {
    buttonLike.classList.toggle('card__like-button_is-active') // Отрисовываем лайк на экране
  }

  // Отрисовываем количество лайков
  likeCounter.textContent = data.likes.length // Выводим актуальное количество лайков

  // Если карточка создана другим пользователем
  if (currentUser._id != data.owner._id) {
    buttonDelete.remove() // Убираем кнопку удаления
  } else {
    // Если карточка создана текущим пользователем
    // Вешаем слушатель на кнопку удаления
    buttonDelete.addEventListener(
      'click',
      () => deleteCard(card, data._id) // Удалить карточку
    )
  }
  image.src = data.link // Изображение
  image.alt = data.name // Alt изображения
  // Если изображение не загрузилось
  image.onerror = () => {
    image.src = noimage
    image.alt = 'Заглушка для не загрузившихся изображений'
  }
  title.textContent = data.name // Название

  // Вешаем слушатель на кнопку "Лайк"
  buttonLike.addEventListener('click', () => {
    likeCard(buttonLike, data._id, likeCounter)
  })
  // Вешаем слушатель на изображение
  image.addEventListener('click', () => {
    openImagePopUp(image)
  })
  // Возвращаем DOM-элемент
  return card
}

// Удаление карточки
export const deleteCard = (elementCard, idCard) => {
  deleteCardFromServer(apiConfig, idCard) // Удаляем карточку с сервера
    .then(() => {
      elementCard.remove() // Удаляем из DOM
    })
}

// Лайк карточки
export const likeCard = (button, idCard, likeCounter) => {
  // Если карточка уже лайкнута текущим пользователем
  if (button.classList.contains('card__like-button_is-active')) {
    dislikeCardOnServer(apiConfig, idCard).then((res) => {
      likeCounter.textContent = res.likes.length // Отрисовываем количество лайков
      button.classList.toggle('card__like-button_is-active') // Убираем лайк
    })
  } else {
    likeCardOnServer(apiConfig, idCard).then((res) => {
      likeCounter.textContent = res.likes.length // Отрисовываем количество лайков
      button.classList.toggle('card__like-button_is-active') // Отрисовываем лайк на экране
    })
  }
}
