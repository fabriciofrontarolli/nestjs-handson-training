import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDtoConverter } from './dto/user-dto-converter';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: User[];

  constructor(private userDtoConverter: UserDtoConverter) {
    this.users = [];
  }

  create(createUserDto: CreateUserDto) {
    const user = this.userDtoConverter.convertToUserEntity(createUserDto);
    user.id = uuidv4();
    this.users.push(user);
    return user;
  }

  findAll(): UserDto[] {
    const usersDto = this.userDtoConverter.convertUsersToDto(this.users);
    return usersDto;
  }

  findOne(id: string): UserDto {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException();
    const userDto = this.userDtoConverter.convertUserToDto(user);
    return userDto;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    if (updateUserDto.firstName) user.firstName = updateUserDto.firstName;
    if (updateUserDto.lastName) user.lastName = updateUserDto.lastName;
    const index = this.users.findIndex(u => u.id === id);
    this.users[index].firstName = updateUserDto.firstName;
    this.users[index].lastName = updateUserDto.lastName;
    return user;
  }

  remove(id: string) {
    const updatedList = this.users.filter(u => u.id !== id);
    this.users = updatedList;
  }
}
