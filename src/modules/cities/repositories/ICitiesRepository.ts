import City from '../infra/typeorm/entities/City';
import ICreateCityDTO from '../dtos/ICreateCityDTO';

export default interface ICitiesRepository {
  findById(id: string): Promise<City | undefined>;
  findByName(name: string): Promise<City | undefined>;
  list(): Promise<City[]>;
  create(data: ICreateCityDTO): Promise<City>;
  save(city: City): Promise<City>;
}
