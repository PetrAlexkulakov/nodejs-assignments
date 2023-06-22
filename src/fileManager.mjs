import { createReadStream, createWriteStream, promises as fsPromises } from 'fs';
import { pipeline } from 'stream';
import { createHash } from 'crypto';
import { brotliCompress, brotliDecompress } from 'zlib';
import { EOL, cpus, homedir, userInfo, arch } from 'os';

export default class FileManager {
  constructor(username) {
    this.username = username;
    this.currentDirectory = homedir();
  }

  start() {
    console.log(`Welcome to the File Manager, ${this.username}!`);
    this.printCurrentDirectory();
    // this.waitForInput();
  }

  stop() {
    console.log(`Thank you for using File Manager, ${this.username}, goodbye!`);
    process.exit(0);
  }

  printCurrentDirectory() {
    console.log(`You are currently in ${this.currentDirectory}`);
  }

}
