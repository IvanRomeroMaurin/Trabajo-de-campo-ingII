import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const path = require('path');
    const fs = require('fs');
    
    // Rutas posibles para el .env en monorepo
    const paths = [
      path.join(process.cwd(), 'apps/api/.env'),
      path.join(process.cwd(), '.env'),
      path.join(__dirname, '..', '..', '.env')
    ];

    for (const p of paths) {
      if (fs.existsSync(p)) {
        require('dotenv').config({ path: p });
        break;
      }
    }

    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
