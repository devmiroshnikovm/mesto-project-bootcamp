import { config } from "./constants.js"
import { checkResponse } from "./utils.js"

export async function getInitialCards() {
  const result = await fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  })
  return await checkResponse(result)
}

export async function getUser() {
  const result = await fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  })
  return await checkResponse(result)
}

export async function updateProfile(name, about) {
  const data = {
    name: name,
    about: about,
  }

  const result = await fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  })
  return await checkResponse(result)
}

export async function addLikeCard(id) {
  const result = await fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  })
  return await checkResponse(result)
}

export async function deleteLikeCard(id) {
  const result = await fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
  return await checkResponse(result)
}

export async function sendRequestToCreateNewCard(card) {
  const result = await fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(card),
  })
  return await checkResponse(result)
}

export async function sendRequestToDeleteCard(id) {
  const result = await fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
  return await checkResponse(result)
}

export async function sendRequestToUpdateAvatar(link) {
  const data = {
    avatar: link,
  }
  const result = await fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  })
  return await checkResponse(result)
}

/* export async function getInitialCards() {
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
} */
