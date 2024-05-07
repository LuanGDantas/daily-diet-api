import 'dotenv/config'
import { app } from './app'

app.listen({
  host: 'RENDER' in process.env ? '0.0.0.0' : 'localhost',
  port: 3003,
})
