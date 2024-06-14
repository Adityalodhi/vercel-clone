import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import { generate } from "./idGenerat";
import { getAllFiles } from "./getFiles";
import path from "path";
import { uploadFile } from "./awsS3";
import { createClient } from "redis";
const publisher = createClient();
publisher.connect();

const subscriber = createClient();
subscriber.connect();

import Redis from 'ioredis';

const redis = new Redis({
  host: '127.0.0.1',
  port: 6379,
});




const app = express();
app.use(cors())
app.use(express.json());

app.post("/deploy", async (req, res) => {
    const repoUrl = req.body.repoUrl;
    const id = generate(); // asd12
    await simpleGit().clone(repoUrl, path.join(__dirname, `output/${id}`));

    const files = getAllFiles(path.join(__dirname, `output/${id}`));

    files.forEach(async file => {
        await uploadFile(file.slice(__dirname.length + 1), file);
    });

    await new Promise((resolve) => setTimeout(resolve, 10000));
    // (async () => {
    //     await lpushExample('status', id); // Ensure the list exists
    //     // await lsetExample('status', id, 'uploaded'); // Set the value at index 0
    //     redis.quit();
    //   })();
    
    publisher.lPush("build-queue", id);
    // const result = await redis.lpush("status", id);
    // console.log(result)
    // INSERT => SQL
    // .create => 
    publisher.hSet("status", id, "uploaded");
    // const result1 = await redis.lset("status", id, "uploaded");
    // console.log(result1)

    res.json({
        id: id
    })

});

async function lpushExample(key: string, value: string) {
    try {
      const result = await redis.lpush(key, value);
      console.log(`LPUSH: Added ${value} to ${key}, new length is ${result}`);
    } catch (err) {
      console.error('Error performing LPUSH', err);
    }
  }

  async function lsetExample(key: string, field: string, value: string) {
    try {
      const result = await redis.hset(key, field, value);
      console.log(`HSET: Set field ${field} of ${key} to ${value}, response: ${result}`);
    } catch (err) {
      console.error('Error performing HSET', err);
    }
  }

app.get("/status", async (req, res) => {
    const id = req.query.id;
    const response = await subscriber.hGet("status", id as string);
    res.json({
        status: response
    })
})

app.listen(3000);