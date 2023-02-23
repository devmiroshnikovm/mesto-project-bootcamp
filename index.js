import { initialCards } from "./initialcards.js"

/* variables */

const buttonEditProfile = document.querySelector(".button.profile__button-edit")
const buttonPopupEditProfileClose = document.querySelector(".button.popup__button-close")
const buttonAddContent = document.querySelector(".profile__button-add")
const buttonPopupNewItemClose = document.querySelector(".popup__button-close_item_new")
const buttonPopupScaleImageClose = document.querySelector(".popup__button-close_image")

const buttonsLikeList = document.querySelectorAll(".button.elements__button-like")
const buttonsTrashList = document.querySelectorAll(".button.elements__button-trash")

const imagesInItemsList = document.querySelectorAll(".elements__img")

const profileName = document.querySelector(".profile__title")
const profileProfession = document.querySelector(".profile__subtitle")

//popup - edit
const popup = document.querySelector(".popup")
const formElement = popup.querySelector(".form")
const nameInput = formElement.querySelector('input.form__item[name="name"]')
const jobInput = formElement.querySelector('input.form__item[name="job"]')
//popup - edit

//popup - add new item
const popupNewItem = document.querySelector(".popup_item_new")
const formElementNewItem = popupNewItem.querySelector(".form")
const nameNewItemInput = formElementNewItem.querySelector('input.form__item[name="image_name"]')
const linkNewItemInput = formElementNewItem.querySelector('input.form__item[name="link"]')
//popup - add new item

//popup - scale screen image
const popupScaleImage = document.querySelector(".popup_image")
const imgPopupImage = popupScaleImage.querySelector(".elements__img_size_large")
const namePopupImage = popupScaleImage.querySelector(".elements__title_place_popup")
//popup - scale screen image

//add items
const elementSelector = document.querySelector(".elements") // find element to append
const itemTemplate = document.querySelector("#item-template").content //add data from template

// берем любой template
// понимаем что в нем менять
// и вносим это в объект
const objTemplateNewItem = [
  {
    class: ".elements__title",
    value: "_name",
    addListnerFlag: false,
    attribute: "textContent",
  },
  {
    class: ".elements__img",
    value: "_link",
    addListnerFlag: false,
    attribute: "src",
  },
  {
    class: ".elements__button-like",
    addListnerFlag: true,
  },
  {
    class: ".elements__button-trash",
    addListnerFlag: true,
  },
  {
    class: ".elements__img",
    addListnerFlag: true,
  },
]

/* variables */

/* functions */

function openPopup(_popup) {
  _popup.classList.add("popup_opened")
}

function clearPopapInputs() {
  nameInput.value = profileName.textContent
  jobInput.value = profileProfession.textContent
}

function closePopup(_event) {
  const _popup = _event.target.closest(".popup")
  if (_popup.classList.contains("popup_opened")) {
    _popup.classList.remove("popup_opened")
    clearPopapInputs()
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
    //найти ближайший элемент c class elements__item
    let currentItem = event.target.closest(".elements__item")
    currentItem.remove()
  })
}

function addListnerToImagesInItems(image) {
  image.addEventListener("click", function (event) {
    namePopupImage.textContent = event.target.parentElement.querySelector(".elements__title").textContent
    imgPopupImage.setAttribute("src", event.target.getAttribute("src"))
    popupScaleImage.classList.add("popup_opened")
  })
}

function handleFormSubmit(evt) {
  // Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault()

  profileName.textContent = nameInput.value
  profileProfession.textContent = jobInput.value

  console.log("handleFormSubmit")
  closePopup(evt)
}

function handleFormSubmitNewItem(evt) {
  // Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault()

  // если в input есть что-то
  if (nameNewItemInput.value && linkNewItemInput.value) {
    //копируем объект с данными из шаблона в новый объект, чтобы модифицировать его введенными данными из формы

    const newObj = [...objTemplateNewItem]

    //так как метод find возвращает ссылку на основной newObj
    const titleObject = newObj.find((obj) => obj.class === ".elements__title")
    // при изменении titleObject меняется и основной newObj
    titleObject.value = nameNewItemInput.value

    // аналогично
    const imgObject = newObj.find((obj) => obj.class === ".elements__img")
    imgObject.value = linkNewItemInput.value

    // соответственно вот тут получаем обновленный newObj

    const newItemFromTemplate = addNewUniqueItem("item-template", "elements__item", [addListnerToLikeButton, addListnerToTrashButton, addListnerToImagesInItems], newObj)

    elementSelector.prepend(newItemFromTemplate)
    closePopup(evt)
  } else {
    alert("enter data")
  }
}

