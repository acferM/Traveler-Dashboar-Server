import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import City from '../infra/typeorm/entities/City';
import ICitiesRepository from '../repositories/ICitiesRepository';

interface IRequest {
  name: string;
  image: string;
  description: string;
}

@injectable()
class CreateCityService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ name, image, description }: IRequest): Promise<City> {
    const cityExists = await this.citiesRepository.findByName(name);

    if (cityExists) {
      throw new AppError(`The city: "${name}" already exists`);
    }

    const filename = await this.storageProvider.saveFile(image);

    const city = await this.citiesRepository.create({
      name,
      image: filename,
      description,
    });

    return city;
  }
}

export default CreateCityService;
