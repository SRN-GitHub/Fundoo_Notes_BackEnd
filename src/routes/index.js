// import express from 'express';
// const router = express.Router();

// import userRoute from './user.route';
// import notesRoute from './notes.route';
// /**
//  * Function contains Application routes
//  *
//  * @returns router
//  */
// const routes = () => {
//   router.get('/', (req, res) => {
//     res.json('Welcome>>> Api is Working');
//   });
//   router.use('/users', userRoute);
//   router.use('/notes', notesRoute);

//   return router;
// };

// export default routes;

//* NEW
import express from 'express';
import userRoute from './user.route';
import notesRoute from './notes.route';
// import swaggerUi from 'swagger-ui-express';

const router = express.Router();

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  // Welcome route
  router.get('/', (req, res) => {
    res.json('Welcome>>> Api is Working');
  });

  // User routes
  router.use('/users', userRoute);

  // Notes routes
  router.use('/notes', notesRoute);

  router.use((req, res) => {
    res.status(404).json({
      code: 404,
      message: 'Route not found'
    });
  });

  return router;
};

export default routes;