import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import ListCategoriesService from './ListCategoriesService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let listCategories: ListCategoriesService;

describe('List Categories Service', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    listCategories = new ListCategoriesService(fakeCategoriesRepository);
  });

  it('Should be able to list all the categories', async () => {
    await fakeCategoriesRepository.create('Test Category');
    await fakeCategoriesRepository.create('Test Category1');
    await fakeCategoriesRepository.create('Test Category2');

    const categories = await listCategories.execute();

    expect(categories).toHaveLength(3);
  });
});
