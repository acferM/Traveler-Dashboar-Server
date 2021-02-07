import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CategoriesController from '../controllers/CategoriesController';

const categoriesRouter = Router();

const categoriesController = new CategoriesController();

const upload = multer(uploadConfig.multer);

categoriesRouter.use(ensureAuthenticated);

categoriesRouter.post('/', upload.single('icon'), categoriesController.create);

categoriesRouter.get('/', categoriesController.index);

categoriesRouter.put('/', upload.single('icon'), categoriesController.update);

categoriesRouter.delete('/:id', categoriesController.delete);

export default categoriesRouter;
