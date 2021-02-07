import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AddressesController from '../controllers/AddressesController';

const addressesRouter = Router();

const addressesController = new AddressesController();

addressesRouter.use(ensureAuthenticated);

addressesRouter.post('/', addressesController.create);

addressesRouter.put('/', addressesController.update);

addressesRouter.delete('/:id', addressesController.delete);

export default addressesRouter;
