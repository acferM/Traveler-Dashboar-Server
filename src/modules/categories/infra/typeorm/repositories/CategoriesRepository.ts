import { getRepository, Repository } from 'typeorm';
import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import Category from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  async findById(id: string): Promise<Category | undefined> {
    const category = this.ormRepository.findOne(id);

    return category;
  }

  async findByName(name: string): Promise<Category | undefined> {
    const categories = await this.ormRepository.find();

    const find = categories.find(
      category => category.name.toLowerCase() === name,
    );

    return find;
  }

  async create({ name, icon }: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create({ name, icon });

    await this.ormRepository.save(category);

    return category;
  }

  async listAll(): Promise<Category[]> {
    const categories = await this.ormRepository.find();

    return categories;
  }

  async save(category: Category): Promise<Category> {
    return this.ormRepository.save(category);
  }

  async delete(category: Category): Promise<void> {
    await this.ormRepository.remove(category);
  }
}

export default CategoriesRepository;
