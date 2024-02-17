import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { SignupInput } from '../auth/dto/inputs/signup.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(signupInput: SignupInput): Promise<User> {
    try {
      const newUser = this.usersRepository.create(signupInput);

      return await this.usersRepository.save(newUser);
    } catch (error) {
      this.handleBDErrors(error);
    }
  }

  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  findOne(id: string): Promise<User> {
    throw new Error('Method not implemented.' + id);
  }

  blockUser(id: string): Promise<User> {
    throw new Error('Method not implemented.' + id);
  }

  private handleBDErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail.replace('Key ', ''));
    }

    this.logger.error(error);

    throw new InternalServerErrorException('Please check server logs');
  }
}
