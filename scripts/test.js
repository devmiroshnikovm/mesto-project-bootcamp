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
const formElement = document.querySelector(".form")
const formInput = formElement.querySelector(".form__input")
const formError = formElement.querySelector(`.${formInput.id}-error`)

// Передадим текст ошибки вторым параметром
const showInputError = (element, errorMessage) => {
  element.classList.add("form__input_type_error")
  // Заменим содержимое span с ошибкой на переданный параметр
  formError.textContent = errorMessage
  formError.classList.add("form__input-error_active")
}

const hideInputError = (element) => {
  element.classList.remove("form__input_type_error")
  formError.classList.remove("form__input-error_active")
  // Очистим ошибку
  formError.textContent = ""
}

const isValid = () => {
  if (!formInput.validity.valid) {
    // Передадим сообщение об ошибке вторым аргументом
    showInputError(formInput, formInput.validationMessage)
  } else {
    hideInputError(formInput)
  }
}

// Остальной код такой же

// Функция isValid теперь принимает formElement и inputElement,
// а не берёт их из внешней области видимости

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage)
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement)
  }
}

const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  // Остальной код такой же
  inputElement.classList.add("form__input_type_error")
  errorElement.textContent = errorMessage
  errorElement.classList.add("form__input-error_active")
}

const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  // Остальной код такой же
  inputElement.classList.remove("form__input_type_error")
  errorElement.classList.remove("form__input-error_active")
  errorElement.textContent = ""
}

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(".form__input"))

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement)
    })
  })
}

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(".form"))

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement)
  })
}

// Вызовем функцию
enableValidation()
