const express = require('express')
const router = express.Router()

const fibonacci = require('../utils/fibonacci.js')
const prime = require('../utils/prime.js')
const lcm = require('../utils/lcm.js')
const hcf = require('../utils/hcf.js')
const ai = require('../utils/ai.js')

router.get('/health', (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: process.env.OFFICIAL_EMAIL
  })
})

router.post('/bfhl', async (req, res) => {
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

  } catch {
    res.status(500).json({
      is_success: false,
      official_email: process.env.OFFICIAL_EMAIL,
      error: 'Processing error'
    })
  }
})

module.exports = router
