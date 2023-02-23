// Cards

const renderElements = () => {
  const names = document.querySelectorAll(".element__title")
  const namesArray = Array.from(names)
  const images = document.querySelectorAll(".element__image")
  const imagesArray = Array.from(images)

  namesArray.forEach((name) => {
    for (i = 0; i <= namesArray.indexOf(name); i++) {
      name.textContent = initialCards[i].name
    }
  })

  imagesArray.forEach((image) => {
    for (i = 0; i <= imagesArray.indexOf(image); i++) {
      image.src = initialCards[i].link
    }
  })
}
renderElements()
// Item modal
const addButton = document.querySelector(".profile__add-button")
const closeItemModalButton = document.querySelector("#item-popup-cross")
const itemModal = document.querySelector("#item-popup")
const itemModalName = document.querySelector("#item-popup-input-name")
const itemModalLink = document.querySelector("#item-popup-input-link")
const itemModalSubmit = document.querySelector("#item-popup-button")
const elementTemplate = document.querySelector("#element-template").content
const elementsSection = document.querySelector(".elements")

addButton.addEventListener("click", () => {
  itemModal.classList.add("popup_opened")
})

closeItemModalButton.addEventListener("click", () => {
  itemModal.classList.remove("popup_opened")
})

const handleItemFormSubmit = (evt) => {
  evt.preventDefault()
  const itemModalNameValue = itemModalName.value
  const itemModalLinkValue = itemModalLink.value

  const newItem = {
    name: itemModalNameValue,
    link: itemModalLinkValue,
  }
  initialCards.unshift(newItem)
  itemModal.classList.remove("popup_opened")
  itemModalName.value = ""
  itemModalLink.value = ""

  elementsSection.append(
    elementTemplate.querySelector(".element").cloneNode(true)
    // ты копируешь template но listners не копируется
    // addListnerToLikeButton(кнопка из template .querySelector(".elements__button-like")))
  )
  renderElements()
}

itemModalSubmit.addEventListener("click", handleItemFormSubmit)

// Like button toggle
const likeButtons = document.querySelectorAll(".element__like-button")

// при открытии окна браузера когда загрузится cтраница ты вешаешь listners на кнопки лайк
// - у тебя их столько сколько карточек по умолчанию
// далее ты добавляешь новый элемент через форму и template
// но как я говорил при cloneNode listners не копируются
// соответственно
// на всех изначальных карточках like работает
// на вновь загруженных - нет

for (let i = 0; i < likeButtons.length; i++) {
  // NodeList.forEach() у него уже есть встроенный метод
  likeButtons[i].addEventListener("click", () => {
    likeButtons[i].classList.toggle("element__like-button_active")
  })
}

// тебе  listner надо вешать 2 раза
// 1 раз при загрузке страницы
// 2 раз при отправке формы
// соответственно код с listner можно положить в функцию, чтобы его переиспользовать
// что-то типа такого

function addListnerToLikeButton(_button) {
  _button.addEventListener("click", (evt) => {
    evt.target.classList.add("element__like-button_active")
    //
  })
}
