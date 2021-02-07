import AppError from '@shared/errors/AppError';
import FakeAddressesRepository from '../repositories/fakes/FakeAddressesRepository';
import DeleteAddressService from './DeleteAddressService';

let fakeAddressRepository: FakeAddressesRepository;
let deleteAddress: DeleteAddressService;

describe('Delete Address Service', () => {
  beforeEach(() => {
    fakeAddressRepository = new FakeAddressesRepository();
    deleteAddress = new DeleteAddressService(fakeAddressRepository);
  });

  it('Should be able to delete a address', async () => {
    const address = await fakeAddressRepository.create({
      zip_code: '12345-678',
      neighborhood: 'Fake Neighborhood',
      street: 'Fake Street',
    });

    const deleteFunction = jest.spyOn(fakeAddressRepository, 'delete');

    await deleteAddress.execute(address.id);

    expect(deleteFunction).toHaveBeenCalledWith(address);
  });

  it('Should not be able to delete a inexistent address', async () => {
    await expect(deleteAddress.execute('Fake Id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
