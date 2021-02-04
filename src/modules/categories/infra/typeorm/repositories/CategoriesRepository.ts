import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import { getRepository, Repository } from 'typeorm';
import Category from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  async findByName(name: string): Promise<Category | undefined> {
    const categories = await this.ormRepository.find();

    const find = categories.find(
      category => category.name.toLowerCase() === name,
    );

    console.log(categories);

    return find;
  }

  async create(name: string): Promise<Category> {
    const category = this.ormRepository.create({ name });

    await this.ormRepository.save(category);

    return category;
  }

  async listAll(): Promise<Category[]> {
    const categories = await this.ormRepository.find();

    return categories;
  }
}

export default CategoriesRepository;
