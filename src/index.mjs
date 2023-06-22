// import fs from 'fs';
// import path from 'path';
// import readln from 'readline';

// const args = process.argv.slice(2);
// const username = args.find(arg => arg.startsWith('--username=')).split('=')[1];

// function displayWelcomeMessage(username) {
//   console.log(`Welcome to the File Manager, ${username}!`);
// }

// function displayGoodbyeMessage(username) {
//   console.log(`Thank you for using File Manager, ${username}, goodbye!`);
// }

// displayWelcomeMessage(username);

// const readline = readln.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// process.on('SIGINT', () => {
//   displayGoodbyeMessage(username);
//   process.exit(0);
// });

// process.on('line', (input) => {
//   if (input.trim() === '.exit') {
//     displayGoodbyeMessage(username);
//     process.exit(0);
//   }
// })

import FileManager from './fileManager.mjs';

const args = process.argv.slice(2);
const usernameArg = args.find((arg) => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'Unknown User';

const fileManager = new FileManager(username);
fileManager.start();
