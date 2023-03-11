/* webpack */
import "./../pages/index.css"
import "./../index.html"
/* webpack */

import { initialCards } from "./initialcards.js"
import { enableValidation } from "./validate.js"
import { createCard } from "./card.js"
import { openPopup, closePopup } from "./modal.js"
import { getInitialCards, getUser, updateProfile, addLikeCard, deleteLikeCard, sendRequestToCreateNewCard, sendRequestToDeleteCard, sendRequestToUpdateAvatar } from "./api.js"
/* variables */

const profileName = document.querySelector(".profile__title")
const profileProfession = document.querySelector(".profile__subtitle")
const profileAvatar = document.querySelector(".profile__avatar")

//popup - edit profile
const buttonProfilePopup = document.querySelector(".button.profile__button-edit")
const popupProfile = document.querySelector(".popup_type_profile")
const formElementProfilePopup = document.forms["edit-profile"]
const nameInputProfilePopup = formElementProfilePopup.querySelector('input.form__item[name="name"]')
const jobInputProfilePopup = formElementProfilePopup.querySelector('input.form__item[name="job"]')
//popup - edit profile

//popup - add new item
const buttonNewItemPopup = document.querySelector(".profile__button-add")
const popupNewItem = document.querySelector(".popup_type_new-item") //newItemPopup
const formElementNewItemPopup = document.forms["new-item"]
const nameInputNewItemPopup = formElementNewItemPopup.querySelector('input.form__item[name="image_name"]')
const linkInputNewItemPopup = formElementNewItemPopup.querySelector('input.form__item[name="link"]')
//popup - add new item

//popup - increase screen image
const popupIncreaseImage = document.querySelector(".popup_type_image") //increaseImagePopup
const imgIncreaseImagePopup = popupIncreaseImage.querySelector(".elements__img_size_large")
const nameIncreaseImagePopup = popupIncreaseImage.querySelector(".elements__title_place_popup")
//popup - increase screen image

//popup - edit avatar
const popupAvatar = document.querySelector(".popup_type_edit-avatar") //increaseImagePopup
const formElementPopupAvatar = document.forms["edit-avatar"]
const linkInputPopupAvatar = formElementPopupAvatar.querySelector('input.form__item[name="link"]')
const buttonAvatar = document.querySelector(".profile__edit-avatar")
//popup - edit avatar

//add items
const elementSelector = document.querySelector(".elements__list") // find element to append

const configValidation = {
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__item_type_error",
  errorClass: "form__error-message__active",
}

/* variables */

/* functions */

function hideClosestPopup(event) {
  const popup = event.target.closest(".popup")
  if (popup.classList.contains("popup_opened")) {
    closePopup(popup)
  }
}

function addNewCardAfter(card, userId) {
  const newItem = createCard(card, userId, handleCardClick, handleLikeButton, handleTrashButton)
  elementSelector.append(newItem)
}

function addNewCardBefore(card, userId) {
  const newItem = createCard(card, userId, handleCardClick, handleLikeButton, handleTrashButton)
  elementSelector.prepend(newItem)
}

function handleCardClick({ name, link }) {
  console.log(name)
  console.log(link)

  console.log(nameIncreaseImagePopup)

  nameIncreaseImagePopup.textContent = name
  imgIncreaseImagePopup.setAttribute("src", link)
  imgIncreaseImagePopup.setAttribute("alt", name)
  openPopup(popupIncreaseImage)
}

async function handleLikeButton(button, countLike, id) {
  // если кнопка покрашена
  const isLiked = button.classList.contains("elements__button-like_active")
  if (!isLiked) {
    // отправить async на поставить лайк
    try {
      const result = await addLikeCard(id)
      countLike.textContent = result.likes.length
      button.classList.add("elements__button-like_active")
    } catch (error) {
      console.log(error)
    }
  } else {
    // отправить async на убрать лайк
    try {
      const result = await deleteLikeCard(id)
      countLike.textContent = result.likes.length
      button.classList.remove("elements__button-like_active")
    } catch (error) {
      console.log(error)
    }
  }
}

async function handleTrashButton(cardElement, id, removeItem) {
  try {
    await sendRequestToDeleteCard(id)
    removeItem(cardElement)
  } catch (error) {
    console.log(error)
  }
}

