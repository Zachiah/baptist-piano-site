import crypto from 'crypto';
import fs from 'fs';

const randomString = crypto.randomBytes(256).toString('base64');

fs.appendFileSync('./.env', `\nJWT_SECRET="${randomString}"`);
