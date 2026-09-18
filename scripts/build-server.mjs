import { mkdir, readFile, writeFile, cp } from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const outdir = path.resolve('dist');
const outfile = path.join(outdir, 'server.cjs');

await mkdir(outdir, { recursive: true });

const source = await readFile(path.resolve('server.ts'), 'utf8');
const output = ts.transpileModule(source, {
  compilerOptions: {
    esModuleInterop: true,
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
});

await writeFile(outfile, output.outputText);
console.log(`Built backend server: ${path.relative(process.cwd(), outfile)}`);

// Also copy dist to build directory so Hostinger succeeds regardless of whether Output directory is set to 'dist' or 'build'
const buildDir = path.resolve('build');
await cp(outdir, buildDir, { recursive: true });
console.log(`Synchronized build output to: ${path.relative(process.cwd(), buildDir)}`);

