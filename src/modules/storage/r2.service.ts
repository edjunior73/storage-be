import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import {
  R2_ACCESS_KEY_ID,
  R2_ACCOUNT_ID,
  R2_BUCKET_NAME,
  R2_SECRET_ACCESS_KEY,
  R2_URL,
} from '@common/config'
import { Injectable } from '@nestjs/common'
import { uuid } from 'uuidv4'
@Injectable()
export class R2Service {
  private s3Client: S3Client

  constructor() {
    const s3 = new S3Client({
      endpoint: R2_URL
        ? R2_URL
        : `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
      },
      region: 'auto',
      forcePathStyle: true,
    })

    this.s3Client = s3
  }

  generatePresignedUrl(key: string) {
    const command = new GetObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    })

    return getSignedUrl(this.s3Client as any, command, {
      expiresIn: 100,
    })
  }

  generatePutPresignedUrl(key: string) {
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    })
    return getSignedUrl(this.s3Client as any, command, { expiresIn: 100 })
  }

  generateManyPresignedUrls(keys: string[]) {
    const promises = keys.map((key) => {
      const command = new GetObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
      })

      return getSignedUrl(this.s3Client as any, command, {
        expiresIn: 100,
      })
    })

    return Promise.all(promises)
  }

  async uploadObject(
    file: Express.Multer.File,
    userId: string,
  ): Promise<string> {
    const key = this.generatePath(userId, file.originalname)

    const uploadCommand = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    })

    await this.s3Client.send(uploadCommand)

    return this.generatePresignedUrl(key)
  }

  generatePath(userId: string, fileName: string, fileId?: string) {
    return `${userId}/${fileId || uuid()}-${fileName}`
  }
}
