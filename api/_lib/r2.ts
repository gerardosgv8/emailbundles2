import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getDownloadLinkTtlSeconds, getR2Config } from './env.js';

let r2Client: S3Client | null = null;

function getR2Client(): S3Client {
  if (!r2Client) {
    const { accountId, accessKeyId, secretAccessKey } = getR2Config();
    r2Client = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }
  return r2Client;
}

/** Temporary download URL — never expose the bucket publicly. */
export async function createPresignedDownloadUrl(r2Key: string): Promise<string> {
  const { bucketName } = getR2Config();
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: r2Key,
  });
  return getSignedUrl(getR2Client(), command, {
    expiresIn: getDownloadLinkTtlSeconds(),
  });
}
