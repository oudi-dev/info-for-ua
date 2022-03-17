const app = require('./app.js')
const axios = require('axios')
const config = require('./config')

try {
  const signals = ['SIGTERM', 'SIGINT', 'SIGHUP']

  if (config.NO_SLEEP_HEROKU) {
    setInterval(() => {
      config.appUrl && axios.get(config.appUrl)
    }, 1000 * 60 * 15)
  }

  if (process.env.NODE_ENV === 'production') {
    app.enable('trust proxy')
    app.use((req, res, next) => {
      req.secure
        ? next()
        : res.redirect('https://' + req.headers.host + req.url)
    })
  }

  const server = app.listen(config.PORT, () => {
    console.info(`Server is started on PORT:${config.PORT}`)
  })

  signals.forEach((signal) => {
    process.on(signal, () => {
      console.info(`Received ${signal}, shutting down...`)
      server.close(() => {
        console.info('Closed all connections, process terminates.')
        process.exit(0)
      })
    })
  })

  process.on('uncaughtException', (err) => {
    console.error(err)
    process.exit(1)
  })

  process.on('unhandledRejection', (reason, p) => {
    console.error({ message: `Unhandled rejection`, reason, at: p })
    process.exit(1)
  })
} catch (e) {
  console.error({ message: `Bootstrap exception`, reason: e.message })
  process.exit(1)
}
