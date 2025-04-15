import app from './app'
import { PostgresDataSource } from './config/data-source'

const PORT = process.env.PORT || 3000

PostgresDataSource.initialize()
  .then(() => {
    console.log('✅ Data Source has been initialized.')
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('❌ Error during Data Source initialization', err)
    process.exit(1)
  })