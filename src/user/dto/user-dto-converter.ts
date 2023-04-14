import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "./create-user.dto";
import { UpdateUserDto } from "./update-user.dto";
import { UserDto } from "./user.dto";

@Injectable()
export class UserDtoConverter {
  convertToUserEntity(createUserDto: CreateUserDto): User {
    const user = new User();

    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;

    return user;
  }

  convertUsersToDto(users: User[]): UserDto[] {
    const mapped = users.map(u => {
      const userDto = new UserDto();
      userDto.id = u.id;
      userDto.firstName = u.firstName;
      userDto.lastName = u.lastName;
      userDto.email = u.email;
      return userDto
    });

    return mapped;
  }

  convertUserToDto(user: User): UserDto {
    const userDto = new UserDto();
    userDto.id = user.id;
    userDto.firstName = user.firstName;
    userDto.lastName = user.lastName;
    userDto.email = user.email;
    return userDto;
  }
}
