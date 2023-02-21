import { initialCards } from "./consts.js"

/* variables */
const buttonEditProfile = document.querySelector(".button.profile__button-edit")
const buttonPopupEditProfileClose = document.querySelector(".button.popup__button-close")
const buttonAddContent = document.querySelector(".profile__button-add")
const buttonPopupNewItemClose = document.querySelector(".popup__button-close_item_new")

const buttonsLikeList = document.querySelectorAll(".button.elements__button-like")
const buttonsTrashList = document.querySelectorAll(".button.elements__button-trash")

const profileName = document.querySelector(".profile__title")
const profileProfession = document.querySelector(".profile__subtitle")

const popup = document.querySelector(".popup")

const formElement = document.querySelector(".form")
const nameInput = formElement.querySelector('input.form__item[name="name"]')
const jobInput = formElement.querySelector('input.form__item[name="job"]')
/* variables */

/* functions */
function clearPopapInputs() {
  nameInput.value = profileName.textContent
  jobInput.value = profileProfession.textContent
}

function closePopup() {
  if (popup.classList.contains("popup_opened")) {
    popup.classList.remove("popup_opened")
    clearPopapInputs()
  } else {
    alert("class popup_opened not found")
  }
}

function addListnerToLikeButton(button) {
  button.addEventListener("click", function (event) {
    event.target.classList.toggle("elements__button-like_active")
  })
}

function addListnerToTrashButton(button) {
  button.addEventListener("click", function (event) {
    //найти ближайший элемент c class elements__item
    let currentItem = event.target.closest(".elements__item")
    currentItem.remove()
  })
}

function handleFormSubmit(evt) {
  // Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault()

  profileName.textContent = nameInput.value
  profileProfession.textContent = jobInput.value

  closePopup()
}

function addDefaultValuesToInputs(_popup) {
  if (_popup) {
    nameInput.value = profileName.textContent
    jobInput.value = profileProfession.textContent
  } else {
    console.log("popup not found")
  }
}

function addNewItem(name, link) {
  // find element to append
  const elementsList = document.querySelector(".elements")

  //add data from template
  const itemTemplate = document.querySelector("#item-template").content

  // клонируем содержимое тега template
  const newItem = itemTemplate.querySelector(".elements__item").cloneNode(true)

  // наполняем содержимым
  newItem.querySelector(".elements__title").textContent = name
  newItem.querySelector(".elements__img").src = link
  addListnerToLikeButton(newItem.querySelector(".elements__button-like"))
  addListnerToTrashButton(newItem.querySelector(".elements__button-trash"))

  // отображаем на странице
  elementsList.append(newItem)
}
/* functions */

/* event listners */
buttonEditProfile.addEventListener("click", function () {
  popup.classList.add("popup_opened")
})

buttonPopupEditProfileClose.addEventListener("click", closePopup)

buttonsLikeList.forEach(addListnerToLikeButton) //add likes
buttonsTrashList.forEach(addListnerToTrashButton) //add trash reaction

formElement.addEventListener("submit", handleFormSubmit)

/* event listners */

/* main code */
document.addEventListener("DOMContentLoaded", function () {
  addDefaultValuesToInputs(popup)
})

for (let i = 0; i < initialCards.length; i++) {
  addNewItem(initialCards[i].name, initialCards[i].link)
}
