let catContainer = document.querySelector(".cat_box")


function getCats() {
  fetch('http://localhost:8000/api/allcats')
  .then((res)=> res.json())
  .then((data) => {
    generateCats(data)
  })
  console.log("fetched")
}

getCats()

//GenerateFunctions
function generateCats(data) {
  const catList = data.allcats
  catList.forEach(cat => {
    let catCard = document.createElement('div')
    catCard.innerHTML = `
    <h2>${cat.name}</h2>
    <img src=${cat.img}>
    <p>Sex: ${cat.sex} </p>
    `
    //Create Buttons
    let btns = document.createElement('section')
    btns.setAttribute("class", "btns")
    let updateBtn = document.createElement('button')
    updateBtn.innerHTML = "Update"
    btns.appendChild(updateBtn)
    let removeBtn = document.createElement('button')
    removeBtn.innerHTML = "Remove"
    removeBtn.setAttribute("class", cat._id)
    btns.appendChild(removeBtn)
    
    //Eventlistener Buttons
    updateBtn.addEventListener("click", (e) => {
      btns.innerHTML = ""
      let updateBtn = document.createElement('button')
      updateBtn.innerHTML = "Update"
      updateBtn.setAttribute("class", cat._id)
      btns.appendChild(updateBtn)
      let removeBtn = document.createElement('button')
      removeBtn.innerHTML = "Remove"
      btns.appendChild(removeBtn)
      createInput(cat, btns)
    })
    removeBtn.addEventListener("click", (e) => {
      let id = e.target.className
      removeCat(id)
      // getCats()
    })
    catContainer.appendChild(catCard)
    catCard.appendChild(btns)
  });
}


//RemoveFunction
async function removeCat(id) {
  let isSure = confirm("Are you sure you want to delete?");
  if (isSure) {
  const remove = {
    id: id,
  }
  await fetch('http://localhost:8000/api/deletecat', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(remove)
  })}
}

//EditFunctions
function createInput(cat, btns) {
  let changeType = document.createElement('select')
  changeType.innerHTML = `<option value="">What do you want to update?</option>
  <option>name</option>
  <option>age</option>
  <option>sex</option>`
  changeType.setAttribute("value", "change this")
  btns.appendChild(changeType)
  let typeValue
  let valueValue
  changeType.addEventListener("change", (e) => {
    typeValue = e.target.value
  })
  let changeValue = document.createElement('input')
  changeValue.setAttribute("placeholder", "new value")
  btns.appendChild(changeValue)
  changeValue.addEventListener("keyup", (e) => {
    valueValue = e.target.value
  })
  let saveBtn = document.createElement('button')
  saveBtn.setAttribute("id", cat._id)
  saveBtn.innerHTML = "Save changes"
  btns.appendChild(saveBtn)
  saveBtn.addEventListener("click", (e) => {
    let id = e.target.id
    editCat(id, typeValue, valueValue)
  })
}
async function editCat(id, type, value) {
  const update = {
    id: id,
    whatToUpdate: type,
    updateTo: value
  }
  let response = await fetch('http://localhost:8000/api/updatecat', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(update)
  })
  response = await response.json()
  if (response.message) {
    alert(response.message)
    catContainer.innerHTML = ""
    getCats()
  }
}



