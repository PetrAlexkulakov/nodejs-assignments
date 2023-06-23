import { createReadStream, createWriteStream, promises as fsPromises } from 'fs';
import { pipeline } from 'stream';
import { createHash } from 'crypto';
import { brotliCompress, brotliDecompress } from 'zlib';
import { EOL, cpus, homedir, userInfo, arch } from 'os';
import path from 'path';

export const fileOperator = {
    cat : async (currentDirectory, path) => {
        const filePath = `${currentDirectory}/${path}`;
        const readStream = createReadStream(filePath);
        readStream.pipe(process.stdout);
        await new Promise((resolve) => readStream.on('end', resolve));
    },

    add : async (currentDirectory, filename) => {
        const filePath = `${currentDirectory}/${filename}`;
        await fsPromises.writeFile(filePath, '');
    }
}