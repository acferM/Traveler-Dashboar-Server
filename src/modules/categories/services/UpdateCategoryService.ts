import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Category from '../infra/typeorm/entities/Category';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface IRequest {
  category_id: string;
  name: string;
  icon: string | undefined;
}

@injectable()
class UpdateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ category_id, name, icon }: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.findById(category_id);

    if (!category) {
      throw new AppError('This category does not exists');
    }

    const categoryWithUpdatedName = await this.categoriesRepository.findByName(
      name,
    );

    if (categoryWithUpdatedName && categoryWithUpdatedName.id !== category.id) {
      throw new AppError('This name is already in use');
    }

    category.name = name;

    if (icon) {
      await this.storageProvider.deleteFile(category.icon);

      const file = await this.storageProvider.saveFile(icon);

      category.icon = file;
    }

    const updatedCategory = await this.categoriesRepository.save(category);

    return updatedCategory;
  }
}

export default UpdateCategoryService;
