import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as dotenv from 'dotenv';
dotenv.config();

async function check() {
  const s3 = new S3Client({
    endpoint: process.env.B2_ENDPOINT,
    region: process.env.B2_REGION || 'us-east-005',
    credentials: {
      accessKeyId: process.env.B2_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.B2_SECRET_ACCESS_KEY || '',
    },
    forcePathStyle: true,
    requestChecksumCalculation: 'WHEN_REQUIRED',
  });
  
  const command = new PutObjectCommand({
    Bucket: process.env.B2_BUCKET_NAME,
    Key: 'test/file.png',
    ContentType: 'image/png',
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 3600, signableHeaders: new Set(['content-type']) });
  console.log("URL:", url);
}
check();
