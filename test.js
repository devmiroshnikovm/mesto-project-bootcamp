const test = true

function testFunction(bool) {
  if (bool === "append") {
    console.log("test")
  } else if (bool === false) {
    console.log("! test")
  } else {
    console.log("error")
  }
}

testFunction("append")
