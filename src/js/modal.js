const popupList = document.querySelectorAll(".popup")
const closeButtonList = document.querySelectorAll(".popup__button-close")

function handlePopupByEscape(event) {
  if (event.code === "Escape") {
    const popup = document.querySelector(".popup_opened")
    closePopup(popup)
  }
}

export const openPopup = (popup) => {
  popup.classList.add("popup_opened")

  document.addEventListener("keydown", handlePopupByEscape)
}

export const closePopup = (popup) => {
  popup.classList.remove("popup_opened")
  document.removeEventListener("keydown", handlePopupByEscape)
}

function handleOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget)
  }
}

closeButtonList.forEach((button) => {
  const popup = button.closest(".popup")

  button.addEventListener("click", () => {
    closePopup(popup)
  })

  popup.addEventListener("mousedown", handleOverlay)
})
