const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const basicAuth = require('express-basic-auth')
const GoogleSheetsAPISingleton = require('./api/GoogleSheetsAPI')

const { basicAuthSettings, appUrl } = require('./config')

const app = express()

app.use(logger('dev'))
console.log(appUrl)

app.use(
  cors({
    origin: appUrl,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../build')))

// app
//   .use('/sheets', basicAuth(basicAuthSettings), googleSheetsRouter)

app.get('/getdata', async function (req, res) {
  try {
    const sheetName = req.headers.sheet
    const response = await GoogleSheetsAPISingleton.getRows(sheetName)
    res.status(200).json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: `Google Spreadsheet Api failed with exception: ${error.message}`,
    })
  }
})

app.get('/sheets', async function (req, res) {
  try {
    const response = await GoogleSheetsAPISingleton.getSheets()
    res.status(200).json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: `Google Spreadsheet Api: SHEETS failed with exception: ${error.message}`,
    })
  }
})

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

module.exports = app
