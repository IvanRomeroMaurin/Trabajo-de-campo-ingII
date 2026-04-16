import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    console.log('Initializing PrismaService with Pool...');
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  async onModuleInit() {
    console.log('Connecting to Supabase (Pooling)...');
    try {
      await this.$connect();
      console.log('Successfully connected to Supabase.');
    } catch (error) {
      console.error('Failed to connect to Supabase:', error);
    }
  }
}
