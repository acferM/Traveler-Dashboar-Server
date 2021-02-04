import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('Authenticate User Service', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to authenticate a user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: 'hashed:123',
    });

    const response = await authenticateUser.execute({
      email: 'jhondoe@example.com',
      password: '123',
    });

    expect(response).toHaveProperty('user');
    expect(response.user).toEqual(user);
    expect(response).toHaveProperty('token');
  });

  it('Should not be able to authenticate a inexistent user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'jhondoe@example.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate a user with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: 'hashed:123',
    });

    await expect(
      authenticateUser.execute({
        email: 'jhondoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
