import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  host: process.env.HOST,
  port: Number(process.env.PORT),
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

export async function connect() {
  try {
    await pool.connect();
    console.log('PostgreSQL에 연결되었습니다.');
  } catch (error) {
    console.error('PostgreSQL 연결 에러:', error);
  }
}

export async function disconnect() {
  try {
    await pool.end();
    console.log('PostgreSQL에 연결 해제되었습니다.');
  } catch (error) {
    console.error('PostgreSQL 연결해제 에러:', error);
  }
}

export default pool;
