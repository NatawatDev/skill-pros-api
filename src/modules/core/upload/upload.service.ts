import { s3 } from '@/config/aws'
import confinguration from '@/config/configuraton'

const config = confinguration()

const awsBucketName: string = config.aws.bucketName ?? '';

function generateName(originalName: string): string {
  const nameArray = originalName.split('.')
  const base = nameArray[0].replace(/\s/g, '')
  const ext = nameArray[nameArray.length - 1]
  return `${base}_${Date.now()}.${ext}`
}

export const uploadToS3 = async (file: Express.Multer.File, folder: string) => {
  const fileName = generateName(file.originalname)
  const key = `${folder}/${fileName}`

  const result = await s3
    .upload({
      Bucket: awsBucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    })
    .promise()

  return result.Location
}
