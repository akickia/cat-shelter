let loginContainer = document.querySelector(".login_box")
let loginBtn = document.getElementById("admin-login")
let success = false
let data
let adminOK = document.querySelector("header h1")

loginBtn.addEventListener("click", () => {
  loginBtn.style.display = "none"
  console.log("clicked")
  let userInput = document.createElement("input")
  let pwInput = document.createElement("input")
  pwInput.setAttribute("type", "password")
  let checkBtn = document.createElement("button")
  checkBtn.innerHTML = "Check"
  let uservalue
  userInput.addEventListener("keyup", (e) => {
    uservalue = e.target.value
    return uservalue
})
  pwInput.addEventListener("keyup", (e) => {
    pwValue = e.target.value
    return pwValue
  })
checkBtn.addEventListener("click", () => {
  getAdmin().then(result => {
    checkAdmin(result, uservalue, pwValue)
    adminRights(success)
  })
  
})
  loginContainer.appendChild(userInput)
  loginContainer.appendChild(pwInput)
  loginContainer.appendChild(checkBtn)
})

async function getAdmin() {
  try {
    let data = await fetch("./serverStuff/admin.json");
    data = await data.json()
    let result = data
    if (result[0].adminRights)
    {
      return result
    }
  }
  catch (error) {
    console.log(error)
  }
}

function checkAdmin(data, userValue, pwValue) {
  if ((data[0].user === userValue) && (data[0].password === pwValue)) {
    success = true
  }
  else {
    console.log("NO")
    success = false
  }
  return success
}

function checkPassword(data, value) {
  if (data[0].password === value) {
    console.log("yes")
    return success = true
  }
  else {
    console.log("NO")
    return success = false
  }
}

function adminRights(success) {
  if (success) {
    console.log("Admin rights granted")
    adminOK.innerHTML = '<a href="pages/admin.html" target:"_blank">ADMINISTRATE</a>'
    
    localStorage.setItem("value", success)
  }
  else {
    console.log("No access to admin rights")
  }
  loginContainer.innerHTML = ""
  loginBtn.style.display = "block"
  loginContainer.appendChild(loginBtn)

}




