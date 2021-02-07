import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import ICitiesRepository from '../repositories/ICitiesRepository';

@injectable()
class DeleteCityService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute(id: string): Promise<void> {
    const city = await this.citiesRepository.findById(id);

    if (!city) {
      throw new AppError('This city does not exists');
    }

    await this.storageProvider.deleteFile(city.image);

    await this.citiesRepository.delete(city);
  }
}

export default DeleteCityService;
