import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    credentials:{
        accessKeyId: process.env.MINIO_ACCESS_KEY!,
        secretAccessKey: process.env.MINIO_SECRET_KEY!,
    },
    endpoint: process.env.MINIO_ENDPOINT,
    region: "us-east-1",
    forcePathStyle: true,
})

const bucketName = process.env.MINIO_BUCKET_NAME;


