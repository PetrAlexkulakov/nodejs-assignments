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
    },

    ls : async (currentDirectory) => {
        const files = await fsPromises.readdir(currentDirectory);
        const fileDetails = [];
        const directories = [];

        for (const file of files) {
            const stat = await fsPromises.lstat(`${currentDirectory}/${file}`);
            const type = stat.isDirectory() ? 'Directory' : 'File';

            if (type === 'Directory') {
            directories.push({ Name: file, Type: type });
            } else {
            fileDetails.push({ Name: file, Type: type });
            }
        }

        directories.sort((a, b) => a.Name.localeCompare(b.Name));
        fileDetails.sort((a, b) => a.Name.localeCompare(b.Name));

        console.table([...directories, ...fileDetails]);
    },
}