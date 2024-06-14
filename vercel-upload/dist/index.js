"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const simple_git_1 = __importDefault(require("simple-git"));
const idGenerat_1 = require("./idGenerat");
const getFiles_1 = require("./getFiles");
const path_1 = __importDefault(require("path"));
const awsS3_1 = require("./awsS3");
const redis_1 = require("redis");
const publisher = (0, redis_1.createClient)();
publisher.connect();
const subscriber = (0, redis_1.createClient)();
subscriber.connect();
const ioredis_1 = __importDefault(require("ioredis"));
const redis = new ioredis_1.default({
    host: '127.0.0.1',
    port: 6379,
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/deploy", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repoUrl = req.body.repoUrl;
    const id = (0, idGenerat_1.generate)(); // asd12
    yield (0, simple_git_1.default)().clone(repoUrl, path_1.default.join(__dirname, `output/${id}`));
    const files = (0, getFiles_1.getAllFiles)(path_1.default.join(__dirname, `output/${id}`));
    files.forEach((file) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, awsS3_1.uploadFile)(file.slice(__dirname.length + 1), file);
    }));
    yield new Promise((resolve) => setTimeout(resolve, 10000));
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
    });
}));
function lpushExample(key, value) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield redis.lpush(key, value);
            console.log(`LPUSH: Added ${value} to ${key}, new length is ${result}`);
        }
        catch (err) {
            console.error('Error performing LPUSH', err);
        }
    });
}
function lsetExample(key, field, value) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield redis.hset(key, field, value);
            console.log(`HSET: Set field ${field} of ${key} to ${value}, response: ${result}`);
        }
        catch (err) {
            console.error('Error performing HSET', err);
        }
    });
}
app.get("/status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const response = yield subscriber.hGet("status", id);
    res.json({
        status: response
    });
}));
app.listen(3000);
