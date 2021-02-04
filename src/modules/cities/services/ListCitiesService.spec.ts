import FakeCitiesRepository from '../repositories/fakes/FakeCitiesRepository';
import ListCitiesService from './ListCitiesService';

let fakeCitiesRepository: FakeCitiesRepository;
let listCities: ListCitiesService;

describe('List Cities Service', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository();
    listCities = new ListCitiesService(fakeCitiesRepository);
  });

  it('Should be able to list all the cities', async () => {
    await fakeCitiesRepository.create({
      name: 'Test City1',
      image: 'Test City1.png',
      description: 'Test City1 description',
    });

    await fakeCitiesRepository.create({
      name: 'Test City2',
      image: 'Test City2.png',
      description: 'Test City2 description',
    });

    await fakeCitiesRepository.create({
      name: 'Test City3',
      image: 'Test City3.png',
      description: 'Test City3 description',
    });

    await fakeCitiesRepository.create({
      name: 'Test City4',
      image: 'Test City4.png',
      description: 'Test City4 description',
    });

    const cities = await listCities.execute();

    expect(cities).toHaveLength(4);
  });
});
