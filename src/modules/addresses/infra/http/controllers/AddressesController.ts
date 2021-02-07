import CreateAddressService from '@modules/addresses/services/CreateAddressService';
import DeleteAddressService from '@modules/addresses/services/DeleteAddressService';
import UpdateAddressService from '@modules/addresses/services/UpdateAddressService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class AddressesController {
  async create(request: Request, response: Response): Promise<Response> {
    const { zip_code, street, neighborhood, number } = request.body;

    const createAddress = container.resolve(CreateAddressService);

    const address = await createAddress.execute({
      zip_code,
      street,
      neighborhood,
      number,
    });

    return response.json(address);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { address_id, zip_code, street, neighborhood, number } = request.body;

    const updateAddress = container.resolve(UpdateAddressService);

    const address = await updateAddress.execute({
      address_id,
      zip_code,
      street,
      neighborhood,
      number,
    });

    return response.json(address);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteAddress = container.resolve(DeleteAddressService);

    await deleteAddress.execute(id);

    return response.status(204).send();
  }
}

export default AddressesController;
