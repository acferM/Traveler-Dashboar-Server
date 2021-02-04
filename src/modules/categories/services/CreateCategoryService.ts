import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Category from '../infra/typeorm/entities/Category';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(name: string): Promise<Category> {
    const categoryExists = await this.categoriesRepository.findByName(
      name.toLowerCase(),
    );

    if (categoryExists) {
      throw new AppError('This category already exists');
    }

    const category = this.categoriesRepository.create(name);

    return category;
  }
}

export default CreateCategoryService;
