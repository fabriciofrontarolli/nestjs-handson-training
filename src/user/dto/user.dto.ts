import { UserInterface } from "../interfaces/user.interface";

export class UserDto implements UserInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
