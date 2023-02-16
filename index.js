const buttonAdd = document.querySelector(".button.profile__button-add")

buttonAdd.addEventListener("click", function () {
  document.querySelector(".popup").classList.add("popup_opened")
})

const buttonPopupClose = document.querySelector(".button.popup__button-close")

buttonPopupClose.addEventListener("click", function () {
  const popup = document.querySelector(".popup")
  if (popup.classList.contains("popup_opened")) {
    popup.classList.remove("popup_opened")
  } else {
    alert("class popup_opened not found")
  }
})

const buttonsLikes = document.querySelectorAll(".button.elements__button-like")

buttonsLikes.forEach(function (button) {
  button.addEventListener("click", function (event) {
    if (event.target.classList.contains("elements__button-like_active")) {
      event.target.classList.remove("elements__button-like_active")
    } else {
      event.target.classList.add("elements__button-like_active")
    }
  })
})
