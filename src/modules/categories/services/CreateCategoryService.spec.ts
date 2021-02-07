import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import CreateCategoryService from './CreateCategoryService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let fakeStorageProvider: FakeStorageProvider;
let createCategory: CreateCategoryService;

describe('Create Category Service', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    fakeStorageProvider = new FakeStorageProvider();
    createCategory = new CreateCategoryService(
      fakeCategoriesRepository,
      fakeStorageProvider,
    );
  });

  it('Should be able to create a new category', async () => {
    const category = await createCategory.execute({
      name: 'Test Category',
      icon: 'Test Icon',
    });

    expect(category).toHaveProperty('id');
    expect(category.name).toEqual('Test Category');
  });

  it('Should not be able to create a already existent category', async () => {
    await createCategory.execute({ name: 'Test Category', icon: 'Test Icon' });

    await expect(
      createCategory.execute({ name: 'test category', icon: 'Test Icon' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
