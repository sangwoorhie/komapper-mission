import { Controller, Get, Param, Query } from '@nestjs/common';
import { LogService } from './log.service';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  // 페이지네이션 로그 전체조회 (test 성공)
  // GET : http://localhost:3000/log?page=${page}&pageSize=${pageSize}
  @Get()
  async findAllLogs(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return await this.logService.findAllLogs(page, pageSize);
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
  async getLogCount(): Promise<number> {
    return this.logService.getLogCount();
  }

  // 로그 단일조회 (test 성공)
  // GET : http://localhost:3000/log/id
  @Get('/:id')
  async getLogById(@Param('id') id: string) {
    return await this.logService.getLogById(id);
  }
}
