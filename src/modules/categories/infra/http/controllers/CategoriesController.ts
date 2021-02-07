import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCategoryService from '@modules/categories/services/CreateCategoryService';
import ListCategoriesService from '@modules/categories/services/ListCategoriesService';
import UpdateCategoryService from '@modules/categories/services/UpdateCategoryService';
import DeleteCategoryService from '@modules/categories/services/DeleteCategoryService';

class CategoriesController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCategory = container.resolve(CreateCategoryService);

    const category = await createCategory.execute({
      name,
      icon: request.file.filename,
    });

    return response.json(classToClass(category));
  }

  async index(request: Request, response: Response): Promise<Response> {
    const listCategories = container.resolve(ListCategoriesService);

    const categories = await listCategories.execute();

    return response.json(classToClass(categories));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { category_id, name } = request.body;

    const updateCategory = container.resolve(UpdateCategoryService);

    const category = await updateCategory.execute({
      category_id,
      name,
      icon: request.file ? request.file.filename : undefined,
    });

    return response.json(classToClass(category));
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;

    const deleteCategory = container.resolve(DeleteCategoryService);

    await deleteCategory.execute(category_id);

    return response.status(204).send();
  }
}

export default CategoriesController;
