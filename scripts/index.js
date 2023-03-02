import { initialCards } from "./initialcards.js"
import { enableValidation } from "./validate.js"
import { createCard } from "./card.js"
import { openPopup, closePopup } from "./modal.js"

/* variables */

const buttonEditProfile = document.querySelector(".button.profile__button-edit")
const buttonAddContent = document.querySelector(".profile__button-add")
const closeButtons = document.querySelectorAll(".popup__button-close")

const profileName = document.querySelector(".profile__title")
const profileProfession = document.querySelector(".profile__subtitle")

//popup - edit profile
const profilePopup = document.querySelector(".popup_type_profile")
const formElementProfilePopup = document.forms["edit-profile"]
const nameInputProfilePopup = formElementProfilePopup.querySelector('input.form__item[name="name"]')
const jobInputProfilePopup = formElementProfilePopup.querySelector('input.form__item[name="job"]')
//popup - edit profile

//popup - add new item
const newItemPopup = document.querySelector(".popup_type_new-item")
const formElementNewItemPopup = document.forms["new-item"]
const nameInputNewItemPopup = formElementNewItemPopup.querySelector('input.form__item[name="image_name"]')
const linkInputNewItemPopup = formElementNewItemPopup.querySelector('input.form__item[name="link"]')
//popup - add new item

//popup - increase screen image
const increaseImagePopup = document.querySelector(".popup_type_image")
const imgIncreaseImagePopup = increaseImagePopup.querySelector(".elements__img_size_large")
const nameIncreaseImagePopup = increaseImagePopup.querySelector(".elements__title_place_popup")
//popup - increase screen image

//add items
const elementSelector = document.querySelector(".elements") // find element to append

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

function addNewCardAfter(card) {
  const newItem = createCard(card, handleCardClick)
  elementSelector.append(newItem)
}

function addNewCardBefore(card) {
  const newItem = createCard(card, handleCardClick)
  elementSelector.prepend(newItem)
}

function handleCardClick({ name, link }) {
  nameIncreaseImagePopup.textContent = name
  imgIncreaseImagePopup.setAttribute("src", link)
  imgIncreaseImagePopup.setAttribute("alt", name)
  increaseImagePopup.classList.add("popup_opened")
}

function handleProfileFormSubmit(event) {
  event.preventDefault()
  profileName.textContent = nameInputProfilePopup.value
  profileProfession.textContent = jobInputProfilePopup.value
  hideClosestPopup(event)
}

function handleNewItemFormSubmi(event) {
  event.preventDefault()
  const card = {
    name: nameInputNewItemPopup.value,
    link: linkInputNewItemPopup.value,
  }
  // если в input есть что-то
  if (card.name && card.link) {
    addNewCardBefore(card)
    hideClosestPopup(event)
    //обнулить после submit inputs
    nameInputNewItemPopup.value = null
    linkInputNewItemPopup.value = null
  }
}
/* functions */

/* event listners */
buttonEditProfile.addEventListener("click", () => {
  openPopup(profilePopup)
})
buttonAddContent.addEventListener("click", () => {
  // TODO test
  //nameInputNewItemPopup.value = "test_item"
  //linkInputNewItemPopup.value = "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
  // TODO test
  openPopup(newItemPopup)
})

closeButtons.forEach((button) => {
  const popup = button.closest(".popup")
  button.addEventListener("click", () => {
    closePopup(popup)
  })
})

formElementProfilePopup.addEventListener("submit", handleProfileFormSubmit)
formElementNewItemPopup.addEventListener("submit", handleNewItemFormSubmi)
/* event listners */

/* main code */
fillDefaultsInProfileInputs(profilePopup)

initialCards.forEach((card) => {
  addNewCardAfter(card)
})

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__item_type_error",
  errorClass: "form__item_type_error",
})
// обработчики закрытий popup в отдельном модуле modal.js

/* main code */
