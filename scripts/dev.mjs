import { spawn } from 'node:child_process';
import net from 'node:net';

const command = process.platform === 'win32' ? process.env.ComSpec || 'cmd.exe' : 'npm';
const DEFAULT_FRONTEND_PORT = 5173;
const DEFAULT_BACKEND_PORT = 3000;

function parsePort(value, fallback) {
  const port = value ? Number.parseInt(value, 10) : fallback;
  return Number.isInteger(port) && port > 0 && port < 65536 ? port : fallback;
}

function canUsePort(port) {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once('error', () => {
      resolve(false);
    });

    server.once('listening', () => {
      server.close(() => {
        resolve(true);
      });
    });

    server.listen(port, '0.0.0.0');
  });
}

async function findPort(startPort, label, isExplicit) {
  if (await canUsePort(startPort)) {
    return startPort;
  }

  if (isExplicit) {
    throw new Error(`Requested ${label} port ${startPort} is already in use.`);
  }

  for (let port = startPort + 1; port < startPort + 20; port += 1) {
    if (await canUsePort(port)) {
      console.warn(`[dev] Default ${label} port ${startPort} is busy. Using ${port} instead.`);
      return port;
    }
  }

  throw new Error(`No available ${label} port found near ${startPort}.`);
}

const frontendPort = await findPort(
  parsePort(process.env.VITE_PORT, DEFAULT_FRONTEND_PORT),
  'frontend',
  Boolean(process.env.VITE_PORT),
);
const backendPort = await findPort(
  parsePort(process.env.PORT, DEFAULT_BACKEND_PORT),
  'backend',
  Boolean(process.env.PORT),
);
const childEnv = {
  ...process.env,
  PORT: String(backendPort),
  VITE_PORT: String(frontendPort),
};

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
    env: childEnv,
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
