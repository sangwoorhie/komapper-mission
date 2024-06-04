import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from '../user.service';
// import { User } from '../entities/user.entity';
// import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);
  constructor(private userService: UserService) {
    super({
      usernameField: 'id',
      passwordField: 'password',
    });
  }

  public async validate(id: string, password: string): Promise<any> {
    const user = await this.userService.validateUser(id, password);

    if (!user) {
      throw new UnauthorizedException('아이디 혹은 비밀번호를 확인해주세요.');
    }
    return user;
  }
}
