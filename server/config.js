const config = {
  defaultGetSettings: {
    spreadsheetId:
      process.env.SPREADSHEET_ID ||
      '1nKkLuGTQVf7lxAH4nqlVdGG5QILXtKOHElrk5pwNwyc',
    range: 'INFO',
    majorDimension: 'COLUMNS',
  },
  PORT: 3200,
  basicAuthSettings: {
    users: { admin: 'supersecret' },
  },
  appUrl: process.env.REACT_APP_API_SERVER_URL,
  NO_SLEEP_HEROKU: process.env.NO_SLEEP_HEROKU,
}

module.exports = config
