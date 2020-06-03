import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/getPatientList', controller.patients.index);
  router.get('/getOrderList', controller.orders.index);
  router.get('/getDictionaryList', controller.dictionary.index);
  router.post('/addDictionary', controller.dictionary.create);
  router.delete('/deleteDictionary', controller.dictionary.destroy);
  router.post('/updateDictionary', controller.dictionary.update);
};
