import Category from '@modules/categories/infra/typeorm/entities/Category';
import { v4 } from 'uuid';
import ICategoriesRepository from '../ICategoriesRepository';

class FakeCategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  async findByName(name: string): Promise<Category | undefined> {
    const find = this.categories.find(
      category => category.name.toLowerCase() === name,
    );

    return find;
  }

  async create(name: string): Promise<Category> {
    const category = new Category();

    Object.assign(category, { id: v4(), name });

    this.categories.push(category);

    return category;
  }

  async listAll(): Promise<Category[]> {
    return this.categories;
  }
}

export default FakeCategoriesRepository;
