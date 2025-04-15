import dotenv from 'dotenv'

dotenv.config()

export default () => ({
  mode: process.env.MODE || 'development',
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  mail: {
    apiKey: process.env.RESEND_API_KEY
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET
  }
})