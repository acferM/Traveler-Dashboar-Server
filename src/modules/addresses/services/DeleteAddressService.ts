import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IAddressesRepository from '../repositories/IAddressesRepository';

@injectable()
class DeleteAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const address = await this.addressesRepository.findById(id);

    if (!address) {
      throw new AppError('This address does not exists');
    }

    await this.addressesRepository.delete(address);
  }
}

export default DeleteAddressService;
