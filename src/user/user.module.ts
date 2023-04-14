import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserDtoConverter } from './dto/user-dto-converter';

@Module({
  controllers: [UserController],
  providers: [UserService, UserDtoConverter]
})
export class UserModule {}
