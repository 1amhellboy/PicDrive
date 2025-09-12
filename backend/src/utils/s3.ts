import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from 'crypto';
import path from 'path';
import dotenv from 'dotenv';
import { PrismaClient,Permission } from '../generated/prisma';
const prisma = new PrismaClient();

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadFileToS3 = async (file: Express.Multer.File) => {
  const ext = path.extname(file.originalname);
  const key = `${randomUUID()}${ext}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await s3.send(command);

  return {
    key,
    url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
  };
};

export const deleteFileFromS3 = async (key: string) => {
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
  });
  await s3.send(command);
};


export const getSignedFileUrl = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
  });
  return getSignedUrl(s3, command, { expiresIn: 60 * 5 }); // 5 min URL
};


// export const getDownloadUrl = async (
//   key: string,
//   filename: string,
//   contentType?: string
// ) => {
//   const command = new GetObjectCommand({
//     Bucket: process.env.AWS_BUCKET_NAME!,
//     Key: key,
//     ResponseContentDisposition: `attachment; filename="${filename}"`,
//     ResponseContentType: contentType || "application/octet-stream",
//   });

//   return await getSignedUrl(s3, command, { expiresIn: 60 });
// };

export const getDownloadUrl = async (
  key: string,
  filename: string,
  contentType?: string
) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
    ResponseContentDisposition: `attachment; filename="${filename}"`,
    ResponseContentType: contentType || "application/octet-stream",
  });

  return await getSignedUrl(s3, command, { expiresIn: 60 });
};



export const getS3KeyFromUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    // Key is everything after the bucket domain
    return decodeURIComponent(parsedUrl.pathname.slice(1));
  } catch {
    // If it's not a valid URL, assume it's already a key
    return url;
  }
}