const express = require('express')
require('dotenv').config()
const cors = require('cors')
const {connect} = require('mongoose')
const app = express()


app.use(express.json())
app.use(cors())

const port = process.env.PORT
const URI = process.env.URI
 
app.use('/user', require('./routes/userRouter'))

// Connect to mongodb


connect(URI, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log("Connected to mongodb")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })