import AWS from "aws-sdk";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";

// S3Client.config.update({
//     region: 'us-east-1',
//     accessKeyId:'AKIA2UC27G7TK7RX6IF6',
//     secretAccessKey: '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'
// });
// const s3 = new AWS.S3();
const client = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: 'AKIA2UC27G7TK7RX6IF6',
        secretAccessKey: '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'
    }
});

// fileName => output/12312/src/App.jsx
// filePath => /Users/harkiratsingh/vercel/dist/output/12312/src/App.jsx
export const uploadFile = async (fileName: string, localFilePath: string) => {
    console.log(fileName);
    console.log(localFilePath);
    const fileContent = fs.readFileSync(localFilePath);

    const command = new PutObjectCommand({
        Bucket: "project-vercel",
        Key: fileName,
        Body: fileContent
    });
    try {
        const response = await client.send(command);
        console.log(response);
    } catch (err) {
        console.error(err);
    }

    // (async () =>{
    //     const response  = await s3.putObject({
    //         Bucket: "project-vercel",
    //         Key: fileName,
    //         Body: fileContent
    //     }).promise();
    //     console.log(response);
    // })();  

    // const response = await s3.upload({
    //     Body: fileContent,
    //     Bucket: "vercel",
    //     Key: fileName,
    // }).promise();
    // console.log(response);
}