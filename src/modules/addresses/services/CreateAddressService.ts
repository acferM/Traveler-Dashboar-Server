import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IAddressesRepository from '../repositories/IAddressesRepository';
import Address from '../infra/typeorm/entities/Address';

interface IRequest {
  zip_code: string;
  street: string;
  neighborhood: string;
  number?: string;
}

@injectable()
class CreateAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  async execute({
    zip_code,
    street,
    neighborhood,
    number = undefined,
  }: IRequest): Promise<Address> {
    const addressExists = await this.addressesRepository.findByZipAndStreetAndNumber(
      {
        zip_code,
        street,
        number,
      },
    );

    if (addressExists) {
      throw new AppError('This address already exists');
    }

    const zipRegex = /^[0-9]{5}-[0-9]{3}$/;

    if (!zipRegex.test(zip_code)) {
      throw new AppError(
        'Zip_code does not match regex: /^[0-9]{5}-[0-9]{3}$/',
      );
    }

    const address = await this.addressesRepository.create({
      zip_code,
      street,
      neighborhood,
      number,
    });

    return address;
  }
}

export default CreateAddressService;
