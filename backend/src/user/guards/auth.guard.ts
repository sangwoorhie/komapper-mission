import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

// 1. 로그인 시 사용하는 LocalStrategy
// 2. 로그인 후 인증 전반을 담당하는 JwtStrategy
// 3. Access Token 만료 시 Refresh Token을 검증하는 RefreshStrategy => 안함
