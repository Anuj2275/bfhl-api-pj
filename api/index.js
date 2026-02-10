const express = require('express')
const fibonacci = require('../utils/fibonacci.js')
const prime = require('../utils/prime.js')
const lcm = require('../utils/lcm.js')
const hcf = require('../utils/hcf.js')
const ai = require('../utils/ai.js')

const app = express()

app.use(express.json())

app.get('/health', (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: process.env.OFFICIAL_EMAIL
  })
})

app.post('/bfhl', async (req, res) => {
  try {
    const keys = Object.keys(req.body)

    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        official_email: process.env.OFFICIAL_EMAIL,
        error: 'Invalid request format'
      })
    }

    const key = keys[0]
    const value = req.body[key]
    let result

    if (key === 'fibonacci') result = fibonacci(value)
    else if (key === 'prime') result = prime(value)
    else if (key === 'lcm') result = lcm(value)
    else if (key === 'hcf') result = hcf(value)
    else if (key === 'AI') result = await ai(value)
    else {
      return res.status(400).json({
        is_success: false,
        official_email: process.env.OFFICIAL_EMAIL,
        error: 'Invalid key'
      })
    }

    res.status(200).json({
      is_success: true,
      official_email: process.env.OFFICIAL_EMAIL,
      data: result
    })

  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({
      is_success: false,
      official_email: process.env.OFFICIAL_EMAIL,
      error: 'Processing error'
    })
  }
})

app.use((err, req, res, next) => {
  res.status(500).json({
    is_success: false,
    official_email: process.env.OFFICIAL_EMAIL,
    error: 'Internal Server Error'
  })
})

module.exports = app
