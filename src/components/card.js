// Создание карточки
export const createCard = (
  data,
  template,
  deleteCard,
  likeCard,
  openImagePopUp
) => {
  // Клонируем структуру элемента из шаблона
  const card = template.querySelector('.card').cloneNode(true)
  const image = card.querySelector('.card__image')
  const title = card.querySelector('.card__title')
  const buttonDelete = card.querySelector('.card__delete-button')
  const buttonLike = card.querySelector('.card__like-button')
  // Наполняем элемент
  image.src = data.link // Изображение
  image.alt = data.name // Alt изображения
  title.textContent = data.name // Название
  // Вешаем слушатель на кнопку удаления
  buttonDelete.addEventListener(
    'click',
    () => deleteCard(card) // Удаляем карточку
  )
  // Вешаем слушатель на кнопку "Лайк"
  buttonLike.addEventListener('click', () => {
    likeCard(buttonLike)
  })
  // Вешаем слушатель на изображение
  image.addEventListener('click', () => {
    openImagePopUp(image)
  })
  // Возвращаем DOM-элемент
  return card
}

// Удаление карточки
export const deleteCard = (card) => {
  card.remove()
}

// Лайк карточки
export const likeCard = (button) => {
  button.classList.toggle('card__like-button_is-active')
}
