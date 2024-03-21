// Получить данные пользователя
export const getUser = (config) => {
  const request = {
    method: 'GET',
    endPoint: '/users/me',
    headers: {
      authorization: config.token,
    },
  }
  return (
    // Запрашиваем сервер и возвращаем ответ
    fetchServer(config, request)
  )
}

// Загрузить все карточки
export const getCards = (config) => {
  const request = {
    method: 'GET',
    endPoint: '/cards',
    headers: {
      authorization: config.token,
    },
  }
  return (
    // Запрашиваем сервер и возвращаем ответ
    fetchServer(config, request)
  )
}

// Редактировать профиль
export const editProfile = (config, user) => {
  const request = {
    method: 'PATCH',
    endPoint: '/users/me',
    headers: {
      authorization: config.token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: user.name,
      about: user.about,
    }),
  }
  // Запрашиваем сервер и возвращаем ответ
  return fetchServer(config, request)
}

// Добавить новую карточку
export const addCard = (config, card) => {
  const request = {
    method: 'POST',
    endPoint: '/cards',
    headers: {
      authorization: config.token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  }
  // Запрашиваем сервер и возвращаем ответ
  return fetchServer(config, request)
}

// Удалить карточку
export const deleteCardFromServer = (config, idCard) => {
  const request = {
    method: 'DELETE',
    endPoint: '/cards/' + idCard,
    headers: {
      authorization: config.token,
    },
  }
  return fetchServer(config, request)
}

// Лайкнуть карточку
export const likeCardOnServer = (config, idCard) => {
  const request = {
    method: 'PUT',
    endPoint: '/cards/likes/' + idCard,
    headers: {
      authorization: config.token,
    },
  }
  return fetchServer(config, request)
}

// Дизлайкнуть карточку
export const dislikeCardOnServer = (config, idCard) => {
  const request = {
    method: 'DELETE',
    endPoint: '/cards/likes/' + idCard,
    headers: {
      authorization: config.token,
    },
  }
  return fetchServer(config, request)
}

// Запросить сервер
const fetchServer = (config, request) => {
  return (
    fetch(config.url + config.team + request.endPoint, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    })
      // Анализируем ответ
      .then((res) => {
        if (res.ok) {
          // Если ок
          return res.json() // Вернем JSON
        }
        // Если сервер ответил "не ок"
        return Promise.reject(`Сервер ответил: ${res.status}`) // Вернем ошибку
      })
      // Если есть положительный результат
      .then((result) => {
        return result // Вернем его
      })
  )
}

// Сменить аватар

export const changeAvatar = (config, imageUrl) => {
  const request = {
    method: 'PATCH',
    endPoint: '/users/me/avatar',
    headers: {
      authorization: config.token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      avatar: imageUrl,
    }),
  }
  return fetchServer(config, request)
}
