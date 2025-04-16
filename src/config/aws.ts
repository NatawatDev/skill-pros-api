import AWS from 'aws-sdk'
import configuration from './configuraton'

const config = configuration()

AWS.config.update({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: config.aws.region,
})

export const s3 = new AWS.S3()
