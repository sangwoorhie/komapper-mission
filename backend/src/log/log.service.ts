import { Injectable, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';
import pool from 'src/db/postgres';

@Injectable()
export class LogService {
  private readonly pool: Pool;

  constructor() {
    this.pool = pool;
  }

  // 로그 전체조회
  async findAllLogs(page: number, pageSize: number) {
    const offset = (page - 1) * pageSize;
    const query = `
      SELECT id, date, user_ip, user_agent 
      FROM mission_cst_conn_log
      OFFSET $1 LIMIT $2;
    `;
    try {
      const result = await this.pool.query(query, [offset, pageSize]);
      return result.rows; // 로그 전체 목록 반환
    } catch (error) {
      throw new Error(`에러가 발생했습니다: ${error.message}`);
    }
  }

  // 로그 단일조회
  async getLogById(id: string) {
    const query = `
      SELECT id, date, user_ip, user_agent FROM mission_cst_conn_log WHERE id = $1;
    `;
    try {
      const result = await this.pool.query(query, [id]);
      if (result.rows.length === 0) {
        throw new NotFoundException(
          `로그 아이디: ${id} (이)가 존재하지 않습니다.`,
        );
      }
      return result.rows[0]; // 단일 로그 반환
    } catch (error) {
      throw new Error(`에러가 발생했습니다: ${error.message}`);
    }
  }
}
