import FileManager from "../fileManager.mjs";
import { osCommands } from './osCommands.mjs';
import { navigator } from '../operstors/nwd.mjs';
import { fileOperator } from '../operstors/basicOperation.mjs';

export async function  executeCommand(input) {
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
      case 'cp':
        await fileOperator.cp(args[0], args[1])
        break;
      case 'mv':
        await fileOperator.mv(args[0], args[1])
        break;
      case 'rm':
        await fileOperator.rm(args[0])
        break;
      case 'os':
        await osCommands(args)
        break;
      case 'hash':
        await fileOperator.hash(args[0]);
        break;
      case '.exit':
        FileManager.stop();
        break;
      default:
        console.log('Invalid input');
    }
    FileManager.printCurrentDirectory();
  }