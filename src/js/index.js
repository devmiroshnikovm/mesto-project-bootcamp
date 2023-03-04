/* webpack */
import "./../pages/index.css" // добавьте импорт главного файла стилей
import "./../index.html"
/* webpack */

import { initialCards } from "./initialcards.js"
import { enableValidation } from "./validate.js"
import { createCard } from "./card.js"
import { openPopup, closePopup } from "./modal.js"

/* variables */

const profileName = document.querySelector(".profile__title")
const profileProfession = document.querySelector(".profile__subtitle")

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
  openPopup(popupIncreaseImage)
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
    //обнуляем сразу всю форму
    event.target.reset()
  }
}
/* functions */

/* event listners */
buttonProfilePopup.addEventListener("click", () => {
  openPopup(popupProfile)
})
buttonNewItemPopup.addEventListener("click", () => {
  // TODO test
  //nameInputNewItemPopup.value = "test_item"
  //linkInputNewItemPopup.value = "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
  // TODO test
  openPopup(popupNewItem)
})

formElementProfilePopup.addEventListener("submit", handleProfileFormSubmit)
formElementNewItemPopup.addEventListener("submit", handleNewItemFormSubmi)
/* event listners */

/* main code */
fillDefaultsInProfileInputs(popupProfile)

initialCards.forEach((card) => {
  addNewCardAfter(card)
})

enableValidation(configValidation)
/* main code */
