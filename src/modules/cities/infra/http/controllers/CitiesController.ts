import CreateCityService from '@modules/cities/services/CreateCityService';
import ListCitiesService from '@modules/cities/services/ListCitiesService';
import UpdateCityService from '@modules/cities/services/UpdateCityService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CitiesController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createCity = container.resolve(CreateCityService);

    const city = await createCity.execute({
      name,
      description,
      image: request.file.filename,
    });

    return response.json(classToClass(city));
  }

  async index(request: Request, response: Response): Promise<Response> {
    const listCities = container.resolve(ListCitiesService);

    const cities = await listCities.execute();

    return response.json(classToClass(cities));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { city_id, name, description } = request.body;

    const updateCity = container.resolve(UpdateCityService);

    const city = await updateCity.execute({
      id: city_id,
      name,
      description,
      image: request.file ? request.file.filename : undefined,
    });

    return response.json(classToClass(city));
  }
}

export default CitiesController;
