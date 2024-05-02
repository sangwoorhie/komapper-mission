import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  host: 'www.komapper-ai.com', //process.env.HOST,
  port: 21199, //Number(process.env.PORT),
  user: 'dsm_dev', //process.env.USER,
  password: 'dsm_dev', //process.env.PASSWORD,
  database: 'dsm_dev', //process.env.DATABASE,
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
