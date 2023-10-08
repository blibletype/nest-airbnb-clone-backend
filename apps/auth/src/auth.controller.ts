import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserDocument } from './users/models/user.schema';
import { CurrentUser } from './utils/current-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  public async login(@CurrentUser() user: UserDocument) {
    return {
      userId: user._id,
      token: await this.authService.getTokenForUser(user),
    };
  }
}
