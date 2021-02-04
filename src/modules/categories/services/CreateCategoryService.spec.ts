import AppError from '@shared/errors/AppError';
import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import CreateCategoryService from './CreateCategoryService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let createCategory: CreateCategoryService;

describe('Create Category Service', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    createCategory = new CreateCategoryService(fakeCategoriesRepository);
  });

  it('Should be able to create a new category', async () => {
    const category = await createCategory.execute('Test Category');

    expect(category).toHaveProperty('id');
    expect(category.name).toEqual('Test Category');
  });

  it('Should not be able to create a already existent category', async () => {
    await createCategory.execute('Test Category');

    await expect(
      createCategory.execute('test category'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