async function handleProfileFormSubmit(event) {
  event.preventDefault()

  const buttonSave = event.submitter
  buttonSave.textContent = "Сохранение..."

  try {
    const result = await updateProfile(nameInputProfilePopup.value, jobInputProfilePopup.value)
    profileName.textContent = result.name
    profileProfession.textContent = result.about
    profileAvatar.alt = result.name

    hideClosestPopup(event) //закрывается плавно
  } catch (error) {
    console.log(error)
  } finally {
    // не важно как пройдет запрос успешно или будет catch.
    // тут мы очищаем кнопку не важно как завершился вызов
    setTimeout(() => {
      //так как popup плавный
      buttonSave.textContent = "Сохранить"
    }, 1000)
  }
}

async function handleNewItemFormSubmit(event) {
  event.preventDefault()

  const buttonSave = event.submitter
  buttonSave.textContent = "Сохранение..."

  const blankCard = {
    name: nameInputNewItemPopup.value,
    link: linkInputNewItemPopup.value,
  }
  // если в input есть что-то
  if (blankCard.name && blankCard.link) {
    try {
      const card = await sendRequestToCreateNewCard(blankCard)
      // создаем карточку
      // возвразается ответ в котором указан userID  owner
      // так как пользователь сам создал эту карту через input
      // userID это userID owner

      addNewCardBefore(card, card.owner._id)
      hideClosestPopup(event)
      //обнуляем сразу всю форму
      event.target.reset()
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        buttonSave.textContent = "Сохранить"
      }, 1000)
    }
  }
}

async function handleEditAvatarSubmit(event) {
  event.preventDefault()
  const buttonSave = event.submitter
  buttonSave.textContent = "Сохранение..."
  try {
    const result = await sendRequestToUpdateAvatar(linkInputPopupAvatar.value)
    console.log(result)
    profileAvatar.src = result.avatar
    profileAvatar.alt = result.name
    hideClosestPopup(event)
    event.target.reset()
  } catch (error) {
    console.log(error)
  } finally {
    setTimeout(() => {
      buttonSave.textContent = "Сохранить"
    }, 1000)
  }
}

async function renderUserData() {
  try {
    const user = await getUser()
    profileName.textContent = user.name
    profileProfession.textContent = user.about
    profileAvatar.src = user.avatar
    profileAvatar.alt = user.name
    nameInputProfilePopup.value = user.name
    jobInputProfilePopup.value = user.about

    return user
  } catch (error) {
    return error
  }
}

async function renderCards() {
  // promise all возвращает один единый promise, который resolve когда все промисы  resolve
  // если хоть один promise reject - promise all - reject
  try {
    const [user, cards] = await Promise.all([renderUserData(), getInitialCards()])
    console.log(user._id)
    cards.forEach((card) => addNewCardAfter(card, user._id))
  } catch (error) {
    console.log(error)
  }

  // пример с последовательным исполнением
  /*   try {
    const user = await renderUserData() // ждем одно
    userId = user._id 
    const cards = await getInitialCards() // потом ждем другое
    cards.forEach((card) => addNewCardAfter(card, userId))
  } catch (error) {
    console.log(error)
  } */
}

/* functions */

/* event listners */
buttonProfilePopup.addEventListener("click", () => {
  openPopup(popupProfile)
})

buttonAvatar.addEventListener("click", () => {
  openPopup(popupAvatar)
})

buttonNewItemPopup.addEventListener("click", () => {
  // TODO test
  nameInputNewItemPopup.value = "test_item"
  linkInputNewItemPopup.value = "https://timmousk.com/wp-content/uploads/2022/03/2-2.jpg"
  // TODO test
  openPopup(popupNewItem)
})

formElementProfilePopup.addEventListener("submit", handleProfileFormSubmit)
formElementNewItemPopup.addEventListener("submit", handleNewItemFormSubmit)
formElementPopupAvatar.addEventListener("submit", handleEditAvatarSubmit)
/* event listners */

/* main code */
enableValidation(configValidation)
;(async () => {
  try {
    const startRenderingTime = Date.now()
    await renderCards()
    const renderDuration = (Date.now() - startRenderingTime) / 1000
    console.log("renderCards completed with ", `${renderDuration}`, " seconds")
  } catch (error) {
    console.error(error)
  }
})()
/* main code */

//https://www.meme-arsenal.com/memes/3c7bfe0ded968ccd8aab72a1df90c63e.jpg
