import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const outdir = path.resolve('.dev');
const outfile = path.join(outdir, 'server.mjs');

await mkdir(outdir, { recursive: true });

const source = await readFile(path.resolve('server.ts'), 'utf8');
const output = ts.transpileModule(source, {
  compilerOptions: {
    esModuleInterop: true,
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
  },
});

await writeFile(outfile, output.outputText);

const child = spawn(process.execPath, [outfile, '--backend-only'], {
  env: {
    ...process.env,
    BACKEND_ONLY: 'true',
  },
  stdio: 'inherit',
});

let isShuttingDown = false;

function shutdown(signal) {
  isShuttingDown = true;

  if (!child.killed) {
    child.kill(signal);
  }
}

process.on('SIGINT', () => {
  shutdown('SIGINT');
});

process.on('SIGTERM', () => {
  shutdown('SIGTERM');
});

child.on('exit', (code, signal) => {
  process.exit(isShuttingDown && signal ? 0 : code ?? 0);
});
