import { v4 } from 'uuid';
import ICreateAddressDTO from '@modules/addresses/dtos/ICreateAddressDTO';
import Address from '@modules/addresses/infra/typeorm/entities/Address';
import IFindByZipAndStreetAndNumberDTO from '@modules/addresses/dtos/IFindByZipAndStreetAndNumberDTO';
import IAddressesRepository from '../IAddressesRepository';

class FakeAddressesRepository implements IAddressesRepository {
  private addresses: Address[] = [];

  async findById(id: string): Promise<Address | undefined> {
    const find = this.addresses.find(address => address.id === id);

    return find;
  }

  async findByZipAndStreetAndNumber({
    zip_code,
    number,
    street,
  }: IFindByZipAndStreetAndNumberDTO): Promise<Address | undefined> {
    const find = this.addresses.find(
      address =>
        address.zip_code === zip_code &&
        address.number === number &&
        address.street === street,
    );

    return find;
  }

  async create(data: ICreateAddressDTO): Promise<Address> {
    const address = new Address();

    Object.assign(address, { id: v4(), ...data });

    this.addresses.push(address);

    return address;
  }

  async save(address: Address): Promise<Address> {
    const findIndex = this.addresses.findIndex(a => a.id === address.id);

    this.addresses[findIndex] = address;

    return address;
  }

  async delete(address: Address): Promise<void> {
    const findIndex = this.addresses.findIndex(c => c.id === address.id);

    this.addresses.splice(findIndex, 1);
  }
}

export default FakeAddressesRepository;
