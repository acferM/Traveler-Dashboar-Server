import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import UpdateCategoryService from './UpdateCategoryService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateCategory: UpdateCategoryService;

describe('Update Category Service', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateCategory = new UpdateCategoryService(
      fakeCategoriesRepository,
      fakeStorageProvider,
    );
  });

  it('Should be able to update a category', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'Test Category',
      icon: 'Test Icon',
    });

    const updatedCategory = await updateCategory.execute({
      category_id: category.id,
      name: 'Updated Category',
      icon: 'Updated Icon',
    });

    expect(updatedCategory.id).toEqual(category.id);
    expect(updatedCategory.name).toEqual('Updated Category');
    expect(updatedCategory.icon).toEqual('Updated Icon');
  });

  it('Should be able to update a category without a icon update', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'Test Category',
      icon: 'Test Icon',
    });

    const updatedCategory = await updateCategory.execute({
      category_id: category.id,
      name: 'Updated Category',
      icon: undefined,
    });

    expect(updatedCategory.id).toEqual(category.id);
    expect(updatedCategory.name).toEqual('Updated Category');
    expect(updatedCategory.icon).toEqual('Test Icon');
  });

  it('Should not be able to update a inexistent category', async () => {
    await expect(
      updateCategory.execute({
        category_id: 'fake id',
        name: 'Updated Category',
        icon: undefined,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update a category name to a already used name', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'Test Category',
      icon: 'Test Icon',
    });

    await fakeCategoriesRepository.create({
      name: 'Test Category2',
      icon: 'Test Icon',
    });

    await expect(
      updateCategory.execute({
        category_id: category.id,
        name: 'Test Category2',
        icon: undefined,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
