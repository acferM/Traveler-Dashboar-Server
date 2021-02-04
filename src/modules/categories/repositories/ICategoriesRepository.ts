import Category from '../infra/typeorm/entities/Category';

export default interface ICategoriesRepository {
  listAll(): Promise<Category[]>;
  findByName(name: string): Promise<Category | undefined>;
  create(name: string): Promise<Category>;
}
