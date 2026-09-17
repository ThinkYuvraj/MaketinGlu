import { spawn } from 'node:child_process';

const command = process.platform === 'win32' ? process.env.ComSpec || 'cmd.exe' : 'npm';
const frontendPort = process.env.VITE_PORT || '5173';
const backendPort = process.env.PORT || '3000';

const services = [
  {
    name: 'backend',
    label: 'backend',
    color: '\x1b[36m',
    script: 'dev:server',
  },
  {
    name: 'frontend',
    label: 'frontend',
    color: '\x1b[35m',
    script: 'dev:client',
  },
];

const reset = '\x1b[0m';
const children = new Map();
let isShuttingDown = false;

console.log('');
console.log('MarketingGlu development servers');
console.log(`  Frontend: http://localhost:${frontendPort}`);
console.log(`  Backend:  http://localhost:${backendPort}`);
console.log('');

function prefixOutput(service, streamName, chunk) {
  const lines = chunk.toString().split(/\r?\n/);

  for (const line of lines) {
    if (!line.trim()) {
      continue;
    }

    const prefix = `${service.color}[${service.label}]${reset}`;
    const stream = streamName === 'stderr' ? process.stderr : process.stdout;
    stream.write(`${prefix} ${line}\n`);
  }
}

function shutdown(signal) {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;

  for (const child of children.values()) {
    if (!child.killed) {
      child.kill(signal);
    }
  }
}

for (const service of services) {
  const args =
    process.platform === 'win32'
      ? ['/d', '/s', '/c', `npm run ${service.script}`]
      : ['run', service.script];

  const child = spawn(command, args, {
    env: process.env,
    shell: false,
    stdio: ['inherit', 'pipe', 'pipe'],
  });

  children.set(service.name, child);
  child.stdout.on('data', (chunk) => prefixOutput(service, 'stdout', chunk));
  child.stderr.on('data', (chunk) => prefixOutput(service, 'stderr', chunk));

  child.on('exit', (code, signal) => {
    children.delete(service.name);

    if (isShuttingDown) {
      return;
    }

    const reason = signal ? `signal ${signal}` : `code ${code}`;
    console.error(`[dev] ${service.label} exited with ${reason}. Stopping remaining services.`);
    shutdown(signal || 'SIGTERM');
    process.exit(code ?? 1);
  });
}

process.on('SIGINT', () => {
  shutdown('SIGINT');
});

process.on('SIGTERM', () => {
  shutdown('SIGTERM');
});
