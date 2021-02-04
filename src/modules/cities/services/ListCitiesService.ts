import { inject, injectable } from 'tsyringe';
import City from '../infra/typeorm/entities/City';
import ICitiesRepository from '../repositories/ICitiesRepository';

@injectable()
class ListCitiesService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  async execute(): Promise<City[]> {
    const cities = await this.citiesRepository.list();

    return cities;
  }
}

export default ListCitiesService;
