import { createReadStream, createWriteStream, promises as fsPromises } from 'fs';
import { pipeline } from 'stream';
import { createHash } from 'crypto';
import { brotliCompress, brotliDecompress } from 'zlib';
import { EOL, cpus, homedir, userInfo, arch } from 'os';
import path from 'path';
import FileManager from './fileManager.mjs';

export const fileOperator = {
    cat : async (path) => {
        const filePath = `${FileManager.currentDirectory}/${path}`;
        const readStream = createReadStream(filePath);
        readStream.pipe(process.stdout);
        await new Promise((resolve) => readStream.on('end', resolve));
    },

    add : async (filename) => {
        const filePath = `${FileManager.currentDirectory}/${filename}`;
        await fsPromises.writeFile(filePath, '');
    },

    rn : async (oldPath, newPath) => {
        const oldFilePath = `${this.FileManager.currentDirectory}/${oldPath}`;
        const newFilePath = `${this.FileManager.currentDirectory}/${newPath}`;
        await fsPromises.rename(oldFilePath, newFilePath);
    },
}