import { homedir } from 'os';
import { executeCommand } from './commands/baseCommands.mjs';

export default class FileManager {
  static currentDirectory = homedir();
  constructor(username) {
    this.username = username;
  }

  start() {
    console.log(`Welcome to the File Manager, ${this.username}!`);
    FileManager.printCurrentDirectory();
    this.waitForInput();
  }

  static stop() {
    console.log(`Thank you for using File Manager, ${this.username}, goodbye!`);
    process.exit(0);
  }

  static printCurrentDirectory() {
    console.log(`\nYou are currently in ${FileManager.currentDirectory}`);
  }

  async waitForInput() {
    try {
      const input = await this.getInput();
      await executeCommand(input);
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
}
