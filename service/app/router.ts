import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router,  } = app;

  router.get('/', controller.home.index);
  router.get('/getPatientList', controller.patients.index); // 获取患者列表
  router.get('/getOrderList', controller.orders.index); // 获取订单列表
  router.get('/getDictionaryList', controller.dictionary.index); // 获取字典表列表
  router.post('/addDictionary', controller.dictionary.create); // 添加字典表数据
  router.delete('/deleteDictionary', controller.dictionary.destroy); // 删除字典表数据
  router.post('/updateDictionary', controller.dictionary.update); // 编辑字典表数据
  router.get('/getCheckProjectList', controller.checkProjects.index); // 获取检测项目列表
  router.get('/getUnitList', controller.dictionary.getUnitList); // 获取检测项目单位列表
  router.get('/getProjectTypeList', controller.dictionary.getProjectTypeList); // 获取检测项目类型列表
  router.get('/getInvoiceItemList', controller.dictionary.getInvoiceItemList); // 获取发票项目列表
  router.get('/getProjectNumber', controller.checkProjects.getProjectNumber); // 获取发票项目编码
  router.get('/isCheckProjectNameExited', controller.checkProjects.isCheckProjectNameExited); // 检查项目名是否已存在
  router.post('/addCheckProject', controller.checkProjects.create); // 新增检查项目
  router.get('/getCheckProjectDetail', controller.checkProjects.getCheckProjectDetail); // 获取检查项目详情
  router.post('/editCheckProject', controller.checkProjects.update); // 编辑检查项目
  router.get('/getSupplierList', controller.suppliers.index); // 获取供应商列表
  router.get('/getSupplierNumber', controller.suppliers.getSupplierNumber); // 获取最新的供应商编号
  router.post('/addSupplier', controller.suppliers.create); // 新增供应商
  router.get('/getSupplierDetail', controller.suppliers.getSupplierDetail); // 获取供应商详情
  router.post('/editSupplier', controller.suppliers.update); // 编辑供应商详情
  router.delete('/deleteSupplier', controller.suppliers.destroy); // 删除某条供应商
  router.get('/getEmployeeList', controller.employees.index); // 查询员工列表
  router.post('/addEmployee', controller.employees.create); // 新增员工
  router.post('/updateEmployee', controller.employees.update); // 编辑员工
  router.get('/getEmployeeDetail', controller.employees.show); // 获取员工详情
  router.delete('/deleteEmployee', controller.employees.destroy); // 删除员工
  router.get('/getDepartmentList', controller.departments.index); // 查询科室列表
  router.get('/getAllDepartmentList', controller.departments.getAllDepartmentList); // 查询所有科室列表
  router.post('/addDepartment', controller.departments.create); // 新增科室
  router.post('/updateDepartment', controller.departments.update); // 编辑科室
  router.get('/getDepartmentDetail', controller.departments.show); //  获取科室详情
  router.delete('/deleteDepartment', controller.departments.destroy); //  删除科室
  router.get('/getRoleList', controller.roles.index); // 查询角色列表
  router.get('/getAllRoleList', controller.roles.getAllRoleList); // 查询所有的角色列表
  router.get('/getInitNumber', controller.common.getInitNumber); // 获取某个表的最新编号+1
};
