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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IdcheckDto } from './dto/id-check.dto';
import { DeleteUsersDto } from './dto/delete-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('유저 API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 회원가입 (test 성공)
  // POST : http://localhost:3000/user/register
  @Post('/register')
  @ApiOperation({
    summary: '회원 가입',
    description: 'CreateUserDto에 있는 내용을 기입하여 회원 가입한다.',
  })
  async createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const register = await this.userService.createUser(createUserDto);
    try {
      return register;
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
    const doubleCheckId = await this.userService.checkId(idcheckDto);
    try {
      return doubleCheckId;
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
    const totalUserNumber = this.userService.getUserCount();
    try {
      return totalUserNumber;
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
    const getTotalUsers = await this.userService.findAllUsers(page, pageSize);
    try {
      return getTotalUsers;
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
    const getSingleUser = await this.userService.getUserById(id);
    try {
      return getSingleUser;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  // 정보수정
  // PATCH : http://localhost:3000/user/id
  @Patch('/:id')
  @ApiOperation({
    summary: '유저 정보수정',
    description: 'UpdateUserDto에 있는 내용을 기입하여 유저를 정보수정한다.',
  })
  async updateUser(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ) {
    const editUserInfo = await this.userService.updateUser(id, updateUserDto);
    try {
      return editUserInfo;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  // 다중 회원 삭제 (test 성공)
  // DELETE : http://localhost:3000/user/id
  @Delete()
  @ApiOperation({
    summary: '유저 삭제',
    description:
      'DeleteUserDto에 유저를 배열형태로 넣어 삭제한다. (단일삭제, 다중삭제 둘 다 가능)',
  })
  async deleteUsers(@Body() deleteUsersDto: DeleteUsersDto) {
    const deleteUser = await this.userService.deleteUsers(deleteUsersDto.ids);
    try {
      return deleteUser;
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
