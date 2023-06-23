import { homedir } from 'os';
import { navigator } from './nwd.mjs';
import { fileOperator } from './basicOperation.mjs';

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
        this.currentDirectory = navigator.navigateUp(this.currentDirectory);
        break;
      case 'cd':
        this.currentDirectory = await navigator.cd(args[0], this.currentDirectory);
        break;
      case 'ls':
        await navigator.ls(this.currentDirectory)
        break;
      case 'cat':
        await fileOperator.cat(this.currentDirectory, args[0])
        break;
      case 'add':
        await fileOperator.add(this.currentDirectory, args[0])
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
