import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from './users/models/user.schema';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public async getTokenForUser(user: UserDocument): Promise<string> {
    return this.jwtService.sign({
      userId: user._id,
      email: user.email,
    });
  }
}
