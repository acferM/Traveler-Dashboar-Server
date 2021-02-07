import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import DeleteCategoryService from './DeleteCategoryService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let fakeStorageProvider: FakeStorageProvider;
let deleteCategory: DeleteCategoryService;

describe('Create Category Service', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    fakeStorageProvider = new FakeStorageProvider();
    deleteCategory = new DeleteCategoryService(
      fakeCategoriesRepository,
      fakeStorageProvider,
    );
  });

  it('Should be able to delete a category', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'fake name',
      icon: 'fake icon',
    });

    const deleteFunction = jest.spyOn(fakeCategoriesRepository, 'delete');
    const deleteImageFunction = jest.spyOn(fakeStorageProvider, 'deleteFile');

    await deleteCategory.execute(category.id);

    expect(deleteImageFunction).toHaveBeenCalledWith(category.icon);
    expect(deleteFunction).toHaveBeenCalledWith(category);
  });

  it('Should not be able to delete a inexistent category', async () => {
    await expect(deleteCategory.execute('fake id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
