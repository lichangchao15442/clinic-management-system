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
  {
    name: '收费管理',
    icon: 'dollar',
    path: '/charge-management',
    component: 'ChargeManagement',
  },
  {
    name: '系统设置',
    icon: 'setting',
    path: '/system-settings',
    routes: [
      {
        name: '字典表维护',
        path: '/system-settings/dictionary-table-maintenance',
        component: 'SystemSettings/DictionaryTableMaintenance',
      },
      {
        name: '检查项目设置',
        path: '/system-settings/check-project-setting',
        component: 'SystemSettings/CheckProjectSetting',
      },
    ],
  },
];
