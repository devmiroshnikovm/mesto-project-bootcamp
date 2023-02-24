import { initialCards } from "./initialcards.js"

/* variables */

const buttonEditProfile = document.querySelector(".button.profile__button-edit")
const buttonAddContent = document.querySelector(".profile__button-add")
const closeButtons = document.querySelectorAll(".popup__button-close")

const profileName = document.querySelector(".profile__title")
const profileProfession = document.querySelector(".profile__subtitle")

//popup - edit profile
const profilePopup = document.querySelector(".popup_type_profile") //edit
const formElementProfilePopup = document.forms["edit-profile"]
const nameInputProfilePopup = formElementProfilePopup.querySelector('input.form__item[name="name"]') //edit
const jobInputProfilePopup = formElementProfilePopup.querySelector('input.form__item[name="job"]') //edit
//popup - edit profile

//popup - add new item
const newItemPopup = document.querySelector(".popup_type_new-item") //edit
const formElementNewItemPopup = document.forms["new-item"]
const nameInputNewItemPopup = formElementNewItemPopup.querySelector('input.form__item[name="image_name"]') //edit
const linkInputNewItemPopup = formElementNewItemPopup.querySelector('input.form__item[name="link"]') //edit
//popup - add new item

//popup - increase screen image
const increaseImagePopup = document.querySelector(".popup_type_image") //edit
const imgIncreaseImagePopup = increaseImagePopup.querySelector(".elements__img_size_large") //edit
const nameIncreaseImagePopup = increaseImagePopup.querySelector(".elements__title_place_popup") //edit
//popup - increase screen image

//add items
const elementSelector = document.querySelector(".elements") // find element to append
const itemTemplate = document.querySelector("#item-template").content //add data from template
const cardItemInTemplate = itemTemplate.querySelector(".elements__item") // card in template

/* variables */

/* functions */

function openPopup(popup) {
  popup.classList.add("popup_opened")
}

function fillProfileInputs() {
  nameInputProfilePopup.value = profileName.textContent
  jobInputProfilePopup.value = profileProfession.textContent
}

function closePopup(popup) {
  popup.classList.remove("popup_opened")
}

function hideClosestPopup(event) {
  const popup = event.target.closest(".popup")
  if (popup.classList.contains("popup_opened")) {
    closePopup(popup)
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
    const currentItem = event.target.closest(".elements__item")
    currentItem.remove()
  })
}

function addListnerToImagesInItems(image) {
  image.addEventListener("click", function (event) {
    nameIncreaseImagePopup.textContent = event.target.closest(".elements__title").textContent //edit
    imgIncreaseImagePopup.setAttribute("src", event.target.getAttribute("src"))
    imgIncreaseImagePopup.setAttribute("alt", event.target.closest(".elements__title").textContent) // нужен ли alt на раскрытую картинку? наверно нет
    increaseImagePopup.classList.add("popup_opened")
  })
}

function handleProfileFormSubmit(evt) {
  // Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault()

  profileName.textContent = nameInputProfilePopup.value
  profileProfession.textContent = jobInputProfilePopup.value

  hideClosestPopup(evt)
}

function handleFormSubmitNewItem(evt) {
  // Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault()

  const card = {
    name: nameInputNewItemPopup.value,
    link: linkInputNewItemPopup.value,
  }

  // если в input есть что-то
  if (card.name && card.link) {
    addNewCard(card, false) //addNewCard(card, orderLast)

    hideClosestPopup(evt)
  } else {
    alert("enter data")
  }
}

function addDefaultValuesToInputs(popup) {
  if (popup) {
    nameInputProfilePopup.value = profileName.textContent
    jobInputProfilePopup.value = profileProfession.textContent
  } else {
    console.log("popup not found")
  }
}

/* functions */

/* event listners */
buttonEditProfile.addEventListener("click", () => openPopup(profilePopup))

buttonAddContent.addEventListener("click", () => {
  // TODO test
  nameInputNewItemPopup.value = "test_item"
  linkInputNewItemPopup.value = "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
  //TODO test
  openPopup(newItemPopup)
})

closeButtons.forEach((button) => {
  const popup = button.closest(".popup")
  button.addEventListener("click", () => {
    closePopup(popup)
  })
})

formElementProfilePopup.addEventListener("submit", handleProfileFormSubmit)
formElementNewItemPopup.addEventListener("submit", handleFormSubmitNewItem)

/* event listners */

/* main code */

fillProfileInputs(profilePopup)

initialCards.forEach((item) => {
  addNewCard(item, true)
})

/* main code */

//
//
//
function addNewCard(card, orderLast) {
  const newItem = createCard(card)

  if (orderLast === true) {
    elementSelector.append(newItem)
  } else {
    elementSelector.prepend(newItem)
  }
}

//
//
//

/*
 const item = {
      name: nameNewItemInput.value,
      link: linkNewItemInput.value
    }
*/

function createCard(item) {
  // клонируем содержимое тега template
  const cardElement = cardItemInTemplate.cloneNode(true)

  // наполняем содержимым

  // ищем в template нужные html элементы
  const titleNewItem = cardElement.querySelector(".elements__title")
  const imageNewItem = cardElement.querySelector(".elements__img")
  const likeButtonNewItem = cardElement.querySelector(".elements__button-like")
  const trashButtonNewItem = cardElement.querySelector(".elements__button-trash")

  // заполняем cardElement
  titleNewItem.textContent = item.name
  imageNewItem.src = item.link
  imageNewItem.alt = item.name //добавляем alt на картинку item
  addListnerToLikeButton(likeButtonNewItem) //cloneNode не копирует listners
  addListnerToTrashButton(trashButtonNewItem)
  addListnerToImagesInItems(imageNewItem)

  return cardElement
}
