import {createClient,commandOptions} from 'redis';
// import { downloadS3Folder } from './awsStoreFiles';
import { downloadS3Folder } from './aws';
import { buildProject } from './makingBuild';
import { copyFinalDist } from './aws';
const subscriber = createClient();
subscriber.connect();

const publisher = createClient();
publisher.connect();

async function main(){
    while(1){
        const response = await subscriber.brPop(
            commandOptions({isolated:true}),
            'build-queue',
            0
        );
        // const { key, element } = response;
        // console.log(element);
        var id: any;
        if (response && typeof response === 'object') {
            const { key, element } = response;
            // console.log(`Popped element with id: ${element} from queue: ${key}`);
            id = element;
          } else {
            console.log('No element to pop or unexpected response format:', response);
          }
        //ts-ignore
        // const id =element;
        // await downloadS3Folder("output/d8na5");
        await downloadS3Folder(`/output/${id}`);
        await buildProject(id);
        copyFinalDist(id);
        publisher.hSet("status", id, "deployed")
        console.log("Completed");
    }
}
main();