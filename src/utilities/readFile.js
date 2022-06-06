import fs from 'fs';
import path from 'path';
import process from 'process';

const readFile = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');

export default readFile;
