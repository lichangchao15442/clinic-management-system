export default [
  {
    path: '/',
    redirect: '/work-bench',
  },
  {
    name: '工作台',
    icon: 'appstore',
    path: '/work-bench',
    component: 'WorkBench',
  },
  {
    name: '患者管理',
    icon: 'user',
    path: '/patients-management',
    component: 'PatientsManagement',
  },
];
