import { openPopUp } from './modal'

// -- ВАЛИДАЦИЯ

// Валидация данных для создания карточки
const isValid = (cardData) => {
  // Проверяем формат полученных данных
  if (!cardData.name && !cardData.link) {
    console.error(
      'Не верный формат данных для создания карточки. Ожидается объект с ключами: name и link'
    )
    return false
  } else if (!cardData.name) {
    // Если отсутствует только name
    console.error('Отсутствует значение для ключа name')
    return false
  } else if (!cardData.link) {
    // Если отсутствует только link
    console.error('Отсутствует значение для ключа link')
    return false
  } else if (!URL.canParse(cardData.link)) {
    // Если link не является ссылкой
    console.error('Значение для ключа link должно быть ссылкой')
    return false
  } else {
    // Если все условия соблюдены
    return true // Валидация пройдена
  }
}

// Валидация карточки
const isCard = (card) => {
  // Вернет true, если card элемент с соответствующим классом
  if (card.className.includes('card')) {
    return true
  }
  return false
}

// -- МАНИПУЛЯЦИИ С КАРТОЧКАМИ

// Добавление карточки
const addCard = (card, cardList) => {
  if (isCard(card)) {
    // Добавляем новую карточку в начало списка
    cardList.prepend(card)
  } else {
    console.error(
      'Не удалось добавить карточку, данные не прошли валидацию:',
      card
    )
  }
}

// Удаление карточки
const removeCard = (card) => {
  if (isCard(card)) {
    card.remove()
  } else {
    console.error(
      'Не удалось удалить карточку, данные не прошли валидацию:',
      card
    )
  }
}

// Лайк
const likeTheCard = (likeButton) => {
  likeButton.classList.toggle('card__like-button_is-active')
}

// Создание карточки
const createCard = (
  cardData,
  cardTemplate,
  deleteCardFunction,
  openPopUpFunction,
  popUpTemplate,
  likeTheCardFunction
) => {
  // Валидируем входящие данные
  if (isValid(cardData)) {
    // Клонируем структуру элемента из шаблона
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
    const cardImage = cardElement.querySelector('.card__image')
    const cardTitle = cardElement.querySelector('.card__title')
    const deleteButton = cardElement.querySelector('.card__delete-button')
    const cardLikeButton = cardElement.querySelector('.card__like-button')

    // Наполняем элемент
    cardImage.src = cardData.link // Изображение
    cardImage.alt = cardData.name // Alt изображения
    cardTitle.textContent = cardData.name // Название

    // Вешаем слушатель на кнопку удаления
    deleteButton.addEventListener(
      'click',
      () => deleteCardFunction(cardElement) // Удаляем карточку
    )

    // Вешаем слушатель на изображение
    cardImage.addEventListener('click', () => {
      openPopUpFunction(popUpTemplate, 'popup_is-opened')
      popUpTemplate.querySelector('.popup__image').src = cardImage.src
      popUpTemplate.querySelector('.popup__caption').textContent = cardImage.alt
    })

    // Вешаем слушатель на лайк
    cardLikeButton.addEventListener('click', () => {
      likeTheCardFunction(cardLikeButton)
    })

    // Добавляем элемент в DOM
    return cardElement
  } else {
    console.error('Данные не прошли валидацию:', cardData)
  }
}

// Рендеринг карточек
export const renderCards = (cards, list, template, popUpTemplate) => {
  // Перебираем карточки в обратном порядке
  cards.reverse().forEach((item) => {
    // Создаем новую карточку
    const card = createCard(
      item,
      template,
      removeCard,
      openPopUp,
      popUpTemplate,
      likeTheCard
    )
    // Добавляем карточку на страницу
    addCard(card, list)
  })
}
