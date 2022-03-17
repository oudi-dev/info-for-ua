const { google } = require('googleapis')
const config = require('../config')

// How to create a Google_Key_JSON: https://stackoverflow.com/a/49965912
const GOOGLE_KEY_JSON = JSON.stringify({
  type: 'service_account',
  project_id: 'info-for-ua',
  private_key_id: '3dadf560c378f63d618ab5f05484d2cf7b5e8fa0',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQD295vLjYs/m5oR\n1l5XqAvOLCO74GrLxsq5eRqc6k29PexTEeuudEzCq3+Qy/jkoNywFaYdmhjGJ/Bw\n3IwDPv6gcv+lVsVow2MSCX4wjwV3OMLNIRwkL7wuKc1vF3jIdVWiVC1HBOuOcWyo\nMs89eDy5mEhu80ztrygIXpnnzxqAfCEmMapDo1ZRY427YqkAGgA3Mvx96sSi0Atr\ntsrBYGz1+0hT7D1Bn/+P4bgQkyxVfJHQKCJkBBF4t31u00510q8eqq+fuzbP/5sx\nhaS4Ibw9+e0/PXUf8MlkP0WuYrmeGcfs5wdZDSfkZ0z54FSfEGV1VOZ5rCUNJ1yJ\ntk+UBXlHAgMBAAECggEAce3OEDwOxdwpWhszUGq0b3sLTQt9GN5u/NryPPsVu7xK\nPhQhTkxWcOOeqJSAEDBpPk3uYO+KiDc6g0YqzQCNhEUozARYczjXhiWc8he4ZMRp\nkSm6CrN+sykTnTENxiPiykzcyktpwz9t6bXuxqOmF9Q5bf2NOoS4CgxiIX738dbp\nisRqzMaQNWyrZ47iQGt5XQfpJbefz80GLwU5t2RKYqDkCtfVdSwPw2UaFM8IHPq/\niiyT8GgnsfHE6RTBqaVzfphsF+531P107IvCas3sqpB2OpRLMRfEIs/yl/UhjdyH\nY5MoyE+FlWGPjzz797xdgOAeZ+gy4BObNa7pt6wyKQKBgQD/eAsitGDiuaRe0wid\nTWqpSGxasJdhWf0vmAznBV1F+3dlna5JBFFKk//1AEERgc1uUGbatcUW5kVsFIcl\nHxXCkD+Cqx7actoV7m5rGjrfhB3N2mllY4FBd6jI8ZgflYOEzsrGKNf3o9nFQrde\n6QRBpd84Up9SbUgtWpeNOgaRWwKBgQD3ewplPSnWIUUF593cqHeF8LzxkdfOwnyx\nXrtEa5zZVxJjm4LNIt4Hkp09BdzA4DV2ujj6Af1NsFlefljFmI4wunNiIPwL29pS\nIFwEElP2fRqdc0CvdOBpARH3ZBiRFVjNbQ6tmDiGje/OJFYSwdtbL64L573OJJAg\n8GzcUzjvhQKBgDALPmTfcV0SNpRSscsLdSSy5xXDIiT/zHq36K1Ft/3iRdkJZ255\n7mPNI5TK4HHPbHfzjPRSvOcKlUG3NpdHmksF37vOPLYuZU88kO15eFryuLwu+CVG\nKlfKjiaEMOy3rI08aqwLoFoFKX5MhrnFrrQ94pXwC+BvhuRophm8MOIDAoGBAOOS\nkG+iO9t9goQ4wIrNnANd6dFWJJYrwBA2pYv4TSaK7A0OjsxmWLer+c2Im4P9aQyB\nmC1GMREErlm3Y5hofbCPc9TzsfKRvAQzX4oa9HzAc/3/Yqc1mbrVUhklQXYApEVb\nGNlHFgudb7wnK8NZ4oXKpYirFJ4Af0za6a/9E2klAoGBANO/pPSlSnOmH0YPwUcF\nVtZF/tS2NJWsQmyZ+YOBcUEUFB6lBWyEnuKEnayQLr4Qt1rHFUvRiQN2Ng+oljcQ\npP9IEIk5vV8PYDqTZVl9ge6CwIDSyZ4Wps9IzYl1P95ALFFQ82yrflkPhJ0Oqrj6\nf0qmWZSs73Qsk2n0XvSqAGKW\n-----END PRIVATE KEY-----\n',
  client_email: 'info-for-ua@info-for-ua.iam.gserviceaccount.com',
  client_id: '117516679788763047331',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/info-for-ua%40info-for-ua.iam.gserviceaccount.com',
})
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
