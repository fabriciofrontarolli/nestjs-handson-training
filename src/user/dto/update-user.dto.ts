import { PartialType } from '@nestjs/mapped-types';
import { UserUpdatableInterface } from '../interfaces/user-updatable.interface';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) implements UserUpdatableInterface {
  firstName: string;
  lastName: string;
  email: string;
}
