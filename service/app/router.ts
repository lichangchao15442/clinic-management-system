import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/getPatientList', controller.patients.index); // 获取患者列表
  router.get('/getOrderList', controller.orders.index); // 获取订单列表
  router.get('/getDictionaryList', controller.dictionary.index); // 获取字典表列表
  router.post('/addDictionary', controller.dictionary.create); // 添加字典表数据
  router.delete('/deleteDictionary', controller.dictionary.destroy); // 删除字典表数据
  router.post('/updateDictionary', controller.dictionary.update); // 编辑字典表数据
  router.get('/getCheckProjectList', controller.checkProjects.index); // 获取检测项目列表
};
