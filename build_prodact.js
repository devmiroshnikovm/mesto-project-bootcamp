const fs = require("fs")
const path = require("path")

const getAllFiles = function (dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join("@import url(../" + dirPath, "/", file + ");"))
    }
  })

  return arrayOfFiles
}

const arrayOfFiles = getAllFiles("./blocks") //read subdirectoiers
const filePath = "./pages/index.css" //path to write

const normalize = "@import url(../vendor/normalize.css);"
const fonts = "\n@import url(../vendor/fonts/fonts.css);\n"

const dev = "\n* {\n  outline: 1px solid yellowgreen;\n}\n\n::-webkit-scrollbar {\n  height: 10px;\n  width: 10px;\n  background: gray;\n}\n::-webkit-scrollbar-thumb:horizontal {\n  background: red;\n  border-radius: 10px;\n}"

fs.writeFileSync(filePath, normalize + fonts + arrayOfFiles.join("\n"))
