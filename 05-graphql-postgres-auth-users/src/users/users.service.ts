import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { SignupInput } from '../auth/dto/inputs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { ValidRoles } from '../auth/enums/valid-roles.enum';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(signupInput: SignupInput): Promise<User> {
    try {
      return await this.usersRepository.save({
        ...signupInput,
        password: bcrypt.hashSync(signupInput.password, 10),
      });
    } catch (error) {
      this.handleBDErrors(error);
    }
  }

  findAll(roles: ValidRoles[]): Promise<User[]> {
    if (roles.length === 0) return this.usersRepository.find();

    return this.usersRepository
      .createQueryBuilder()
      .andWhere('ARRAY[roles] && ARRAY[:...roles]')
      .setParameter('roles', roles)
      .getMany();
  }

  findOne(id: string): Promise<User> {
    throw new Error('Method not implemented.' + id);
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.usersRepository.findOneOrFail({ where: { email } });
    } catch (error) {
      this.handleBDErrors({
        code: 'err-0001',
        detail: `User with email ${email} not found`,
      });
    }
  }

  async findOneById(id: string): Promise<User> {
    try {
      return await this.usersRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      this.handleBDErrors({
        code: 'err-0001',
        detail: `User with id ${id} not found`,
      });
    }
  }

  blockUser(id: string): Promise<User> {
    throw new Error('Method not implemented.' + id);
  }

  private handleBDErrors(error: any): never {
    this.logger.error(error);

    if (error.code === '23505') {
      throw new BadRequestException(error.detail.replace('Key ', ''));
    }

    if (error.code === 'err-0001') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException('Please check server logs');
  }
}
