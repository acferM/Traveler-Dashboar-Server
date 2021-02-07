import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CitiesController from '../controllers/CitiesController';

const citiesRouter = Router();

const citiesController = new CitiesController();

citiesRouter.use(ensureAuthenticated);

const upload = multer(uploadConfig.multer);

citiesRouter.post('/', upload.single('image'), citiesController.create);

citiesRouter.get('/', citiesController.index);

citiesRouter.put('/', upload.single('image'), citiesController.update);

citiesRouter.delete('/:id', citiesController.delete);

export default citiesRouter;
