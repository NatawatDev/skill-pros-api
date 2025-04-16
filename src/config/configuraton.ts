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
  },
  frontend: {
    url: process.env.FRONTEND_URL
  },
  aws: {
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    region:process.env.AWS_REGION,
    bucketName:process.env.AWS_S3_BUCKET
  }
})