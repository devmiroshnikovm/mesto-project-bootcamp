nameInputNewItemPopup.addEventListener("keydown", function () {
  console.log("Я возникаю, когда печатают в текстовом поле.")
})

input.addEventListener("keydown", function (evt) {
  // Проверяем, была ли введена цифра
  if (Number.isNaN(Number(evt.key))) {
    // Если пользователь ввёл не цифру, показываем блок с ошибкой
    error.style.display = "block"
  }
})

artistInput.addEventListener("keydown", function (evt) {
  if (evt.key === "Enter") {
    console.log(evt)
  }
})

const button = document.querySelector(".text")
const hint = document.querySelector(".hint")

button.addEventListener("dblclick", function (event) {
  hint.setAttribute(
    "style",
    `position: absolute;
        top: ${event.pageY}px;
        left: ${event.pageX}px;
        display: block;
        background-color: rgba(255, 204, 0, 0.5)`
  )
})

function keyHandler(evt) {
  if (evt.key === "Enter") {
    addSong(artistInput.value, titleInput.value)
  }

  if (evt.key.toLowerCase() === "ё") {
    evt.preventDefault()
  }
}

//делегирование

songsContainer.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("song__like")) {
    evt.target.classList.toggle("song__like_active")
  }
})

checkbox.addEventListener("input", callback)
// Произошло событие input

function setSubmitButtonState(isFormValid) {
  if (isFormValid) {
    addButton.removeAttribute("disabled")
    addButton.classList.remove("input__btn_disabled")
  } else {
    addButton.setAttribute("disabled", true)
    addButton.classList.add("input__btn_disabled")
  }
}

function setSubmitButtonState(isFormValid) {
  if (isFormValid) {
    addButton.removeAttribute("disabled")
    addButton.classList.remove("input__btn_disabled")
  } else {
    addButton.setAttribute("disabled", true)
    addButton.classList.add("input__btn_disabled")
  }
}

form.addEventListener("submit", function (evt) {
  evt.preventDefault()
  addSong(artist.value, title.value)
  artist.value = ""
  title.value = ""
  setSubmitButtonState(false)
})

form.addEventListener("input", function (evt) {
  const isValid = artist.value.length > 0 && title.value.length > 0
  setSubmitButtonState(isValid)
})



///////////////////////////////////

span id "error-username" error-message error-massage_hidden