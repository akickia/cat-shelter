const express = require('express')
const cors = require('cors')
const nedb = require('nedb-promise')
const database = new nedb({filename: 'cats.db', autoload: true})
const app = express()

//För att läsa body som json
app.use(express.json())
app.use(cors())

//Visa alla katter
app.get('/api/allcats', async (req, res) => {
  const allCats = await database.find({})
  res.json({success: true, allcats: allCats})
})

//Lägga till katt
app.post('/api/addcat', (req, res) => {
  const newCat = req.body
  database.insert(newCat)  
  res.send('Cat added')
})
//I body i insomnia: 
// {"name": "Oboy",
// "age": "6",
// "img": "https://images.unsplash.com/photo-1513245543132-31f507417b26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
// "sex": "male",
// "neutered": "true"}

app.post('/api/findcat', async (req, res) => {
  const searchType = req.body.searchType
  const searchValue = req.body.searchValue
  let result = []
  if (searchType == "name") {
    result = await database.find({name: searchValue})}
  else if (searchType == "age") {
    result = await database.find({age: searchValue})}
  else if (searchType == "sex") {
    result = await database.find({sex: searchValue})}
  
  res.send({success: true, catMatch: result})
})
// I body i insomnia:
// {"searchType": "sex", "searchValue": "female"}


app.delete('/api/deletecat', (req, res) => {
  const id = req.body.id
  database.remove({_id: id})
  res.send({message: "Cat deleted"})
})
// I body i insomnia:
// {"id": "5"}

app.put('/api/updatecat', (req, res) => {
  const { id, whatToUpdate, updateTo } = req.body
  if (whatToUpdate === "name") {
    database.update({ _id: id }, {$set: {name: updateTo }})
    res.send({response: database.find({})})
  }
  else if (whatToUpdate === "age") {
    database.update({_id: id}, {$set: {age: updateTo }} )
    res.send({response: database.find({})})
  }
  else if (whatToUpdate === "sex") {
    database.update({_id: id}, {$set: {sex: updateTo }} )
    res.send({response: database.find({})})
  }
  else {
    res.send({message: "You can't change this! "})
  }
})
// I body i insomnia:
// {"id": "2", "whatToUpdate": "name", "updateTo": "Monster"}



//För att lyssna på/starta server
app.listen(8000, () => {
  console.log("Starting server")
})

