import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserDocument } from './users/models/user.schema';
import { CurrentUser } from './utils/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  public async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) responce: Response,
  ) {
    await this.authService.login(user, responce);
    responce.send(user);
  }
}
