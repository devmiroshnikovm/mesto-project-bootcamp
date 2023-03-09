/* webpack */
import "./../pages/index.css" // добавьте импорт главного файла стилей
import "./../index.html"
/* webpack */

import { initialCards } from "./initialcards.js"
import { enableValidation } from "./validate.js"
import { createCard } from "./card.js"
import { openPopup, closePopup } from "./modal.js"
import { getInitialCards, getUser, updateProfile, addLikeCard, deleteLikeCard, sendRequestToCreateNewCard, sendRequestToDeleteCard, sendRequestToupdateAvatar } from "./api.js"
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
function fillDefaultsInProfileInputs() {
  nameInputProfilePopup.value = profileName.textContent
  jobInputProfilePopup.value = profileProfession.textContent
}

function hideClosestPopup(event) {
  const popup = event.target.closest(".popup")
  if (popup.classList.contains("popup_opened")) {
    closePopup(popup)
  }
}

function addNewCardAfter(card, userId) {
  const newItem = createCard(card, userId, handleCardClick, handleLikeButton, handleTrashButton) //handleLikeButton
  elementSelector.append(newItem)
}

function addNewCardBefore(card, userId) {
  const newItem = createCard(card, userId, handleCardClick, handleLikeButton, handleTrashButton) //handleLikeButton
  elementSelector.prepend(newItem)
}

function handleCardClick({ name, link }) {
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

function handleProfileFormSubmit(event) {
  event.preventDefault()
  //profileName.textContent = nameInputProfilePopup.value
  //profileProfession.textContent = jobInputProfilePopup.value

  //сохранить данные на сервере
  updateProfile(nameInputProfilePopup.value, jobInputProfilePopup.value)
    .then((result) => {
      //обновить html
      profileName.textContent = result.name
      profileProfession.textContent = result.about

      hideClosestPopup(event)
    })
    .catch((err) => {
      console.log(err)
    })
}

async function handleNewItemFormSubmit(event) {
  event.preventDefault()

  const blankCard = {
    name: nameInputNewItemPopup.value,
    link: linkInputNewItemPopup.value,
  }
  // если в input есть что-то
  if (blankCard.name && blankCard.link) {
    // отправить async создать карточку

    try {
      const response = await sendRequestToCreateNewCard(blankCard)

      const card = {
        name: response.name,
        link: response.link,
        _id: response._id,
        likes: response.likes,
        owner: response.owner,
      }

      addNewCardBefore(card, userId) //userId глобальная переменная
      hideClosestPopup(event)
      //обнуляем сразу всю форму
      event.target.reset()
    } catch (error) {
      console.log(error)
    }
  }
}

async function handleEditAvatarSubmit(event) {
  event.preventDefault()

  hideClosestPopup(event)
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
  linkInputNewItemPopup.value = "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
  // TODO test
  openPopup(popupNewItem)
})

formElementProfilePopup.addEventListener("submit", handleProfileFormSubmit)
formElementNewItemPopup.addEventListener("submit", handleNewItemFormSubmit)
formElementPopupAvatar.addEventListener("submit", handleEditAvatarSubmit)
/* event listners */

/* main code */
//fillDefaultsInProfileInputs(popupProfile)

initialCards.forEach((card) => {
  //addNewCardAfter(card)
})

enableValidation(configValidation)
/* main code */

// async

let userId

async function renderUserData() {
  const user = await getUser()

  profileName.textContent = user.name
  profileProfession.textContent = user.about
  profileAvatar.src = user.avatar
  profileAvatar.alt = user.name

  nameInputProfilePopup.value = user.name
  jobInputProfilePopup.value = user.about

  return user
}

async function renderCards() {
  const user = await renderUserData() // одно
  const cards = await getInitialCards() // потом другое

  userId = user._id

  cards.forEach((item) => {
    const card = {
      name: item.name,
      link: item.link,
      _id: item._id,
      likes: item.likes,
      owner: item.owner,
    }

    addNewCardAfter(card, userId)
  })
}
renderCards()

/* getUser()
  .then((result) => {
    userId = result._id

    profileName.textContent = result.name
    profileProfession.textContent = result.about
    profileAvatar.src = result.avatar
    profileAvatar.alt = result.name

    nameInputProfilePopup.value = result.name
    jobInputProfilePopup.value = result.about
  })
  .catch((err) => {
    console.log(err)
  }) */
/* 
getInitialCards()
  .then((result) => {
    result.forEach((item) => {
      const card = {
        name: item.name,
        link: item.link,
        _id: item._id,
        userId: userId,
      }
      addNewCardAfter(card)
    })
  })
  .catch((err) => {
    console.log(err)
  }) */

//button.classList.toggle("elements__button-like_active")

//test

//64060d42cf8e9f116c8b3fef

/* function testHandleLikeButton() {
  let isLiked = false

  function checkLike(id) {
    return new Promise((resolve, reject) => {
      if (!isLiked) {
        addLikeCard(id)
          .then((result) => {
            isLiked = true
            resolve(isLiked)
          })
          .catch(reject)
      } else {
        deleteLikeCard(id)
          .then((result) => {
            isLiked = false
            resolve(isLiked)
          })
          .catch(reject)
      }
    })
  }

  function getIsLiked() {
    return isLiked
  }

  return {
    checkLike,
    getIsLiked,
  }
}

const like = testHandleLikeButton()

like
  .checkLike("64060d42cf8e9f116c8b3fef")
  .then((result) => console.log(result))
  .catch((error) => console.error(error))

setTimeout(function () {
  like
    .checkLike("64060d42cf8e9f116c8b3fef")
    .then((result) => console.log(result))
    .catch((error) => console.error(error))
}, 2000) */

/* deleteLikeCard("64060d42cf8e9f116c8b3fef")
  .then((result) => {
    console.log(result)
  })
  .catch((err) => {
    console.log(err)
  }) */

/* getInitialCards().then((result) => {
  console.log(result[0].likes.length)
}) */

///////

/* let isLiked = false //так  работает

function testHandleLikeButton() {
  //let isLiked = false //так не работает

  async function toggleLike(button, id) {
    if (!isLiked) {
      await addLikeCard(id)
      button.classList.toggle("elements__button-like_active")
      isLiked = true
    } else {
      await deleteLikeCard(id)
      button.classList.toggle("elements__button-like_active")
      isLiked = false
    }
    return isLiked
  }

  return toggleLike
} */

/*

let userId

setTimeout(() => {
  getUser()
    .then((result) => {
      userId = result._id

      profileName.textContent = result.name
      profileProfession.textContent = result.about
      profileAvatar.src = result.avatar
      profileAvatar.alt = result.name

      nameInputProfilePopup.value = result.name
      jobInputProfilePopup.value = result.about
    })
    .catch((err) => {
      console.log(err)
    })
}, 2000)

getInitialCards()
  .then((result) => {
    result.forEach((item) => {
      const card = {
        name: item.name,
        link: item.link,
        _id: item._id,
        userId: userId,
      }
      addNewCardAfter(card)
    })
  })
  .catch((err) => {
    console.log(err)
  })


  */
/* 
let userId

async function renderUserData() {
  const user = await getUser()
  // мой user._id
}

setTimeout(() => {
  renderUserData()
}, 2000)

async function renderCards() {
  const cards = await getInitialCards()

  cards.forEach((item) => {
    const card = {
      name: item.name,
      link: item.link,
      _id: item._id,
      //userId: userId,
    }
    addNewCardAfter(card)
  })
}
renderCards()
 */
