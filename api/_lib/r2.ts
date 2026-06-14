import { GetObjectCommand, HeadObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getPresignedUrlTtlSeconds, getR2Config } from './env.js';

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

/** Fails fast when the bundle ZIP is missing from R2 (presign alone does not check existence). */
async function assertR2ObjectExists(bucketName: string, r2Key: string): Promise<void> {
  try {
    await getR2Client().send(new HeadObjectCommand({ Bucket: bucketName, Key: r2Key }));
  } catch (err) {
    console.error(`[r2] object missing or inaccessible key="${r2Key}" bucket="${bucketName}"`, err);
    throw new Error(`R2 object not found: ${r2Key}`);
  }
}

/** Temporary download URL — never expose the bucket publicly. */
export async function createPresignedDownloadUrl(r2Key: string): Promise<string> {
  const { bucketName } = getR2Config();
  const filename = r2Key.split('/').pop() ?? 'mailcraft-bundle.zip';

  await assertR2ObjectExists(bucketName, r2Key);

  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: r2Key,
      ResponseContentDisposition: `attachment; filename="${filename}"`,
      ResponseContentType: 'application/zip',
    });

    const url = await getSignedUrl(getR2Client(), command, {
      expiresIn: getPresignedUrlTtlSeconds(),
    });

    console.log(`[r2] presigned url created for key="${r2Key}" bucket="${bucketName}"`);
    return url;
  } catch (err) {
    console.error(`[r2] failed to presign key="${r2Key}" bucket="${bucketName}"`, err);
    throw err;
  }
}
