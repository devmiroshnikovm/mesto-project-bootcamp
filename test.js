// ATTENTION CODE SPOLIER

;```
//buttonsLikeList - это list всех кнопок like

function addListnerToLikeButton(button) { 
    button.addEventListener("click", function (event) { // добавить listen
      //сделать что-то по click событию
    })
  }

buttonsLikeList.forEach(addListnerToLikeButton) //в цикле каждой кнопке добавить listner, чтобы потом на событию на конкретный like добавлять что-то


//когда ты методом cloneNode копируешь template он не копирует уже назначенные listners
//соответственно тебе их нужно скопировать заново


  function addNewItem() {
    // клонируем содержимое тега template
    const newItem = itemTemplate.querySelector(".elements__item").cloneNode(true)
    // в фукнцию addListnerToLikeButton прокидываем лайк, который только что скопировали из template
    // addListnerToLikeButton внутри себя создаст listner на этот новый лайк
    addListnerToLikeButton(newItem.querySelector(".elements__button-like")) //cloneNode не копирует listners
  }
  ```

function addNewItem() {
  // const itemTemplate = document.querySelector("#item-template").content
  // так как template один, каждый раз при вызове функции парсить его не нужно - убираем его в глобальные переменные

  // копируем шаблон
  const newItem = itemTemplate.querySelector(".elements__item").cloneNode(true)

  // заполняем шаблон
  newItem.querySelector(".elements__title").textContent = _name
  newItem.querySelector(".elements__img").src = _link

  // вешаем listner
  addListnerToLikeButton(newItem.querySelector(".elements__button-like"))

  // const elementSelector = document.querySelector(".elements") // find element to append
  // каждый раз при вызове функции парсить его не нужно - убираем его в глобальные переменные

  // отображаем на странице
  elementSelector.append(newItem)
}

// если нужно вставлять карточки разного вида

function addNewUniqueItemWithReturn(_itemTemplateID, _itemClassToClone, functionAddListner, ...args) {
  // {"classToEdit": 'value'}
  // находим template
  const itemTemplate = document.querySelector("#" + _itemTemplateID).content // #item-template

  // копируем шаблон
  const newItem = itemTemplate.querySelector("." + _itemClassToClone).cloneNode(true) //.elements__item

  // заполняем шаблон

  /*
  пример
 const args = {
  ".popup_title": dataTitle,
  ".popup_message": {
        value: message,
        addListner: true
  }
};
  */

  for (const classToEditInTemplate in args) {
    newItem.querySelector(classToEditInTemplate).textContent = args[classToEditInTemplate]
  }

  // вешаем listner
  functionAddListner(newItem.querySelector(".elements__button-like")) //addListnerToLikeButton

  // const elementSelector = document.querySelector(".elements") // find element to append
  // каждый раз при вызове функции парсить его не нужно - убираем его в глобальные переменные

  // отображаем на странице
  elementSelector.append(newItem)
}
