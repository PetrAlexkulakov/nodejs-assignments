import { createReadStream, createWriteStream, promises as fsPromises } from 'fs';
import { pipeline } from 'stream';
import { createHash } from 'crypto';
import { brotliCompress, brotliDecompress } from 'zlib';
import { EOL, cpus, homedir, userInfo, arch } from 'os';
import path from 'path';

export const navigator = {
    navigateUp : (currentDirectory) => {
        const parentDirectory = currentDirectory.replace(/[\\\/][^\\\/]+$/, '');
        if (parentDirectory !== currentDirectory && parentDirectory !== '') {
            return parentDirectory;
        }
        return currentDirectory;
    },

    cd : async (newPath, currentDirectory) => {
        const absolutePath = path.join(currentDirectory, newPath)
        
        return await fsPromises.access(absolutePath)
            .then(() => {
              return absolutePath;
            })
            .catch(() => {
                console.error('Invalid path')
                return currentDirectory;
            });
    }
}