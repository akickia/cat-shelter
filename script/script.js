let catContainer = document.querySelector(".cat_box")

function getCats() {
  fetch('http://localhost:8000/api/allcats')
  .then((res)=> res.json())
  .then((data) => {
    generateCats(data)
  })
}

getCats()

function generateCats(data) {
  const catList = data.allcats
  catList.forEach(cat => {
    let catCard = document.createElement('div')
    catCard.innerHTML = `
    <h2>${cat.name}</h2>
    <img src=${cat.img}>
    <p>Sex: ${cat.sex} </p>
    `
    let btns = document.createElement('section')
    let infoBtn = document.createElement('button')
    infoBtn.innerHTML = "More info"
    btns.appendChild(infoBtn)
    let adoptBtn = document.createElement('button')
    adoptBtn.innerHTML = "Adopt me"
    btns.appendChild(adoptBtn)
    catContainer.appendChild(catCard)
    catCard.appendChild(btns)
  });
}

let adminValue = localStorage.getItem("value")
console.log(adminValue)

