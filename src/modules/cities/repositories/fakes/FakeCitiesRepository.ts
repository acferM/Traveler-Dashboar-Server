import ICreateCityDTO from '@modules/cities/dtos/ICreateCityDTO';
import City from '@modules/cities/infra/typeorm/entities/City';
import { v4 } from 'uuid';
import ICitiesRepository from '../ICitiesRepository';

class FakeCitiesRepository implements ICitiesRepository {
  private cities: City[] = [];

  async findByName(name: string): Promise<City | undefined> {
    const find = this.cities.find(city => city.name === name);

    return find;
  }

  async findById(id: string): Promise<City | undefined> {
    const find = this.cities.find(city => city.id === id);

    return find;
  }

  async create(data: ICreateCityDTO): Promise<City> {
    const city = new City();

    Object.assign(city, { id: v4(), ...data });

    this.cities.push(city);

    return city;
  }

  async list(): Promise<City[]> {
    return this.cities;
  }

  async save(city: City): Promise<City> {
    const findIndex = this.cities.findIndex(c => c.id === city.id);

    this.cities[findIndex] = city;

    return city;
  }
}

export default FakeCitiesRepository;
