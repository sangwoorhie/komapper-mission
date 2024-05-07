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
    const countQuery = `
    SELECT id, date, user_ip, user_agent 
    FROM mission_cst_conn_log
    ORDER BY date DESC
    `;
    const countResult = await this.pool.query(countQuery);
    const totalLogs = countResult.rows;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const totalPages = Math.ceil(totalLogs.length / pageSize);
    const paginationTotalLogs = totalLogs.slice(startIndex, endIndex);
    return { totalPages, paginationTotalLogs };
  }

  // 페이지네이션 안한 로그 전체목록 조회
  // async getAllLogs() {
  //   const query = `
  //     SELECT id, date, user_ip, user_agent FROM mission_cst_conn_log
  //    `;
  //   try {
  //     const result = await this.pool.query(query);
  //     if (result.rows.length === 0) {
  //       throw new NotFoundException('유저가 존재하지 않습니다.');
  //     }
  //     return result.rows;
  //   } catch (error) {
  //     throw new Error(`에러가 발생했습니다: ${error.message}`);
  //   }
  // }

  // Total 로그 수
  async getLogCount(): Promise<number> {
    const query = `
        SELECT COUNT(*) FROM mission_cst_conn_log;
      `;
    try {
      const result = await this.pool.query(query);
      return parseInt(result.rows[0].count, 10);
    } catch (error) {
      throw new Error(`에러가 발생했습니다: ${error.message}`);
    }
  }

  // 로그 단일조회
  async getLogById(id: string) {
    const query = `
      SELECT id, date, user_ip, user_agent FROM mission_cst_conn_log WHERE id = $1;
    `;
    // try {
    const result = await this.pool.query(query, [id]);
    if (result.rows.length === 0) {
      throw new NotFoundException(
        `로그 아이디: ${id} (이)가 존재하지 않습니다.`,
      );
    }
    return result.rows[0]; // 단일 로그 반환
    // } catch (error) {
    //   throw new Error(`${error.message}`);
    // }
  }
}
