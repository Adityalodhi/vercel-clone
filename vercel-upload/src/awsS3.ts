

import AWS from "aws-sdk";
import fs from "fs";


const s3 = new AWS.S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
     secretAccessKey: process.env.AWS_SECRET_KEY

    });

// fileName => output/12312/src/App.jsx
// filePath => /Users/harkiratsingh/vercel/dist/output/12312/src/App.jsx
export const uploadFile = async (fileName: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath);
    // const response = await s3.upload({
    //     Body: fileContent,
    //     Bucket: "project-vercel",
    //     Key: fileName,
    // }).promise();
    // console.log(response);
    const bucketPath = fileName.startsWith('/') ? fileName.slice(1) : fileName;
    const param = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: bucketPath,
        Body: fileContent
    };
    const result = s3.putObject(param,function(err,data){
        if(err){
            console.log(err);
        }
        else{
            console.log(data);
        }
    })

    // const result = await s3.upload(param).promise();
    console.log(result);
}