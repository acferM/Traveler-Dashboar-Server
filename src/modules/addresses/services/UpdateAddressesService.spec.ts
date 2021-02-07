import AppError from '@shared/errors/AppError';
import FakeAddressesRepository from '../repositories/fakes/FakeAddressesRepository';
import UpdateAddressService from './UpdateAddressService';

let fakeAddressesRepository: FakeAddressesRepository;
let updateAddress: UpdateAddressService;

describe('Update Addresses Service', () => {
  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressesRepository();
    updateAddress = new UpdateAddressService(fakeAddressesRepository);
  });

  it('Should be able to update a address', async () => {
    const address = await fakeAddressesRepository.create({
      zip_code: '00000-000',
      street: 'Fake Street',
      neighborhood: 'Fake neighborhood',
    });

    const updatedAddress = await updateAddress.execute({
      address_id: address.id,
      zip_code: '11111-111',
      neighborhood: 'New Fake Neighborhood',
      street: 'New Fake Street',
      number: '123',
    });

    expect(updatedAddress.id).toEqual(address.id);
    expect(updatedAddress.zip_code).toEqual('11111-111');
    expect(updatedAddress.neighborhood).toEqual('New Fake Neighborhood');
    expect(updatedAddress.street).toEqual('New Fake Street');
    expect(updatedAddress.number).toEqual('123');
  });

  it('Should not be able to update address zip code with mismatch regex', async () => {
    const address = await fakeAddressesRepository.create({
      zip_code: '00000-000',
      street: 'Fake Street',
      neighborhood: 'Fake neighborhood',
    });

    await expect(
      updateAddress.execute({
        address_id: address.id,
        zip_code: '11111-1112',
        neighborhood: 'New Fake Neighborhood',
        street: 'New Fake Street',
        number: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update address zip code to already existent address', async () => {
    const address = await fakeAddressesRepository.create({
      zip_code: '00000-000',
      street: 'Fake Street',
      neighborhood: 'Fake neighborhood',
    });

    await fakeAddressesRepository.create({
      zip_code: '11111-111',
      neighborhood: 'Fake Neighborhood',
      street: 'New Fake Street',
      number: '123',
    });

    await expect(
      updateAddress.execute({
        address_id: address.id,
        zip_code: '11111-111',
        neighborhood: 'New Fake Neighborhood',
        street: 'New Fake Street',
        number: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update a inexistent address', async () => {
    await expect(
      updateAddress.execute({
        address_id: 'Fake Id',
        zip_code: '11111-111',
        neighborhood: 'New Fake Neighborhood',
        street: 'New Fake Street',
        number: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to update a address without a number', async () => {
    const address = await fakeAddressesRepository.create({
      zip_code: '00000-000',
      street: 'Fake Street',
      neighborhood: 'Fake neighborhood',
    });

    const updatedAddress = await updateAddress.execute({
      address_id: address.id,
      zip_code: '11111-111',
      neighborhood: 'New Fake Neighborhood',
      street: 'New Fake Street',
    });

    expect(updatedAddress.id).toEqual(address.id);
    expect(updatedAddress.zip_code).toEqual('11111-111');
    expect(updatedAddress.neighborhood).toEqual('New Fake Neighborhood');
    expect(updatedAddress.street).toEqual('New Fake Street');
  });
});
