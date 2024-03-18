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
      // Отлавливаем ошибки
      .catch((err) => {
        // Выводим ошибку в консоль
        console.error('Ошибка запроса пользователя', err)
        // Выводим данные анонимного пользователя, чтобы не замораживать интерфейс
        return config.anon
      })
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
    fetchServer(config, request).catch((err) => {
      // Выводим ошибку в консоль
      console.error('Ошибка запроса карточек', err)
    })
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
  return fetchServer(config, request).catch((err) => {
    // Выводим ошибку в консоль
    console.error('Ошибка редактирования пользователя', err)
  })
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
  return fetchServer(config, request).catch((err) => {
    // Выводим ошибку в консоль
    console.error('Ошибка добавления новой карточки', err)
  })
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
  return fetchServer(config, request).catch((err) => {
    // Выводим ошибку в консоль
    console.error('Ошибка удаления карточки', err)
  })
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
  return fetchServer(config, request).catch((err) => {
    // Выводим ошибку в консоль
    console.error('Ошибка отправки лайка на сервер', err)
  })
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
  return fetchServer(config, request).catch((err) => {
    // Выводим ошибку в консоль
    console.error('Ошибка удаления лайка на сервере', err)
  })
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
