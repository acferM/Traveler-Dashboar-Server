import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeCitiesRepository from '../repositories/fakes/FakeCitiesRepository';
import DeleteCityService from './DeleteCityService';

let fakeCitiesRepository: FakeCitiesRepository;
let fakeStorageProvider: FakeStorageProvider;
let deleteCity: DeleteCityService;

describe('Delete City Service', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository();
    fakeStorageProvider = new FakeStorageProvider();
    deleteCity = new DeleteCityService(
      fakeCitiesRepository,
      fakeStorageProvider,
    );
  });

  it('Should be able to delete a city', async () => {
    const city = await fakeCitiesRepository.create({
      description: 'fake description',
      image: 'fake image',
      name: 'fake name',
    });

    const deleteFunction = jest.spyOn(fakeCitiesRepository, 'delete');
    const deleteImageFunction = jest.spyOn(fakeStorageProvider, 'deleteFile');

    await deleteCity.execute(city.id);

    expect(deleteImageFunction).toHaveBeenCalledWith(city.image);
    expect(deleteFunction).toHaveBeenCalledWith(city);
  });

  it('Should not be able to delete a inexistent city', async () => {
    await expect(deleteCity.execute('fake id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
