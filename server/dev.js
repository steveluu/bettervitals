import { spawn } from 'node:child_process';

const run = (command, args, options = {}) => {
  return spawn(command, args, { stdio: 'inherit', ...options });
};

const serverProcess = run('node', ['server/index.js']);
const clientProcess = run('npm', ['run', 'dev:client'], { shell: true });

const shutdown = () => {
  serverProcess.kill('SIGINT');
  clientProcess.kill('SIGINT');
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
