const config = {
  baseUrl: "https://nomoreparties.co/v1/wbf-cohort-6",
  headers: {
    authorization: "5472337c-d412-4d8a-96d4-b9ada7028e45",
    "Content-Type": "application/json",
  },
}

export async function getInitialCards() {
  try {
    const result = await fetch(`${config.baseUrl}/cards`, {
      method: "GET",
      headers: config.headers,
    })
    if (result.ok) {
      return await result.json()
    } else {
      throw new Error(`Ошибка: ${result.status}`)
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function getUser() {
  try {
    const result = await fetch(`${config.baseUrl}/users/me`, {
      method: "GET",
      headers: config.headers,
    })
    if (result.ok) {
      return await result.json()
    } else {
      throw new Error(`Ошибка: ${result.status}`)
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function updateProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json()
    }

    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

export async function addLikeCard(id) {
  try {
    const result = await fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: "PUT",
      headers: config.headers,
    })
    if (result.ok) {
      return await result.json()
    } else {
      throw new Error(`Ошибка: ${result.status}`)
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function deleteLikeCard(id) {
  try {
    const result = await fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: "DELETE",
      headers: config.headers,
    })
    if (result.ok) {
      return await result.json()
    } else {
      throw new Error(`Ошибка: ${result.status}`)
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function sendRequestToCreateNewCard(card) {
  try {
    const result = await fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify(card),
    })
    if (result.ok) {
      return await result.json()
    } else {
      throw new Error(`Ошибка: ${result.status}`)
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function sendRequestToDeleteCard(id) {
  try {
    const result = await fetch(`${config.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: config.headers,
    })
    if (result.ok) {
      return await result.json()
    } else {
      throw new Error(`Ошибка: ${result.status}`)
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function sendRequestToUpdateAvatar(link) {
  const data = {
    avatar: link,
  }

  try {
    const result = await fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify(data),
    })
    if (result.ok) {
      return await result.json()
    } else {
      throw new Error(`Ошибка: ${result.status}`)
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

/* const data = {
  name: "Архыз",
  link: "https://telegra.ph/file/3640e4dd9c2b1d84a0ea2.jpg",
}
const postCard = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      return res.json()
    }

    return Promise.reject(`Ошибка: ${res.status}`)
  })
} */

/* const id = "6405edb1cf8e9f116c8a4cff"

const deleteCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json()
    }

    return Promise.reject(`Ошибка: ${res.status}`)
  })
} */

//https://telegra.ph/file/3640e4dd9c2b1d84a0ea2.jpg
//https://pbs.twimg.com/media/E_cMvp3UUAI-la-.jpg
//https://images-cdn.9gag.com/photo/aAg6op2_700b.jpg

/* export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json()
    }

    return Promise.reject(`Ошибка: ${res.status}`)
  })
} */

/* export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json()
    }

    return Promise.reject(`Ошибка: ${res.status}`)
  })
} */

//PUT https://nomoreparties.co/v1/cohortId/cards/likes/cardId

/* export const addLikeCard = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json()
    }

    return Promise.reject(`Ошибка: ${res.status}`)
  })
} */

/* export const deleteLikeCard = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json()
    }

    return Promise.reject(`Ошибка: ${res.status}`)
  })
} */
