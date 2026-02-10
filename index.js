require('dotenv').config()
const express = require('express')
const cors = require('cors') 
const bfhlRoute = require('./routes/bfhl.js')

const app = express()

app.use(cors()) 
app.use(express.json())

app.use('/', bfhlRoute)

app.use((err, req, res, next) => {
  console.error(err) 
  res.status(500).json({
    is_success: false,
    official_email: process.env.OFFICIAL_EMAIL,
    error: 'Internal Server Error'
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})