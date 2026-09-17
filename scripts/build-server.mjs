import { mkdir, readFile, writeFile } from 'node:fs/promises';
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
