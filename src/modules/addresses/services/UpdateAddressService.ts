import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IAddressesRepository from '../repositories/IAddressesRepository';
import Address from '../infra/typeorm/entities/Address';

interface IRequest {
  address_id: string;
  zip_code: string;
  street: string;
  neighborhood: string;
  number?: string;
}

@injectable()
class UpdateAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  async execute({
    address_id,
    zip_code,
    street,
    neighborhood,
    number = undefined,
  }: IRequest): Promise<Address> {
    const address = await this.addressesRepository.findById(address_id);

    if (!address) {
      throw new AppError('This address does not exists');
    }

    const addressExists = await this.addressesRepository.findByZipAndStreetAndNumber(
      {
        zip_code,
        street,
        number,
      },
    );

    if (addressExists && addressExists.id !== address.id) {
      throw new AppError('This address already exists');
    }

    const zipRegex = /^[0-9]{5}-[0-9]{3}$/;

    if (!zipRegex.test(zip_code)) {
      throw new AppError(
        'Zip_code does not match regex: /^[0-9]{5}-[0-9]{3}$/',
      );
    }

    address.zip_code = zip_code;
    address.street = street;
    address.neighborhood = neighborhood;

    if (number) {
      address.number = number;
    }

    const updatedAddress = await this.addressesRepository.save(address);

    return updatedAddress;
  }
}

export default UpdateAddressService;
