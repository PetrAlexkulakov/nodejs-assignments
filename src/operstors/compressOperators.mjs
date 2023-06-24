import { createReadStream, createWriteStream, promises as fsPromises } from 'fs';
import { pipeline } from 'stream';
import { createHash } from 'crypto';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { EOL, cpus, homedir, userInfo, arch } from 'os';
import FileManager from '../fileManager.mjs';

export const compressOperators = {
    compress : async (sourcePath, destinationPath) => {
      const sourceFilePath = `${FileManager.currentDirectory}/${sourcePath}`;
      const destinationFilePath = `${FileManager.currentDirectory}/${destinationPath}`;

      const readableStream = createReadStream(sourceFilePath);
      const writableStream = createWriteStream(destinationFilePath);
      
      const brotliStream = createBrotliCompress();

      readableStream.pipe(brotliStream).pipe(writableStream);
    },
}