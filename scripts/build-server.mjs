import { mkdir, cp } from 'node:fs/promises';
import path from 'node:path';
import { build } from 'esbuild';

const outdir = path.resolve('dist');
const outfile = path.join(outdir, 'server.cjs');

await mkdir(outdir, { recursive: true });

// Bundle server.ts into a 100% self-contained CommonJS executable
// Bundles express, nodemailer, dotenv directly so Hostinger never fails on missing node_modules
await build({
  entryPoints: ['server.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  format: 'cjs',
  outfile: outfile,
  external: ['vite'],
  minify: false,
});

console.log(`Built self-contained backend server: ${path.relative(process.cwd(), outfile)}`);

// Also copy to root server.cjs so Hostinger can run from root without traversal
await cp(outfile, path.resolve('server.cjs'));

// Also copy dist to build directory so Hostinger succeeds regardless of whether Output directory is set to 'dist' or 'build'
const buildDir = path.resolve('build');
await cp(outdir, buildDir, { recursive: true });
console.log(`Synchronized build output to: ${path.relative(process.cwd(), buildDir)}`);
