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
})