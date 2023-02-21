function addSong(artistValue, titleValue) {
  const trackContainer = document.createElement("div")
  trackContainer.classList.add("song")

  artistElement = document.createElement("h4")
  artistElement.classList.add("song__artist")
  artistElement.textContent = artistValue

  songsContainer.insertAdjacentHTML(
    "beforeend",
    `
      <div class="song">
        <h4 class="song__artist">${artistValue}</h4>
        <p class="song__title">${titleValue}</p>
        <button class="song__like"></button>
      </div>
    `
  )
}

// выбрали элемент
const listItem = document.querySelector("li")

// удалили
listItem.remove()

//closest. Он возвращает ближайший родительский элемент с переданным селектором.

const userTemplate = document.querySelector("#user").content
const usersOnline = document.querySelector(".users-online")

// клонируем содержимое тега template
const userElement = userTemplate.querySelector(".user").cloneNode(true)

// наполняем содержимым
userElement.querySelector(".user__avatar").src = "tinyurl.com/v4pfzwy"
userElement.querySelector(".user__name").textContent = "Дюк Корморант"

// отображаем на странице
usersOnline.append(userElement)

/*
    <template id="song-template">
        <div class="song">
  <h4 class="song__artist"></h4>
  <p class="song__title"></p>
  <button class="song__like"></button>
</div>
    </template>

    */
