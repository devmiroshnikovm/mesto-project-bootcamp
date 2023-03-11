const itemTemplate = document.querySelector("#item-template").content // document fragment
const cardItemInTemplate = itemTemplate.querySelector(".elements__item") // div

function removeItem(item) {
  item.remove()
}

export const createCard = (item, userId, handleCardClick, handleLikeButton, handleTrashButton) => {
  // клонируем содержимое тега template
  const cardElement = cardItemInTemplate.cloneNode(true)

  // наполняем содержимым:
  // 1. ищем в template нужные html элементы
  const titleCard = cardElement.querySelector(".elements__title")
  const imageCard = cardElement.querySelector(".elements__img")
  const buttonTrashCard = cardElement.querySelector(".elements__button-trash")
  const buttonLikeCard = cardElement.querySelector(".elements__button-like")
  const countLike = cardElement.querySelector(".elements__like-count")
  const likesInCard = item.likes
  const cardOwner = item.owner._id

  // 2. заполняем cardElement (карточку)
  titleCard.textContent = item.name
  imageCard.src = item.link
  imageCard.alt = item.name

  // 3. добавляем listners
  buttonTrashCard.addEventListener("click", () => {
    handleTrashButton(cardElement, item._id, removeItem)
    //removeItem(cardElement)
  })

  buttonLikeCard.addEventListener("click", async () => {
    handleLikeButton(buttonLikeCard, countLike, item._id)
  })

  imageCard.addEventListener("click", () => {
    handleCardClick({ name: item.name, link: item.link })
  })

  // 4. красим лайки

  likesInCard.forEach((like) => {
    if (like._id === userId) {
      buttonLikeCard.classList.add("elements__button-like_active")
    }
  })

  //проставляем кол-во лайков
  countLike.textContent = likesInCard.length

  // 5. Проверяем кнопку удалить

  if (cardOwner !== userId) {
    buttonTrashCard.disabled = true
    buttonTrashCard.classList.add("elements__button-trash_disabled")
  }
  return cardElement
}
