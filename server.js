//install express: npm install express > create project: npm init > foloow terminal instruction 
// install nodemon > nodemon server.js
// install body parser: npm install body-parser > const bodyParser = require('body-parser') : it help to parse bod and give data as ann object
students = [
    { _id:1,
      firstName: 'Asab',
      lastName: 'Yeta',
      age: 250,
      country: 'Finland',
      skills: ['HTML', 'CSS', 'JS', 'React']
    },
    { 
      _id:2,
      firstName: 'Atik',
      lastName: 'Rhaman',
      age: 25,
      country: 'Finland',
      skills: ['HTML', 'CSS', 'JS', 'React', 'Redux', 'Node']
    },
    { 
      _id:03,
      firstName: 'Bibek',
      lastName: 'Dhakal',
      age: 21,
      country: 'Finland',
      skills: ['HTML', 'CSS', 'JS', 'React', 'MongoDB']
    },
    {
      _id:04,
      firstName: 'Arthur',
      lastName: 'Arthur',
      age: 25,
      country: 'Finland',
      skills: ['HTML', 'CSS', 'JS', 'React', 'Redux']
    }
  ]
const express = require('express')
const fs = require('fs')
const os = require('os')
const { showDateTime } = require('./my_modules/my_modules.js')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
//const students = require('./my_modules/students') why cannot find length of students array when i import it 

const app = express()

// CRUD OPERATION
// CRUD C:CREATE, R: READ, U: UPDATE, D: DELETE
// GET: IS READING
//POST: CREATING
// PUT: UPDATING
//DELET : DELETING

//Middle ware: it run anytimme when page load
app.use( (req,res,next) => {
// folowwing code doesnt work out side(page =req.url) becase id doesnnt have accesss to 'req'
// thats why we are using app.use(callback function)
const user=os.hostname
const page =req.url
const date = showDateTime()
const content = `${user} aceess ${page} page on ${date}\n`
fs.appendFile('./views/log.txt',content, (err) => { 
   if(err) throw err
   console.log('content hasbeen saved')
 })
 next()  // act as end in node
})



// serving static file in Express

app.use(express.static('public')) // app.use(express.static('public')): Now, you can load the files that are in the public directory:


// parse application/x-www-form-urlencoded, this part may not needed always
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json: this part normallly needed. it parse body of post request. canbe console inside post request func
app.use(bodyParser.json())



// navigation get method take two parameteres: path and a callback fuction. this call back take two parameter : request and response)
// in express no need to write head/write like in node
app.get('/', ( (req,res)=>{
    let pathname = __dirname + '/views/index.html'
    res.sendFile(pathname)
} ))
app.get('/about', ( (req,res)=>{
    let pathname = __dirname + '/views/about.html'
    res.sendFile(pathname)
} ))
app.get('/contact', ( (req,res)=>{
    let pathname = __dirname + '/views/contact.html'
    res.sendFile(pathname)
} ))
app.get('/text', ( (req,res)=>{
    res.send('some text')
} ))

app.get('/students', ( (req,res)=>{
    console.log('its get')
    res.send(students)
} ))


//=========================     GET   ===============

// getting a student from students by id or firstName
app.get('/students/:id', ( (req, res) => {
    const id= req.params.id 
    const student = students.find(st => st._id == id || st.firstName.toLowerCase() == id.toLowerCase() )
   if(student) {
       res.send(student)
   }
   else {
    res.send('student does not exist ')
   }  
} ))

//=========================   POST   =======================

//post cannot be accessd from browser, so we have to use postman. also can print something on terminal
app.post('/students', (req,res)=> {
    const id = students.length+1
    req.body._id= id  
    students.push(req.body)
    res.send('post: A data has been created')
} )


//===========================   EDIT / UPDATE     ===================
app.put('/students/:id', (req, res) => {
    const id= +req.params.id // anything we get as params is string, convert it to number by adding + at the beginning
    students = students.map ( student => {
    if(student._id == id) {
        req.body.id= id
        return req.body
    }
    return student
   })
})


//=============================    DELET    ===================

app.delete('/students/:id', (req, res) => {
    const id= +req.params.id // anything we get as params is string, convert it to number by adding + at the beginning
    students = students.filter ( student => student._id != id)


})


// listen method take two parameter: port and a callback function
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`)
})
