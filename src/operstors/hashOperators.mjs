import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import FileManager from '../fileManager.mjs';

export const hashOperators = {
    hash : async (path) => {
        const filePath = `${FileManager.currentDirectory}/${path}`;
        const hash = createHash('sha256');
        const readStream = createReadStream(filePath);
    
        readStream.on('data', (data) => hash.update(data));
        await new Promise((resolve, reject) => {
          readStream.on('end', resolve);
          readStream.on('error', reject);
        });
    
        console.log(`File hash: ${hash.digest('hex')}`);
    }
}