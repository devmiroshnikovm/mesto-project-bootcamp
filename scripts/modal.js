export const openPopup = (popup) => {
  popup.classList.add("popup_opened")
}

export const closePopup = (popup) => {
  popup.classList.remove("popup_opened")
}

/* блок обработчиков закрытия popup */
const popupList = document.querySelectorAll(".popup")

function handleClickPopup(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget)
  }
}

popupList.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    handleClickPopup(event)
  })
})

// нужно переделать
// добавлять слушатель при открытии popup
// удалять при закрытии popup

document.addEventListener("keydown", (event) => {
  if (event.code === "Escape") {
    // ищем первый открытый popup - не может же быть два открытых popup одновременно?
    const activePopup = event.currentTarget.querySelector(".popup_opened")
    if (activePopup) {
      activePopup.classList.remove("popup_opened")
    }
  }
})
/* блок обработчиков закрытия popup */
