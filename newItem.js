/*
Пример реализации добавления нового item через <template>
*/

//Variant 1

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
// НО ТАК КАК LISTNER НА КАЖДЫЙ HTML ЭЛЕМЕНТ ВСЕГДА РАЗНЫЙ, нужен массов listners с определенной очередностью

function addNewUniqueItem(_itemTemplateID, _itemClassToClone, _functionAddListner, obj) {
  // нужно ли внутренние функции писать с _   _itemTemplateID
  // находим template
  const itemTemplate = document.querySelector("#" + _itemTemplateID).content // #item-template

  // копируем шаблон
  const newItem = itemTemplate.querySelector("." + _itemClassToClone).cloneNode(true) //.elements__item

  // заполняем шаблон

  // в _functionAddListner лежит массив listners, которые навешиваем на скопированные элементы <template>
  // если в объекте 3 свойства, а в массив listners передано 2 - вызовет ошибку - написать проверку
  // нужна строгая очередность передачи listners - и  что делать?

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
function handleFormSubmitNewItem(evt) {
  // Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault()

  // если в input есть что-то
  if (nameNewItemInput.value && linkNewItemInput.value) {
    //копируем объект с данными из шаблона в новый объект, чтобы модифицировать его введенными данными из формы
    // зачем?
    // чтобы в следующий вызов функции addNewUniqueItem объект objTemplateNewItem был новым

    const newObj = [...objTemplateNewItem]

    //так как метод find возвращает ссылку на основной newObj
    const titleObject = newObj.find((obj) => obj.class === ".elements__title")
    // при изменении titleObject меняется и основной newObj
    titleObject.value = nameNewItemInput.value

    // аналогично
    const imgObject = newObj.find((obj) => obj.class === ".elements__img")
    imgObject.value = linkNewItemInput.value

    // соответственно вот тут получаем обновленный newObj
    // что произойдет при завершении вызова функции handleFormSubmitNewItem?
    // newObj и все reference на него удалятся?

    const newItemFromTemplate = addNewUniqueItem("item-template", "elements__item", [addListnerToLikeButton, addListnerToTrashButton, addListnerToImagesInItems], newObj)

    elementSelector.prepend(newItemFromTemplate)
    closePopup(evt)
  } else {
    alert("enter data")
  }
}

//Variant 2

// тут внутри функции обращаемся к <template>
// если <template> изменится функция перестанет работать

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

//PS
//и зачем городить код, на который нужно написать еще кучу проверок?
// если можно написать проще и короче
// ну будет еще один <template> будет еще одна функция


CODE SPOILER

переделал функцию newItem c return

в реальной жизни часто используют <template>?
пишут ли универсальные функции под это?

"или например нужно будет вставлять еще какие-то карточки другого вида"
или под каждую карточку другого вида пишут функцию cloneNode?

