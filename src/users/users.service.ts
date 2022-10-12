import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findOne(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }
}
