import * as process from 'node:process';
import { config } from 'dotenv';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { handleUserRoutes } from './routes/userRoutes';
import {
  notFoundHandler,
  serverErrorHandler,
} from './middleware/routeHandlers';

config();
const PORT: string | 3000 = process.env.HOST || 3000;

const requestHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }
    const protocol: string | string[] =
      req.headers['x-forwarded-proto'] || 'http';
    const url = new URL(req.url || '', `${protocol}://${req.headers.host}`);
    const pathname: string = url.pathname.replace(/\/$/, '');

    const isHandled: boolean = await handleUserRoutes(req, res, pathname);
    if (!isHandled) {
      notFoundHandler(res);
      return;
    }
  } catch {
    serverErrorHandler(res);
  }
};

export const server = createServer(requestHandler);

server.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));