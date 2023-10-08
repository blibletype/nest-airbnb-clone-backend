import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UserDocument } from './models/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    await this.validateCreateUserDto(createUserDto);
    return this.usersRepository.create({
      ...createUserDto,
      password: await hash(createUserDto.password, 12),
    });
  }

  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    try {
      await this.usersRepository.findOne({ email: createUserDto.email });
    } catch (error) {
      return;
    }
    throw new UnprocessableEntityException('Email already taken');
  }

  public async verifyUser(
    email: string,
    password: string,
  ): Promise<UserDocument> {
    const user = await this.usersRepository.findOne({ email });

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    return user;
  }

  public async getUser(getUserDto: GetUserDto): Promise<UserDocument> {
    try {
      return await this.usersRepository.findOne(getUserDto);
    } catch (error) {
      throw new UnauthorizedException('Credentials are not valid');
    }
  }
}
