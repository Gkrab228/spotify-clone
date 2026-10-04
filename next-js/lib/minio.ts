import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const credentials = {
    accessKeyId: process.env.MINIO_ACCESS_KEY!,
    secretAccessKey: process.env.MINIO_SECRET_KEY!,
};
export const s3Client = new S3Client({
    credentials,
    endpoint: process.env.S3_ENDPOINT,
    region: "us-east-1",
    forcePathStyle: true,
})

export const s3ClientPublic = new S3Client({
    credentials,
    endpoint: process.env.S3_PUBLIC_ENDPOINT||"http://localhost:9000",
    region: "us-east-1",
    forcePathStyle: true,
});

const bucketName = process.env.MINIO_BUCKET_NAME;

export async function getUploadUrl(Key:string,ContentType:string){

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key,
    ContentType,
  });

  try{
    const presignedUrl = await getSignedUrl(s3ClientPublic, command, {
      signableHeaders: new Set(["content-type"]),
      expiresIn: 300,
    });
    return presignedUrl;
  } catch(err){
    console.error(err);
  }
}