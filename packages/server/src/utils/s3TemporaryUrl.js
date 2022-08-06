import aws from 'aws-sdk'
/* eslint-disable */
import crypto, { randomBytes } from 'crypto'
import { promisify } from 'util'
import dotenv from 'dotenv'
dotenv.config()

const rBytes = promisify(crypto.randomBytes)
const s3 = new aws.S3({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
})

const getTemporaryUrl = async () => {
  const rawBytes = await rBytes(32)
  const imageName = rawBytes.toString('hex')
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: imageName,
    Expires: 30,
  }
  const url = await s3.getSignedUrlPromise('putObject', params)
  return url
}
export default getTemporaryUrl
