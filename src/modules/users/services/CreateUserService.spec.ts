import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('Create User Service', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toEqual('jhondoe@example.com');
    expect(user.password).not.toEqual('123');
  });

  it('should not be able to create a user with a already used e-mail', async () => {
    await createUserService.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123',
    });

    await expect(
      createUserService.execute({
        name: 'Jhon Doe',
        email: 'jhondoe@example.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
