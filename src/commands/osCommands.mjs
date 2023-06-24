import { EOL, cpus, homedir, userInfo, arch } from 'os';

export const osCommands = async (args) => {
    const osCommand = args[0];

    switch (osCommand) {
      case '--EOL':
        console.log(`EOL: ${JSON.stringify(EOL)}`);
        break;
      case '--cpus':
        const cpuDetails = cpus().map((cpu) => `${cpu.model} (${cpu.speed}GHz)`);
        console.log(`CPUs:\n${cpuDetails.join('\n')}`);
        break;
      case '--homedir':
        console.log(`Home directory: ${homedir()}`);
        break;
      case '--username':
        console.log(`Username: ${userInfo().username}`);
        break;
      case '--architecture':
        console.log(`Architecture: ${arch()}`);
        break;
      default:
        console.log('Invalid OS command');
    }
}