const mainContent = document.querySelector('.content')
const cardList = mainContent.querySelector('.places__list')

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
  const cardProperties = Array.from(card.children)
  const cardImgNode = cardProperties[0].nodeName
  const cardButtonNode = cardProperties[1].nodeName
  const cardTitleNode = cardProperties[2].firstElementChild.nodeName
  if (
    cardImgNode === 'IMG' &&
    cardButtonNode === 'BUTTON' &&
    cardTitleNode === 'H2'
  ) {
    return true
  }
  return false
}

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
    // Обращаемся к шаблону
    const cardTemplate = document.querySelector('#card-template').content
    // Клонируем структуру элемента
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
    const cardImage = cardElement.querySelector('.card__image')
    const cardTitle = cardElement.querySelector('.card__title')
    const deleteButton = cardElement.querySelector('.card__delete-button')
    // Наполняем элемент
    cardImage.src = cardData.link // Изображение
    cardTitle.textContent = cardData.name // Название
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
initialCards.forEach((item) => {
  const card = createCard(item, removeCard)
  addCard(card)
})
