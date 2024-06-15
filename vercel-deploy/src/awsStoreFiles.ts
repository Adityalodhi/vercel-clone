// import { S3 } from "aws-sdk";
import AWS from "aws-sdk";
import { PutObjectCommand,ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";

const s3 = new AWS.S3({
    region: 'us-east-1',
    accessKeyId: 'AKIA2UC27G7TK7RX6IF6',
     secretAccessKey: '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'
});

const client = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: 'AKIA2UC27G7TK7RX6IF6',
        secretAccessKey: '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'
    }
});

export async function downloadS3Folder(prefix: string) {

    var params = {
        Bucket: 'project-vercel', /* required */
        Prefix: prefix  // Can be your folder name
      };
      s3.listObjectsV2(params, async function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else{
            // console.log(data.Contents);
            console.log(data);
            console.log("going to function\n");

            const allPromises = data.Contents?.map(async ({Key}) => {
                return new Promise(async (resolve) => {
                    if (!Key) {
                        resolve("");
                        return;
                    }
                    const finalOutputPath = path.join(__dirname, Key);
                    const outputFile = fs.createWriteStream(finalOutputPath);
                    const dirName = path.dirname(finalOutputPath);
                    if (!fs.existsSync(dirName)){
                        fs.mkdirSync(dirName, { recursive: true });
                    }
                    s3.getObject({
                        Bucket: "vercel",
                        Key
                    }).createReadStream().pipe(outputFile).on("finish", () => {
                        resolve("");
                    })
                })
            }) || []
            console.log("awaiting");
            await Promise.all(allPromises?.filter(x => x !== undefined));
        }           
      });


    // const listCommand = new ListObjectsV2Command({
    //     Bucket: 'project-vercel',
    //     Prefix: prefix,
    //   });
    // const allFiles = await S3Client.send(listCommand);

    // // Log the list of objects
    // console.log('Objects in bucket:', allFiles.Contents);
    
    // 
    

    
}