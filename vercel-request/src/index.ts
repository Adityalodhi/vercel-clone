import express from "express";
import { S3 } from "aws-sdk";
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
     secretAccessKey: process.env.AWS_SECRET_KEY

    });

const app = express();

app.get("/*", async (req: { hostname: any; path: any; }, res: { set: (arg0: string, arg1: string) => void; send: (arg0: any) => void; }) => {
 
    const host = req.hostname;

    const id = host.split(".")[0];
    const filePath = req.path;

    const contents = await s3.getObject({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `dist/${id}${filePath}`
    }).promise();
    
    const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ? "text/css" : "application/javascript"
    res.set("Content-Type", type);

    res.send(contents.Body);
})

app.listen(3001);