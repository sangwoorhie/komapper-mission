import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Pool } from 'pg';
import pool from 'src/db/postgres';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly pool: Pool;

  constructor() {
    super({
      secretOrKey: process.env.SECRET_OR_KEY || 'secret_or_key',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
    this.pool = pool;
  }

  async validate(payload) {
    const { username } = payload;

    // query로 유저 이름찾기
    const query = 'SELECT * FROM users WHERE username = $1';
    const result = await this.pool.query(query, [username]);
    const user = result.rows[0];

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
