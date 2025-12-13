import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'prisma/config';

// dotenv で環境変数をロード
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  schema: path.join(__dirname, 'prisma', 'schema.prisma'),

  migrations: {
    path: path.join(__dirname, 'prisma', 'migrations'),
  },

  datasource: {
    url: process.env.DATABASE_URL ?? '',
  },
});
