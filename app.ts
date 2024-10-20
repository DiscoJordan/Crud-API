import path from 'node:path';
import dotenv from 'dotenv';
import { cpus } from 'os';

const envPath = path.resolve(process.cwd(), '.env');
dotenv.config({ path: envPath });
const PORT = Number(process.env.PORT ?? 3000);
const isClusterMode = process.argv.includes('--cluster');
const numberWorker = cpus().length;

if (isClusterMode) {
  console.log(`Welcome to CRUD API!\n(CLUSTER MODE)\nThere is ${numberWorker} workeres`);
} else {
    startServer(PORT);
  console.log(`Welcome to CRUD API\n(SINGLE MODE)`);
}