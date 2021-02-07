import { getRepository, Repository } from 'typeorm';

import ICreateCityDTO from '@modules/cities/dtos/ICreateCityDTO';
import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';

import City from '../entities/City';

class CitiesRepository implements ICitiesRepository {
  private ormRepository: Repository<City>;

  constructor() {
    this.ormRepository = getRepository(City);
  }

  async findByName(name: string): Promise<City | undefined> {
    const cities = await this.ormRepository.find();

    const find = cities.find(
      city => city.name.toLowerCase() === name.toLowerCase(),
    );

    return find;
  }

  async findById(id: string): Promise<City | undefined> {
    const city = this.ormRepository.findOne(id);

    return city;
  }

  async create(data: ICreateCityDTO): Promise<City> {
    const city = this.ormRepository.create(data);

    await this.ormRepository.save(city);

    return city;
  }

  async list(): Promise<City[]> {
    const cities = await this.ormRepository.find();

    return cities;
  }

  async save(city: City): Promise<City> {
    return this.ormRepository.save(city);
  }

  async delete(city: City): Promise<void> {
    await this.ormRepository.remove(city);
  }
}

export default CitiesRepository;
