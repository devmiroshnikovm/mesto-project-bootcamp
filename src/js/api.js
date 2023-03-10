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
      return await result.json() //json возвращает promise
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
  const data = {
    name: name,
    about: about,
  }
  try {
    const result = await fetch(`${config.baseUrl}/users/me`, {
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
    console.log(result)

    if (result.ok) {
      return await result.json()
    } else {
      throw new Error(`Ошибка: ${result.status}`)
    }
  } catch (error) {
    throw new Error(error.message)
  }
}
