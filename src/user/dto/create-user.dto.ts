import { UserCreatableInterface } from "../interfaces/user-creatable.interface";

export class CreateUserDto implements UserCreatableInterface {
  firstName: string;
  lastName: string;
  email: string;
}
