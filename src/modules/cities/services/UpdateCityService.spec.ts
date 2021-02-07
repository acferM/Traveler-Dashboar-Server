import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeCitiesRepository from '../repositories/fakes/FakeCitiesRepository';
import UpdateCityService from './UpdateCityService';

let fakeCitiesRepository: FakeCitiesRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateCity: UpdateCityService;

describe('Update City Service', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateCity = new UpdateCityService(
      fakeCitiesRepository,
      fakeStorageProvider,
    );
  });

  it('Should be able to update a city', async () => {
    const city = await fakeCitiesRepository.create({
      name: 'Test City',
      image: 'Test Image',
      description: 'description',
    });

    const modifiedCity = await updateCity.execute({
      id: city.id,
      name: 'modified name',
      description: 'new description',
      image: 'new image',
    });

    expect(modifiedCity.id).toEqual(city.id);
    expect(modifiedCity.name).toEqual('modified name');
    expect(modifiedCity.description).toEqual('new description');
    expect(modifiedCity.image).toEqual('new image');
  });

  it('Should be able to update a city without a new image', async () => {
    const city = await fakeCitiesRepository.create({
      name: 'Test City',
      image: 'Test Image',
      description: 'description',
    });

    const modifiedCity = await updateCity.execute({
      id: city.id,
      name: 'modified name',
      description: 'new description',
      image: undefined,
    });

    expect(modifiedCity.id).toEqual(city.id);
    expect(modifiedCity.name).toEqual('modified name');
    expect(modifiedCity.description).toEqual('new description');
    expect(modifiedCity.image).toEqual('Test Image');
  });

  it('Should not be able to update a inexistent city', async () => {
    await expect(
      updateCity.execute({
        id: 'fake id',
        name: 'modified name',
        description: 'new description',
        image: undefined,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update a city with a already used name', async () => {
    await fakeCitiesRepository.create({
      name: 'Test City1',
      image: 'Test Image',
      description: 'description',
    });

    const city = await fakeCitiesRepository.create({
      name: 'Test City2',
      image: 'Test Image',
      description: 'description',
    });

    await expect(
      updateCity.execute({
        id: city.id,
        name: 'Test City1',
        description: 'new description',
        image: undefined,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
