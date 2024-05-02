import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LogModule } from './log/log.module';
import { connect } from './db/postgres';

@Module({
  imports: [UserModule, LogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    connect();
  }
}
