import ICreateAddressDTO from '../dtos/ICreateAddressDTO';
import IFindByZipAndStreetAndNumberDTO from '../dtos/IFindByZipAndStreetAndNumberDTO';
import Address from '../infra/typeorm/entities/Address';

export default interface IAddressesRepository {
  findById(id: string): Promise<Address | undefined>;
  findByZipAndStreetAndNumber(
    data: IFindByZipAndStreetAndNumberDTO,
  ): Promise<Address | undefined>;
  create(data: ICreateAddressDTO): Promise<Address>;
  save(address: Address): Promise<Address>;
  delete(address: Address): Promise<void>;
}
