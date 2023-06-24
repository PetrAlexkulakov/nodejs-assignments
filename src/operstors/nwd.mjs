import { promises as fsPromises } from 'fs';
import path from 'path';
import FileManager from '../fileManager.mjs';

export const navigator = {
    navigateUp : () => {
        const parentDirectory = FileManager.currentDirectory.replace(/[\\\/][^\\\/]+$/, '');
        if (parentDirectory !== FileManager.currentDirectory && parentDirectory !== '') {
            FileManager.currentDirectory = parentDirectory;
        }
    },

    cd : async (newPath) => {
        const absolutePath = path.join(FileManager.currentDirectory, newPath)
        
        return await fsPromises.access(absolutePath)
            .then(() => {
                FileManager.currentDirectory = absolutePath;
            })
            .catch(() => {
                console.error('Invalid path')
            });
    },

    ls : async () => {
        const files = await fsPromises.readdir(FileManager.currentDirectory);
        const fileDetails = [];
        const directories = [];

        for (const file of files) {
            const stat = await fsPromises.lstat(`${FileManager.currentDirectory}/${file}`);
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