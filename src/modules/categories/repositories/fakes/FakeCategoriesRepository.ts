import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';
import Category from '@modules/categories/infra/typeorm/entities/Category';
import { v4 } from 'uuid';
import ICategoriesRepository from '../ICategoriesRepository';

class FakeCategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  async findById(id: string): Promise<Category | undefined> {
    const find = this.categories.find(category => category.id === id);

    return find;
  }

  async findByName(name: string): Promise<Category | undefined> {
    const find = this.categories.find(
      category => category.name.toLowerCase() === name.toLowerCase(),
    );

    return find;
  }

  async create(data: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, { id: v4(), ...data });

    this.categories.push(category);

    return category;
  }

  async listAll(): Promise<Category[]> {
    return this.categories;
  }

  async save(category: Category): Promise<Category> {
    const findIndex = this.categories.findIndex(c => c.id === category.id);

    this.categories[findIndex] = category;

    return category;
  }

  async delete(category: Category): Promise<void> {
    const findIndex = this.categories.findIndex(c => c.id === category.id);

    this.categories.splice(findIndex, 1);
  }
}

export default FakeCategoriesRepository;
