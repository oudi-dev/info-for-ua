const { google } = require('googleapis')
const config = require('../config')

const GOOGLE_KEY_JSON = process.env.GOOGLE_KEY_JSON
const { spreadsheetId, range, valueInputOption, majorDimension, resource } =
  config.defaultGetSettings

class GoogleSheetsAPI {
  constructor() {
    if (!GOOGLE_KEY_JSON) {
      throw new Error('GOOGLE_KEY_JSON is not defined in environment variables')
    }
    this.auth = google.auth.fromJSON(JSON.parse(GOOGLE_KEY_JSON))
    this.auth.scopes = ['https://www.googleapis.com/auth/spreadsheets']
  }

  async publishRow(values) {
    return google.sheets('v4').spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption,
      resource: {
        ...resource,
        values: values,
      },
      auth: this.auth,
    })
  }

  async getRows(sheetName) {
    return google.sheets('v4').spreadsheets.values.get({
      spreadsheetId,
      range: sheetName,
      majorDimension,
      auth: this.auth,
    })
  }

  async getSheets() {
    return google.sheets('v4').spreadsheets.get({
      spreadsheetId,
      auth: this.auth,
    })
  }
}

module.exports = new GoogleSheetsAPI()
