import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCategoryService from '@modules/categories/services/CreateCategoryService';
import ListCategoriesService from '@modules/categories/services/ListCategoriesService';

class CategoriesController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCategory = container.resolve(CreateCategoryService);

    const category = await createCategory.execute(name);

    return response.json(category);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const listCategories = container.resolve(ListCategoriesService);

    const categories = await listCategories.execute();

    return response.json(categories);
  }
}

export default CategoriesController;
