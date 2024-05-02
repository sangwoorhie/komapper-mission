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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 회원가입 (test 성공)
  // POST : http://localhost:3000/user/register
  @Post('/register')
  async createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  // 아이디 중복확인 (test 성공)
  // POST : http://localhost:3000/user/idcheck
  @Post('/idcheck')
  async checkId(@Body(new ValidationPipe()) idcheckDto: IdcheckDto) {
    return await this.userService.checkId(idcheckDto);
  }

  // 유저 전체목록 조회 (test 성공)
  // GET : http://localhost:3000/user
  // GET : http://localhost:3000/user?page=${page}&pageSize=${pageSize}
  @Get()
  async findAllUsers(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return await this.userService.findAllUsers(page, pageSize);
  }

  // 단일 유저조회 (test 성공)
  // GET : http://localhost:3000/user/id
  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }

  // 정보수정
  // PATCH : http://localhost:3000/user/id
  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  // 다중 회원 삭제
  // DELETE : http://localhost:3000/user/id
  @Delete()
  async deleteUsers(@Body() deleteUsersDto: DeleteUsersDto) {
    return await this.userService.deleteUsers(deleteUsersDto.ids);
  }

  // 단일 회원 삭제
  // DELETE : http://localhost:3000/user/id
  // @Delete(':id')
  // async deleteUser(@Param('id') id: string) {
  //   return await this.userService.deleteUser(id);
  // }
}
