const itemTemplate = document.querySelector("#item-template").content //add data from template
const cardItemInTemplate = itemTemplate.querySelector(".elements__item") // card in template

export const createCard = (item, handleCardClick) => {
  const cardName = item.name
  const cardLink = item.link

  // клонируем содержимое тега template
  const cardElement = cardItemInTemplate.cloneNode(true)

  // наполняем содержимым:
  // 1. ищем в template нужные html элементы
  const titleNewItem = cardElement.querySelector(".elements__title")
  const imageNewItem = cardElement.querySelector(".elements__img")
  const trashButtonNewItem = cardElement.querySelector(".elements__button-trash")
  const likeButtonNewItem = cardElement.querySelector(".elements__button-like")

  // 2. заполняем cardElement (карточку)
  titleNewItem.textContent = cardName
  imageNewItem.src = cardLink
  imageNewItem.alt = cardName

  // 3. добавляем listners
  trashButtonNewItem.addEventListener("click", (event) => {
    const currentItem = event.target.closest(".elements__item")
    currentItem.remove()
  })

  likeButtonNewItem.addEventListener("click", (event) => {
    event.target.classList.toggle("elements__button-like_active")
  })

  imageNewItem.addEventListener("click", () => {
    handleCardClick(item)
  })

  return cardElement
}
