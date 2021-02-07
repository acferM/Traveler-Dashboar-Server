import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import Category from '../infra/typeorm/entities/Category';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  icon: string;
}

@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ name, icon }: IRequest): Promise<Category> {
    const categoryExists = await this.categoriesRepository.findByName(
      name.toLowerCase(),
    );

    if (categoryExists) {
      throw new AppError('This category already exists');
    }

    const filename = await this.storageProvider.saveFile(icon);

    const category = this.categoriesRepository.create({ name, icon: filename });

    return category;
  }
}

export default CreateCategoryService;
