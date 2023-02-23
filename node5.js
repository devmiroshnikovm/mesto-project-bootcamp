// берем любой template
// понимаем что в нем менять
// и вносим это в объект
// пример ниже

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

// берем функцию и прокидываем в нее:
// нужный template ID если <template> несколько
// class в шаблоне который нужно поменять
// obj выше
// НО ТАК КАК LISTNER НА КАЖДЫЙ HTML ЭЛЕМЕНТ ВСЕГДА РАЗНЫЙ, НУЖНО ДОПИСЫВАТЬ ЛОГИКУ СООТВЕТСТВЕННО

function addNewUniqueItem(_itemTemplateID, _itemClassToClone, _functionAddListner, obj) {
  // находим template
  const itemTemplate = document.querySelector("#" + _itemTemplateID).content // #item-template

  // копируем шаблон
  const newItem = itemTemplate.querySelector("." + _itemClassToClone).cloneNode(true) //.elements__item

  // заполняем шаблон из объекта

  for (let i = 0; i < obj.length; i++) {
    if (obj[i].addListnerFlag == true) {
      //add listner
      _functionAddListner(newItem.querySelector(obj[i].class)) //надо менять
    } else if (obj[i].addListnerFlag == false) {
      // заполнить шаблон
      newItem.querySelector(obj[i].class).obj[i].attribute = obj[i].value
    }
  }

  return newItem //итоговый заполненный обьект
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

    addNewUniqueItem("item-template", "elements__item", newObj, [addListnerToLikeButton, addListnerToTrashButton, addListnerToImagesInItems])

    closePopup(evt)
  } else {
    alert("enter data")
  }
}

/////////////

// я сделал вот так
// минусы:
// внутри функции зашиты css классы
// при изменении шаблона или добавлении шаблона эта функция перестанет работать

function addNewItem(_name, _link, _orderLast) {
  // const itemTemplate = document.querySelector("#item-template").content
  // так как template один, каждый раз при вызове функции парсить его не нужно - убираем его в глобальные переменные

  // клонируем содержимое тега template
  const newItem = itemTemplate.querySelector(".elements__item").cloneNode(true)
  // наполняем содержимым
  newItem.querySelector(".elements__title").textContent = _name
  newItem.querySelector(".elements__img").src = _link
  addListnerToLikeButton(newItem.querySelector(".elements__button-like")) //cloneNode не копирует listners
  addListnerToTrashButton(newItem.querySelector(".elements__button-trash")) //cloneNode не копирует listners
  addListnerToImagesInItems(newItem.querySelector(".elements__img")) //cloneNode не копирует listners

  // const elementSelector = document.querySelector(".elements")
  // каждый раз при вызове функции парсить его не нужно - убираем его в глобальные переменные

  // отображаем на странице
  if (_orderLast === true) {
    elementSelector.append(newItem)
  } else if (_orderLast === false) {
    elementSelector.prepend(newItem)
  }
}

// вот как надо переделать с return
function addNewItem(_name, _link) {
  // const itemTemplate = document.querySelector("#item-template").content
  // так как template один, каждый раз при вызове функции парсить его не нужно - убираем его в глобальные переменные

  // клонируем содержимое тега template
  const newItem = itemTemplate.querySelector(".elements__item").cloneNode(true)
  // наполняем содержимым
  newItem.querySelector(".elements__title").textContent = _name
  newItem.querySelector(".elements__img").src = _link
  addListnerToLikeButton(newItem.querySelector(".elements__button-like")) //cloneNode не копирует listners
  addListnerToTrashButton(newItem.querySelector(".elements__button-trash")) //cloneNode не копирует listners
  addListnerToImagesInItems(newItem.querySelector(".elements__img")) //cloneNode не копирует listners

  // const elementSelector = document.querySelector(".elements")
  // каждый раз при вызове функции парсить его не нужно - убираем его в глобальные переменные

  //возвращаем заполненный шаблон
  return newItem
}
