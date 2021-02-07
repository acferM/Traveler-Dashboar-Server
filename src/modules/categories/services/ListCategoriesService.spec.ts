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
    await fakeCategoriesRepository.create({
      name: 'Test Category',
      icon: 'Test Icon',
    });
    await fakeCategoriesRepository.create({
      name: 'Test Category1',
      icon: 'Test Icon',
    });
    await fakeCategoriesRepository.create({
      name: 'Test Category2',
      icon: 'Test Icon',
    });

    const categories = await listCategories.execute();

    expect(categories).toHaveLength(3);
  });
});
