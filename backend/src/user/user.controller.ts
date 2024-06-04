import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Query,
  // UnauthorizedException,
  // Headers,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IdcheckDto } from './dto/id-check.dto';
import { DeleteUsersDto } from './dto/delete-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
// import { GetUser } from './decorators/get-user.decorator';
// import { User } from './entities/user.entity';
// import { JwtAuthGuard } from './guards/jwt.guard';
// import { LocalAuthGuard } from './guards/auth.guard';
// import { GetUser } from './decorators/get-user.decorator';
// import { User } from './entities/user.entity';

@Controller('user')
@ApiTags('유저 API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 로그인 (토큰 발급 test 성공)
  // POST : http://localhost:3000/user/login
  @Post('/login')
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '로그인',
    description: 'ID와 비밀번호를 받아 로그인한다.',
  })
  async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
    try {
      return await this.userService.login(loginDto);
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  // 로그인 상태확인
  // GET : http://localhost:3000/user/auth
  @Get('/auth')
  @UseGuards(AuthGuard())
  getCurrentUser(@Req() req: any) {
    console.log('req', req);
    return req;
  }

  // async getCurrentUser(@GetUser() user: User) {
  //   console.log('user', user);
  //   if (!user) {
  //     throw new UnauthorizedException('사용자 정보를 찾을 수 없습니다.');
  //   }
  //   const userId = user.id;
  //   return { userId: userId };
  // }

  // 회원가입 (test 성공)
  // POST : http://localhost:3000/user/register
  @Post('/register')
  @ApiOperation({
    summary: '회원 가입',
    description: 'CreateUserDto에 있는 내용을 기입하여 회원 가입한다.',
  })
  async createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  // 아이디 중복확인 (test 성공)
  // POST : http://localhost:3000/user/idcheck
  @Post('/idcheck')
  @ApiOperation({
    summary: '아이디 중복 확인',
    description: '회원 가입 시 idcheckDto의 ID로 아이디 중복 확인한다.',
  })
  async checkId(@Body(new ValidationPipe()) idcheckDto: IdcheckDto) {
    try {
      return await this.userService.checkId(idcheckDto);
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  // Total 회원 수 (test 성공)
  // GET : http://localhost:3000/user/count
  @Get('count')
  @ApiOperation({
    summary: 'Total 유저 수',
    description: 'Total 유저 수를 조회한다.',
  })
  async getUserCount(): Promise<number> {
    try {
      return await this.userService.getUserCount();
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  // 페이지네이션 유저 전체목록 조회 (test 성공)
  // GET : http://localhost:3000/user?page=${page}&pageSize=${pageSize}
  @Get()
  @ApiOperation({
    summary: '유저 전체조회',
    description: '유저를 전체조회한다. (페이지네이션)',
  })
  async findAllUsers(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    try {
      return await this.userService.findAllUsers(page, pageSize);
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  // 페이지네이션 안한 유저 전제목록 조회
  // // GET : http://localhost:3000/user
  // @Get()
  // async getAllUsers() {
  //   return await this.userService.getAllUsers();
  // }

  // 단일 유저조회 (test 성공)
  // GET : http://localhost:3000/user/id
  @Get('/:id')
  @ApiOperation({
    summary: '유저 단일조회',
    description: '유저를 단일조회한다.',
  })
  async getUserById(@Param('id') id: string) {
    try {
      return await this.userService.getUserById(id);
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  // 정보수정
  // PATCH : http://localhost:3000/user/id
  @Patch('/:id')
  // @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '유저 정보수정',
    description: 'UpdateUserDto에 있는 내용을 기입하여 유저를 정보수정한다.',
  })
  async updateUser(
    // @GetUser() currentUser: User,
    @Param('id')
    id: string,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ) {
    try {
      return await this.userService.updateUser(
        //currentUser,
        id,
        updateUserDto,
      );
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  // 다중 회원 삭제 (test 성공)
  // DELETE : http://localhost:3000/user/id
  @Delete()
  // @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '유저 삭제',
    description:
      'DeleteUserDto에 유저를 배열형태로 넣어 삭제한다. (단일삭제, 다중삭제 둘 다 가능)',
  })
  async deleteUsers(@Body() deleteUsersDto: DeleteUsersDto) {
    try {
      return await this.userService.deleteUsers(deleteUsersDto.ids);
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  // 단일 회원 삭제
  // DELETE : http://localhost:3000/user/id
  // @Delete(':id')
  // async deleteUser(@Param('id') id: string) {
  //   return await this.userService.deleteUser(id);
  // }
}
