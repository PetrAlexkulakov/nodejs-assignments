import { homedir } from 'os';
import { navigator } from './nwd.mjs';
import { fileOperator } from './basicOperation.mjs';

export default class FileManager {
  static currentDirectory = homedir();
  constructor(username) {
    this.username = username;
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
    console.log(`You are currently in ${FileManager.currentDirectory}`);
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
        navigator.navigateUp();
        break;
      case 'cd':
        await navigator.cd(args[0]);
        break;
      case 'ls':
        await navigator.ls()
        break;
      case 'cat':
        await fileOperator.cat(args[0])
        break;
      case 'add':
        await fileOperator.add(args[0])
        break;
      case 'rn':
        await fileOperator.rn(args[0], args[1])
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
