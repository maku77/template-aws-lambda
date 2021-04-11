import { S3 } from 'aws-sdk';
const s3 = new S3();

export async function handler(): Promise<any> {
    if (!process.env.BUCKET_NAME) {
        throw new Error('Environment variable BUCKET_NAME is not set');
    }
    const request: S3.PutObjectRequest = {
        Bucket: process.env.BUCKET_NAME,
        Key: 'Key1',
        Body: 'Body1',
    };
    return s3.putObject(request).promise();
}

if (require.main === module) {
    (async () => {
        console.log(await handler());
    })();
}
