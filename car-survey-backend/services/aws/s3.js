require("dotenv").config(); // Load environment variables

const { S3Client } = require("@aws-sdk/client-s3");

// const s3Client = new S3Client({
//     region: process.env.AWS_REGION,
//     credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     },
//     requestTimeout: 60000, // Set the timeout in milliseconds (e.g., 60000ms = 1 minute)
//     maxAttempts: 3, // Retry up to 3 times on failure
// });

const s3Client = new S3Client({
    region: "eu-north-1",
    credentials: {
        accessKeyId: "AKIA2MNVMIZOUHBGKVR2",
        secretAccessKey: "3esq/og6nW/l1WE9z+N4D6f+OnZnn0fJOCXCEoOA",
    },
    requestTimeout: 100000, // Set the timeout in milliseconds (e.g., 60000ms = 1 minute)
    maxAttempts: 3, // Retry up to 3 times on failure
});

module.exports = { s3Client };
