import { createReadStream, createWriteStream, promises as fsPromises } from 'fs';
import { pipeline } from 'stream';
import { createHash } from 'crypto';
import { brotliCompress, brotliDecompress } from 'zlib';
import { EOL, cpus, homedir, userInfo, arch } from 'os';
import { navigateUp } from './nwd.mjs';

export default class FileManager {
  constructor(username) {
    this.username = username;
    this.currentDirectory = homedir();
  }

  start() {
    console.log(`Welcome to the File Manager, ${this.username}!`);
    this.printCurrentDirectory();
    this.waitForInput();
  }

  stop() {
    console.log(`Thank you for using File Manager, ${this.username}, goodbye!`);
    process.exit(0);
  }

  printCurrentDirectory() {
    console.log(`You are currently in ${this.currentDirectory}`);
  }

  async waitForInput() {
    try {
      const input = await this.getInput();
      await this.executeCommand(input);
    } catch (error) {
      console.error('Operation failed:', error);
    } finally {
      this.waitForInput();
    }
  }

  getInput() {
    return new Promise((resolve) => {
      process.stdout.write('> ');
      process.stdin.once('data', (data) => {
        resolve(data.toString().trim());
      });
    });
  }

  async executeCommand(input) {
    const [command, ...args] = input.split(' ');

    switch (command) {
      case 'up':
        this.currentDirectory = navigateUp(this.currentDirectory);
        break;
      case '.exit':
        this.stop();
        break;
      default:
        console.log('Invalid input');
    }
    this.printCurrentDirectory();
  }
}
