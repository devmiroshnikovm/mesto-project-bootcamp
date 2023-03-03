const itemTemplate = document.querySelector("#item-template").content // document fragment
const cardItemInTemplate = itemTemplate.querySelector(".elements__item") // div

function removeItem(item) {
  item.remove()
}

function handleLikeButton(button) {
  button.classList.toggle("elements__button-like_active")
}

export const createCard = (item, handleCardClick) => {
  // клонируем содержимое тега template
  const cardElement = cardItemInTemplate.cloneNode(true)

  // наполняем содержимым:
  // 1. ищем в template нужные html элементы
  const titleCard = cardElement.querySelector(".elements__title")
  const imageCard = cardElement.querySelector(".elements__img")
  const buttonTrashCard = cardElement.querySelector(".elements__button-trash")
  const buttonLikeCard = cardElement.querySelector(".elements__button-like")

  // 2. заполняем cardElement (карточку)
  titleCard.textContent = item.name
  imageCard.src = item.link
  imageCard.alt = item.name

  // 3. добавляем listners
  buttonTrashCard.addEventListener("click", () => {
    removeItem(cardElement)
  })

  buttonLikeCard.addEventListener("click", () => {
    handleLikeButton(buttonLikeCard)
  })

  imageCard.addEventListener("click", () => {
    handleCardClick(item)
  })

  return cardElement
}
