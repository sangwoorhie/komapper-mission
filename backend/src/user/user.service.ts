import { User } from './entities/user.entity';
import {
  Injectable,
  UnauthorizedException,
  // NotFoundException,
  // BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Pool } from 'pg';
import pool from 'src/db/postgres';
import * as bcrypt from 'bcrypt';
import { IdcheckDto } from './dto/id-check.dto';
import { LoginDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  private readonly pool: Pool;
  private readonly jwtService: JwtService;

  constructor(jwtService: JwtService) {
    this.pool = pool;
    this.jwtService = jwtService;
  }

  // 로그인
  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { id, password } = loginDto;
    const query = `
      SELECT * FROM mission_cst_user WHERE id = $1;
    `;
    const result = await this.pool.query(query, [id]);
    const user = result.rows[0];

    if (!user) {
      throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const username = user.name;
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken: accessToken };
    } else {
      throw new UnauthorizedException('로그인에 실패하였습니다.');
    }
  }

  // 회원가입
  async createUser(createUserDto: CreateUserDto) {
    const { id, password, name, email, phone, organization } = createUserDto;
    if (!id || !password || !name || !email || !phone || !organization) {
      return `모든 입력란을 입력해 주세요.`;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/;
    if (!passwordRegex.test(password)) {
      return `비밀번호는 최소 4자 이상의 영문 대소문자 및 숫자를 포함해야 합니다.`;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return `유효한 이메일 주소를 입력해주세요.`;
    }

    const hashedPw = await bcrypt.hash(password, 10);

    const query1 = `SELECT id FROM mission_cst_user WHERE id = $1;`;
    const idExistResult = await this.pool.query(query1, [id]);
    if (idExistResult.rows.length > 0) {
      return `이미 존재하는 ID입니다. 다른 ID를 입력해주세요.`;
    }

    const query2 = `
    INSERT INTO mission_cst_user (id, password, name, email, phone, organization)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
    try {
      const result = await this.pool.query(query2, [
        id,
        hashedPw,
        name,
        email,
        phone,
        organization,
      ]);
      return `회원가입에 성공했습니다. ${result.rows[0].id}님, 환영합니다!`;
    } catch (error) {
      throw new Error(`에러가 발생했습니다: ${error.message}`);
    }
  }

  // ID 중복확인
  async checkId(idcheckDto: IdcheckDto) {
    const { id } = idcheckDto;
    if (!id) {
      return `ID를 입력해주세요.`;
    }
    const idExistQuery = `
    SELECT id FROM mission_cst_user WHERE id = $1;
  `;
    const idExistResult = await this.pool.query(idExistQuery, [id]);
    if (idExistResult.rows.length > 0) {
      return `${id}(은)는 이미 존재하는 ID입니다. 다른 ID를 입력해주세요.`;
    } else {
      return `${id}(은)는 사용 가능한 ID입니다.`;
    }
  }

  // Total 회원 수
  async getUserCount(): Promise<number> {
    const query = `SELECT COUNT(*) FROM mission_cst_user`;
    try {
      const result = await this.pool.query(query);
      return parseInt(result.rows[0].count, 10);
    } catch (error) {
      throw new Error(`에러가 발생했습니다: ${error.message}`);
    }
  }

  // 유저 전체목록 조회
  async findAllUsers(page: number, pageSize: number) {
    const countQuery = `
    SELECT id, name, email, phone, organization
    FROM mission_cst_user
    `;
    const countResult = await this.pool.query(countQuery);
    const totalUsers = countResult.rows;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const totalPages = Math.ceil(totalUsers.length / pageSize);
    const paginationTotalUsers = totalUsers.slice(startIndex, endIndex);
    return { totalPages, paginationTotalUsers };
  }

  // 페이지네이션 안한 유저 전제목록 조회
  // async getAllUsers() {
  //   const query = `
  //     SELECT id, name, email, phone, organization FROM mission_cst_user;
  //   `;
  //   try {
  //     const result = await this.pool.query(query);
  //     if (result.rows.length === 0) {
  //       throw new NotFoundException('유저가 존재하지 않습니다.');
  //     }
  //     return result.rows; // 모든 유저 반환
  //   } catch (error) {
  //     throw new Error(`에러가 발생했습니다: ${error.message}`);
  //   }
  // }

  // 유저 비번조회
  async getUserPassword(id: string) {
    const query = `
      SELECT password FROM mission_cst_user WHERE id = $1;
    `;
    try {
      const result = await this.pool.query(query, [id]);
      if (result.rows.length === 0) {
        return `유저 ID: ${id} (이)가 존재하지 않습니다.`;
      }
      return result.rows[0]; // 유저 값 반환
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  // 단일 유저조회
  async getUserById(id: string) {
    const query = `
      SELECT id, name, email, phone, organization FROM mission_cst_user WHERE id = $1;
    `;

    const result = await this.pool.query(query, [id]);
    if (result.rows.length === 0) {
      return `유저 ID: ${id} (이)가 존재하지 않습니다.`;
    }
    return result.rows[0]; // 유저 값 반환
  }

  // 정보수정
  async updateUser(
    currentUser: User,
    id: string,
    updateUserDto: UpdateUserDto,
  ) {
    if (currentUser.id !== id) {
      throw new UnauthorizedException('본인의 정보만 수정할 수 있습니다.');
    }

    const query1 = `
    SELECT * FROM mission_cst_user WHERE id = $1;
  `;
    const result = await this.pool.query(query1, [id]);
    if (result.rows.length === 0) {
      return `유저 ID: ${id} (이)가 존재하지 않습니다.`;
    }

    const { password, newPassword, name, phone, organization } = updateUserDto;
    if (!password || !newPassword || !name || !phone || !organization) {
      return `모든 입력란을 입력해 주십시오.`;
    }

    const user = await this.getUserPassword(id);
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return `기존 비밀번호가 일치하지 않습니다.`;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/;
    if (!passwordRegex.test(newPassword)) {
      return `새 비밀번호는 최소 4자 이상의 영문 대소문자 및 숫자를 포함해야 합니다.`;
    }

    const hashedPw = await bcrypt.hash(newPassword, 10);

    const query2 = `
    UPDATE mission_cst_user
    SET password = $1, name = $2, phone = $3, organization = $4
    WHERE id = $5
    RETURNING *;
  `;
    try {
      const result = await this.pool.query(query2, [
        hashedPw,
        name,
        phone,
        organization,
        id,
      ]);
      return `${result.rows[0].id}님의 회원정보가 성공적으로 수정되었습니다.`;
    } catch (error) {
      throw new Error(`에러가 발생했습니다: ${error.message}`);
    }
  }

  // 다중 회원 삭제
  async deleteUsers(ids: string[]) {
    const deletedUsers = [];

    for (const id of ids) {
      const user = await this.deleteUser(id);
      deletedUsers.push(user);
    }

    return deletedUsers;
  }

  async deleteAllUsers() {
    const query = `
      DELETE FROM mission_cst_user
      RETURNING *;
    `;

    try {
      const result = await this.pool.query(query);
      return result.rows;
    } catch (error) {
      throw new Error(`에러가 발생했습니다: ${error.message}`);
    }
  }

  // 단일 회원 삭제
  private async deleteUser(id: string) {
    const query = `
      DELETE FROM mission_cst_user
      WHERE id = $1
      RETURNING *;
    `;

    try {
      const result = await this.pool.query(query, [id]);
      if (result.rows.length === 0) {
        return `유저 ID: ${id} (이)가 존재하지 않습니다.`;
      }
      return result.rows[0]; // 유저 삭제
    } catch (error) {
      throw new Error(`에러가 발생했습니다: ${error.message}`);
    }
  }
}
