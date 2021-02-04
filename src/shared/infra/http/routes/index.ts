import { Router } from 'express';

import categoriesRouter from '@modules/categories/infra/http/routes/categoires.routes';
import citiesRouter from '@modules/cities/infra/http/routes/cities.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/categories', categoriesRouter);
routes.use('/cities', citiesRouter);

export default routes;
