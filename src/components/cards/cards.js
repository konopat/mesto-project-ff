const page = document.querySelector('.page')
const content = page.querySelector('.content')
const cardList = content.querySelector('.places__list')
// Шаблон карточки
const cardTemplate = page.querySelector('#card-template').content

// Данные для карточек по умолчанию
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
]

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
const addCard = (card) => {
  if (isCard(card)) {
    cardList.append(card)
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

// Создание карточки
const createCard = (cardData, deleteCardFunction) => {
  // Валидируем входящие данные
  if (isValid(cardData)) {
    // Клонируем структуру элемента из шаблона
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
    const cardImage = cardElement.querySelector('.card__image')
    const cardTitle = cardElement.querySelector('.card__title')
    // Наполняем элемент
    cardImage.src = cardData.link // Изображение
    cardImage.alt = cardData.name // Alt изображения
    cardTitle.textContent = cardData.name // Название
    const deleteButton = cardElement.querySelector('.card__delete-button')
    // Вешаем слушатель на кнопку удаления
    deleteButton.addEventListener(
      'click',
      () => deleteCardFunction(cardElement) // Удаляем карточку
    )
    // Добавляем элемент в DOM
    return cardElement
  } else {
    console.error('Данные не прошли валидацию:', cardData)
  }
}

// Карточки, которые выводятся по умолчанию
export const createInitialCards = () => {
  initialCards.forEach((item) => {
    const card = createCard(item, removeCard)
    addCard(card)
  })
}
