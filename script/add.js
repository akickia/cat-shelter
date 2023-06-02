let nameInput = document.getElementById("name")
let ageInput = document.getElementById("age")
let sexInput = document.getElementById("sex")
let neuteredInput = document.getElementById("neutered")
let imgInput = document.getElementById("img")

  let nameValue 
  nameInput.addEventListener("keyup", (e) => {
    return nameValue = e.target.value
  })
  let ageValue 
  ageInput.addEventListener("change", (e) => {
    return ageValue = e.target.value
  })
  let sexValue 
  sexInput.addEventListener("change", (e) => {
    return sexValue = e.target.value
  })
  let nValue
  neuteredInput.addEventListener("change", (e) => {
    if (e.target.value === "yes") {
      return nValue = true
    } else {
      return nValue = false
    }
  })
  let imgValue 
  imgInput.addEventListener("keyup", (e) => {
    return imgValue = e.target.value
  })

  const submitForm = document.querySelector("form").addEventListener("submit", () => {
    addCat(nameValue, ageValue, imgValue, nValue, sexValue)
  })


  let test = document.querySelector("h1")
  test.addEventListener("click", () => {
    console.log(imgValue, nameValue, ageValue, nValue, sexValue)
  })

async function addCat(nameValue, ageValue, imgValue, nValue, sexValue) {
  const newCat = {
  name: nameValue,
  age: ageValue,
  img: imgValue,
  sex: sexValue,
  neutered: nValue
  }

console.log(newCat)
let response = await fetch('http://localhost:8000/api/addcat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newCat)
})
response = await response.json()
window.location.replace("../pages/admin.html")
}