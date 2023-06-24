import FileManager from './fileManager.mjs';

const args = process.argv.slice(2);
const usernameArg = args.find((arg) => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'Unknown User';

const fileManager = new FileManager(username);
fileManager.start();
