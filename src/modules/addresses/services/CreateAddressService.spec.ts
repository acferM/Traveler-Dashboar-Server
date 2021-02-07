import AppError from '@shared/errors/AppError';
import FakeAddressesRepository from '../repositories/fakes/FakeAddressesRepository';
import CreateAddressService from './CreateAddressService';

let fakeAddressesRepository: FakeAddressesRepository;
let createAddresses: CreateAddressService;

describe('Delete Category Service', () => {
  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressesRepository();
    createAddresses = new CreateAddressService(fakeAddressesRepository);
  });

  it('Should be able to create a new address', async () => {
    const address = await createAddresses.execute({
      zip_code: '00000-000',
      neighborhood: 'Fake Neighborhood',
      street: 'Fake Street',
      number: '0o0',
    });

    expect(address).toHaveProperty('id');
    expect(address.zip_code).toEqual('00000-000');
  });

  it('Should be able to create a new address without a number', async () => {
    const address = await createAddresses.execute({
      zip_code: '00000-000',
      neighborhood: 'Fake Neighborhood',
      street: 'Fake Street',
    });

    expect(address).toHaveProperty('id');
    expect(address.zip_code).toEqual('00000-000');
  });

  it('Should not be able to create a already existent address', async () => {
    await fakeAddressesRepository.create({
      zip_code: '00000-000',
      neighborhood: 'Fake Neighborhood',
      street: 'Fake Street',
      number: '0o0',
    });

    await expect(
      createAddresses.execute({
        zip_code: '00000-000',
        neighborhood: 'Fake Neighborhood2',
        street: 'Fake Street',
        number: '0o0',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a address with mismatch zip code regex', async () => {
    await expect(
      createAddresses.execute({
        zip_code: '00000-000000000000',
        neighborhood: 'Fake Neighborhood2',
        street: 'Fake Street',
        number: '0o0',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
