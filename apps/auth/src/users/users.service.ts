import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { hash, compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create({
      ...createUserDto,
      password: await hash(createUserDto.password, 12),
    });
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    return user;
  }
}
