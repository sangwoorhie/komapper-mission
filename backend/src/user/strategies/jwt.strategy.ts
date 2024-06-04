import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Pool } from 'pg';
import pool from 'src/db/postgres';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly pool: Pool;

  constructor() {
    super({
      secretOrKey: process.env.SECRET_OR_KEY || 'secret_or_key',
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
    this.pool = pool;
  }

  async validate(payload: any) {
    const { name } = payload;

    // query로 유저 정보 찾기
    const query = `SELECT * FROM mission_cst_user WHERE name = $1`;
    const result = await this.pool.query(query, [name]);
    const user = result.rows[0];

    if (!user) {
      throw new UnauthorizedException('유저를 찾을 수 없습니다.');
    }

    // 유저 정보 반환
    return user;
  }
}
