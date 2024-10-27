import path from 'path';
import { fileURLToPath } from 'url';
import config from './config.js';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logDirectory = path.join(__dirname, '..', '..', config.logs.path);
