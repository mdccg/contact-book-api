import dotenv from 'dotenv'

dotenv.config()

import { app } from './app'
import { connection } from 'mongoose'

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () =>
  console.log(`App running on port ${PORT}`)
)

// https://media.licdn.com/dms/image/C4D22AQG5e9LGG8GF1Q/feedshare-shrink_800/0/1672234265577?e=2147483647&v=beta&t=4iO9sBF5B2Bp4cdsVS1i2dw7Xu0M0a8-1-6tXIMoDng
type OtherSignals = 'beforeExit' | 'disconnect' | 'exit' | 'rejectionHandled' | 'uncaughtException'
  | 'uncaughtExceptionMonitor' | 'unhandledRejection' | 'warning' | 'message' | 'multipleResolves'
  | 'worker'

const events: (NodeJS.Signals | OtherSignals)[] = [
  'exit',
  'SIGINT',
  'SIGUSR1',
  'SIGUSR2',
  // 'uncaughtException',
  'SIGTERM'
]

events.forEach((e) => {
  process.on(e, () => {
    server.close()
    connection.close()
  })
})