function addDefaultValuesToInputs(_popup) {
  if (_popup) {
    nameInput.value = profileName.textContent
    jobInput.value = profileProfession.textContent
  } else {
    console.log("popup not found")
  }
}

function addNewItem(_name, _link, _orderLast) {
  // клонируем содержимое тега template
  const newItem = itemTemplate.querySelector(".elements__item").cloneNode(true)
  // наполняем содержимым
  newItem.querySelector(".elements__title").textContent = _name
  newItem.querySelector(".elements__img").src = _link
  addListnerToLikeButton(newItem.querySelector(".elements__button-like")) //cloneNode не копирует listners
  addListnerToTrashButton(newItem.querySelector(".elements__button-trash")) //cloneNode не копирует listners
  addListnerToImagesInItems(newItem.querySelector(".elements__img")) //cloneNode не копирует listners

  // отображаем на странице
  if (_orderLast === true) {
    elementSelector.append(newItem)
  } else if (_orderLast === false) {
    elementSelector.prepend(newItem)
  }
}

/* functions */

/* event listners */
buttonEditProfile.addEventListener("click", () => openPopup(popup))

buttonAddContent.addEventListener("click", () => {
  nameNewItemInput.value = null //обнуляем input value если пользователь не сохранил введенные данные - обнуляем всегда при открытии popup
  linkNewItemInput.value = null //обнуляем input value если пользователь не сохранил введенные данные - обнуляем всегда при открытии popup
  // TODO test
  nameNewItemInput.value = "test_item"
  linkNewItemInput.value = "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
  //TODO test
  openPopup(popupNewItem)
})

buttonPopupEditProfileClose.addEventListener("click", (event) => closePopup(event))
buttonPopupNewItemClose.addEventListener("click", (event) => closePopup(event))
buttonPopupScaleImageClose.addEventListener("click", (event) => closePopup(event))

buttonsLikeList.forEach(addListnerToLikeButton) //add likes
buttonsTrashList.forEach(addListnerToTrashButton) //add trash reaction
imagesInItemsList.forEach(addListnerToImagesInItems) //add image click scale

formElement.addEventListener("submit", handleFormSubmit)
formElementNewItem.addEventListener("submit", handleFormSubmitNewItem)

/* event listners */

/* main code */
addDefaultValuesToInputs(popup)

for (let i = 0; i < initialCards.length; i++) {
  addNewItem(initialCards[i].name, initialCards[i].link, true)
}

// берем функцию и прокидываем в нее:
// нужный template ID если <template> несколько
// class в шаблоне, который нужно поменять
// lisnters на каждый соответствующий элемент. Важна очередность, чтобы нужный listner применился к соответствующему html элементу в шаблоне
// obj с параметрами что нужно менять

function addNewUniqueItem(_itemTemplateID, _itemClassToClone, _functionAddListner, obj) {
  // находим template
  const itemTemplate = document.querySelector("#" + _itemTemplateID).content // #item-template

  // копируем шаблон
  const newItem = itemTemplate.querySelector("." + _itemClassToClone).cloneNode(true) //.elements__item

  // заполняем шаблон

  // в _functionAddListner лежит массив listners, которые навешиваем на скопированные элементы <template>
  // если в объекте 3 свойства, а в массив listners передано 2 - вызовет ошибку
  // нужна строгая очередность передачи listners

  let j = 0
  for (let i = 0; i < obj.length; i++) {
    if (obj[i].addListnerFlag == true) {
      //add listner
      _functionAddListner[j](newItem.querySelector(obj[i].class))
      j = j + 1
    } else if (obj[i].addListnerFlag == false) {
      // заполнить шаблон
      let searchClass = obj[i].class
      let attribute = obj[i].attribute
      let value = obj[i].value

      newItem.querySelector(searchClass)[attribute] = value
    }
  }

  return newItem // return итоговый заполненный обьект
}
