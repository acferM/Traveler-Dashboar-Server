import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import City from '../infra/typeorm/entities/City';
import ICitiesRepository from '../repositories/ICitiesRepository';

interface IRequest {
  id: string;
  name: string;
  image: string | undefined;
  description: string;
}

@injectable()
class UpdateCityService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ id, name, image, description }: IRequest): Promise<City> {
    const city = await this.citiesRepository.findById(id);

    if (!city) {
      throw new AppError('City does not exists');
    }

    city.name = name;
    city.description = description;

    if (image) {
      await this.storageProvider.deleteFile(city.image);

      const filename = await this.storageProvider.saveFile(image);

      city.image = filename;
    }

    await this.citiesRepository.save(city);

    return city;
  }
}

export default UpdateCityService;
