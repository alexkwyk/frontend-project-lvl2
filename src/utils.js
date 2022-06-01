import * as fs from 'node:fs';
import * as path from 'node:path';
import * as process from 'node:process';

const readFile = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');

export default readFile;