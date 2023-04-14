import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDtoConverter } from './dto/user-dto-converter';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserDtoConverter],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe(UserService.prototype.create, () => {
    it('should create a user', () => {
      const createUserDto = new CreateUserDto();
      createUserDto.firstName = "Fabricio";
      createUserDto.lastName = "Frontarolli";
      createUserDto.email = "fabricio.frontarolli@gmail.com";

      const user = service.create(createUserDto);
      expect(user.id).toBeDefined();
    });
  });
  describe(UserService.prototype.update, () => {
    it('should update a user', () => {
      const createUserDto = new CreateUserDto();
      createUserDto.firstName = "Fabricio";
      createUserDto.lastName = "Frontarolli";
      createUserDto.email = "fabricio.frontarolli@gmail.com";

      // create
      const user = service.create(createUserDto);
      expect(user.id).toBeDefined();

      // find
      const usersAfterCreation = service.findAll();
      expect(usersAfterCreation.length).toBe(1);

      // update
      const updateUserDto = new UpdateUserDto();
      updateUserDto.firstName = "Fernando";
      updateUserDto.lastName = "Frontarolli";
      updateUserDto.email = "fernando.frontarolli@gmail.com";
      const updatedUserDto = service.update(user.id, updateUserDto);

      // find
      const userUpdated = service.findOne(user.id);

      expect(userUpdated.firstName).toBe(updatedUserDto.firstName);
      expect(userUpdated.lastName).toBe(updatedUserDto.lastName);
    });
  });
  describe(UserService.prototype.remove, () => {
    it('should remove a user', () => {
      const createUserDto = new CreateUserDto();
      createUserDto.firstName = "Fabricio";
      createUserDto.lastName = "Frontarolli";
      createUserDto.email = "fabricio.frontarolli@gmail.com";

      // create
      const user = service.create(createUserDto);
      expect(user.id).toBeDefined();

      // find
      const usersAfterCreation = service.findAll();
      expect(usersAfterCreation.length).toBe(1);

      // remove
      service.remove(user.id)

      // find
      const usersAfterRemoval = service.findAll();
      expect(usersAfterRemoval.length).toBe(0);
    });
  });
  describe(UserService.prototype.findAll, () => {
    it('should fetch all users', () => {
      const users = service.findAll();
      expect(users.length).toBe(0);
    });
  });
  describe(UserService.prototype.findOne, () => {
    it('should find a user', () => {
      const createUserDto = new CreateUserDto();
      createUserDto.firstName = "Fabricio";
      createUserDto.lastName = "Frontarolli";
      createUserDto.email = "fabricio.frontarolli@gmail.com";

      const createdUser = service.create(createUserDto);
      expect(createdUser.id).toBeDefined();

      const user = service.findOne(createdUser.id);
      expect(user).toBeDefined();
    });
  });
});
