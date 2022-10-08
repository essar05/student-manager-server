import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { hash } from 'bcrypt';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('encrypt')
  async createUser(@Body('password') password: string) {
    const saltOrRounds = 10;
    const hashedPassword = await hash(password, saltOrRounds);

    return hashedPassword;
  }
}
