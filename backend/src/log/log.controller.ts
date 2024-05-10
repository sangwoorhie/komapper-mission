import { Controller, Get, Param, Query } from '@nestjs/common';
import { LogService } from './log.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('log')
@ApiTags('로그 API')
export class LogController {
  constructor(private readonly logService: LogService) {}

  // 페이지네이션 로그 전체조회 (test 성공)
  // GET : http://localhost:3000/log?page=${page}&pageSize=${pageSize}
  @Get()
  @ApiOperation({
    summary: '로그 전체조회',
    description: '로그를 전체조회한다. (페이지네이션)',
  })
  async findAllLogs(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    const getTotalLogs = await this.logService.findAllLogs(page, pageSize);
    try {
      return getTotalLogs;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  // 페이지네이션 안한 로그 전체목록 조회
  // GET : http://localhost:3000/log
  // @Get()
  // async getAllLogs() {
  //   return await this.logService.getAllLogs();
  // }

  // Total 로그 수 (test 성공)
  // GET : http://localhost:3000/log/count
  @Get('count')
  @ApiOperation({
    summary: 'Total 로그 수',
    description: 'Total 로그 수를 조회한다.',
  })
  async getLogCount(): Promise<number> {
    const totalLogNumber = await this.logService.getLogCount();
    try {
      return totalLogNumber;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  // 로그 단일조회 (test 성공)
  // GET : http://localhost:3000/log/id
  @Get('/:id')
  @ApiOperation({
    summary: '로그 단일조회',
    description: '로그 단일조회',
  })
  async getLogById(@Param('id') id: string) {
    const getSingleLog = await this.logService.getLogById(id);
    try {
      return getSingleLog;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }
}
