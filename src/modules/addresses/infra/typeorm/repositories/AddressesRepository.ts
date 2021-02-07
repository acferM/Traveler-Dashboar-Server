import { getRepository, Repository } from 'typeorm';
import ICreateAddressDTO from '@modules/addresses/dtos/ICreateAddressDTO';
import IAddressesRepository from '@modules/addresses/repositories/IAddressesRepository';
import IFindByZipAndStreetAndNumberDTO from '@modules/addresses/dtos/IFindByZipAndStreetAndNumberDTO';
import Address from '../entities/Address';

class AddressesRepository implements IAddressesRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  async findById(id: string): Promise<Address | undefined> {
    const address = this.ormRepository.findOne(id);

    return address;
  }

  async findByZipAndStreetAndNumber({
    zip_code,
    number,
    street,
  }: IFindByZipAndStreetAndNumberDTO): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne({
      where: {
        zip_code,
        number,
        street,
      },
    });

    return address;
  }

  async create({
    zip_code,
    neighborhood,
    street,
    number = undefined,
  }: ICreateAddressDTO): Promise<Address> {
    const address = this.ormRepository.create({
      zip_code,
      neighborhood,
      street,
      number,
    });

    await this.ormRepository.save(address);

    return address;
  }

  async save(address: Address): Promise<Address> {
    return this.ormRepository.save(address);
  }

  async delete(address: Address): Promise<void> {
    await this.ormRepository.remove(address);
  }
}

export default AddressesRepository;
