import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeCitiesRepository from '../repositories/fakes/FakeCitiesRepository';
import CreateCityService from './CreateCityService';

let fakeCitiesRepository: FakeCitiesRepository;
let fakeStorageProvider: FakeStorageProvider;
let createCity: CreateCityService;

describe('Create City Service', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository();
    fakeStorageProvider = new FakeStorageProvider();
    createCity = new CreateCityService(
      fakeCitiesRepository,
      fakeStorageProvider,
    );
  });

  it('Should be able to create a new city', async () => {
    const city = await createCity.execute({
      name: 'Test City',
      image: 'Test Image',
      description: 'Test Description',
    });

    expect(city).toHaveProperty('id');
    expect(city.name).toEqual('Test City');
  });

  it('Should not be able to create a already existent city', async () => {
    await createCity.execute({
      name: 'Test City',
      image: 'Test Image',
      description: 'Test Description',
    });

    await expect(
      createCity.execute({
        name: 'Test City',
        image: 'Test Image',
        description: 'Test Description',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
