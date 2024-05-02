import { Controller, Get, Param, Query } from '@nestjs/common';
import { LogService } from './log.service';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  // 로그 전체조회
  // GET : http://localhost:3000/log
  // GET : http://localhost:3000/log?page=${page}&pageSize=${pageSize}
  @Get()
  async findAllLogs(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return await this.logService.findAllLogs(page, pageSize);
  }

  // 로그 단일조회
  // GET : http://localhost:3000/log/id
  @Get('/:id')
  async getLogById(@Param('id') id: string) {
    return await this.logService.getLogById(id);
  }
}
