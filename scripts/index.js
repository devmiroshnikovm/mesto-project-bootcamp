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
    const btn = event.target
    console.log(typeof btn) //object
    console.log(Object.getOwnPropertyNames(btn))

    const currentItem = event.target.closest(".elements__item")

    currentItem.remove()
  })
}

function addListnerToImagesInItems(image) {
  image.addEventListener("click", function (event) {
    const name = "default name" //TODO
    // const name = event.target.closest(".elements__title").textContent // null
    // const name = event.target.parentElement.querySelector(".elements__title").textContent //work
    const src = event.target.getAttribute("src")

    nameIncreaseImagePopup.textContent == name

    imgIncreaseImagePopup.setAttribute("src", src)
    imgIncreaseImagePopup.setAttribute("alt", name)
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

    //обнулить после submit inputs
    nameInputNewItemPopup.value = null
    linkInputNewItemPopup.value = null
  } else {
    alert("enter data")
  }
}

function addNewCard(card, orderLast) {
  const newItem = createCard(card)

  if (orderLast === true) {
    elementSelector.append(newItem)
  } else {
    elementSelector.prepend(newItem)
  }
}

// один раз создается функкция, которая открывает картинку
// далее создаются ссылки на одну эту функцию при нажатии на картинку
function handleCardClick({ name, link }) {
  nameIncreaseImagePopup.textContent = name //добавить подпись к картинке
  imgIncreaseImagePopup.setAttribute("src", link)
  imgIncreaseImagePopup.setAttribute("alt", name)
  increaseImagePopup.classList.add("popup_opened") // открыть картинку
}

function createCard(item) {
  const cardName = item.name
  const cardLink = item.link

  // клонируем содержимое тега template
  const cardElement = cardItemInTemplate.cloneNode(true) //cardItemInTemplate - global value

  // наполняем содержимым:
  // 1. ищем в template нужные html элементы
  const titleNewItem = cardElement.querySelector(".elements__title")
  const imageNewItem = cardElement.querySelector(".elements__img")
  const likeButtonNewItem = cardElement.querySelector(".elements__button-like")
  const trashButtonNewItem = cardElement.querySelector(".elements__button-trash")

  // 2. заполняем cardElement (карточку)
  titleNewItem.textContent = cardName
  imageNewItem.src = cardLink
  imageNewItem.alt = cardName

  // применяем делегирование
  //likeButtonNewItem.addEventListener("click", (event) => {
  //    event.target.classList.toggle("elements__button-like_active")
  //})

  trashButtonNewItem.addEventListener("click", (event) => {
    const currentItem = event.target.closest(".elements__item")
    currentItem.remove()
  })

  imageNewItem.addEventListener("click", () => {
    handleCardClick(item)
  })

  return cardElement
}
/* functions */

/* event listners */
buttonEditProfile.addEventListener("click", () => openPopup(profilePopup))

buttonAddContent.addEventListener("click", () => {
  // TODO test
  //nameInputNewItemPopup.value = "test_item"
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

initialCards.forEach((card) => {
  addNewCard(card, true)
})

/* main code */

/*
Так-же можно вынести и колбэки для кнопок лайка и удаления. 
При этом в колбэк можно передавать не событие, 
а в первом случае саму кнопку лайка, у которой только класс активности переключать потом, 
а при удалении передавать сам элемент - карточку, который был создан клоном и тогда ее сразу можно удалять.
*/

//////////////////////////////////////////////////////////////

// применяем делегирование
elementSelector.addEventListener("click", (event) => {
  if (event.target.classList.contains("elements__button-like")) {
    event.target.classList.toggle("elements__button-like_active")
  }
})

////////////
function showError(inputElement, errorMessage) {
  const errorSpanSelector = `#error-${inputElement.id}`
  const errorSpan = document.querySelector(errorSpanSelector)
  errorSpan.textContent = errorMessage
  console.log(errorMessage)
}

function hideError(inputElement) {
  const errorSpanSelector = `#error-${inputElement.id}`
  const errorSpan = document.querySelector(errorSpanSelector)
  errorSpan.textContent = ""
}

function toggleButton() {}

function checkValidity(inputElement) {
  if (inputElement.validity.valid) {
    hideError(inputElement)
  } else {
    showError(inputElement, inputElement.validationMessage)
  }
}

nameInputNewItemPopup.addEventListener("input", () => {
  checkValidity(nameInputNewItemPopup)
})
