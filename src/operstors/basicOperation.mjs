import { createReadStream, createWriteStream, promises as fsPromises } from 'fs';
import { pipeline } from 'stream';
import FileManager from '../fileManager.mjs';

export const fileOperator = {
    copyStream : (source, destination) => {
        return new Promise((resolve, reject) => {
          pipeline(source, destination, (error) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        });
    },

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
        const oldFilePath = `${FileManager.currentDirectory}/${oldPath}`;
        const newFilePath = `${FileManager.currentDirectory}/${newPath}`;
        await fsPromises.rename(oldFilePath, newFilePath);
    },

    cp: async (sourcePath, destinationPath) => {
        const sourceFilePath = `${FileManager.currentDirectory}/${sourcePath}`;
        const destinationFilePath = `${FileManager.currentDirectory}/${destinationPath}`;
        await fileOperator.copyStream(createReadStream(sourceFilePath), createWriteStream(destinationFilePath));
    },

    mv : async (sourcePath, destinationPath) => {
        const sourceFilePath = `${FileManager.currentDirectory}/${sourcePath}`;
        const destinationFilePath = `${FileManager.currentDirectory}/${destinationPath}`;
        await fileOperator.copyStream(createReadStream(sourceFilePath), createWriteStream(destinationFilePath));
        await fileOperator.rm(sourcePath)
    },

    rm : async (path) => {
        const filePath = `${FileManager.currentDirectory}/${path}`;
        await fsPromises.unlink(filePath);
    }
}