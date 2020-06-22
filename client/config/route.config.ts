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
        name: '员工管理',
        path: '/system-settings/employee-management',
        menu: {
          hideChildren: true,
        },
        routes: [
          {
            name: '员工管理',
            path: '/system-settings/employee-management',
            component: 'SystemSettings/EmployeeManagement',
          },
          {
            name: '员工管理',
            path: '/system-settings/employee-management/add-employee',
            component:
              'SystemSettings/EmployeeManagement/components/AddOrEditEmployee',
          },
          {
            name: '员工管理',
            path: '/system-settings/employee-management/edit-employee',
            component:
              'SystemSettings/EmployeeManagement/components/AddOrEditEmployee',
          },
          {
            name: '员工管理',
            path: '/system-settings/employee-management/add-department',
            component:
              'SystemSettings/EmployeeManagement/components/AddOrEditDepartment',
          },
          {
            name: '员工管理',
            path: '/system-settings/employee-management/edit-department',
            component:
              'SystemSettings/EmployeeManagement/components/AddOrEditDepartment',
          },
          {
            name: '员工管理',
            path: '/system-settings/employee-management/add-role',
            component:
              'SystemSettings/EmployeeManagement/components/AddOrEditRole',
          },
        ],
      },
      {
        name: '检查项目设置',
        path: '/system-settings/check-project-setting',
        menu: {
          hideChildren: true,
        },
        routes: [
          {
            name: '检查项目设置',
            path: '/system-settings/check-project-setting',
            component: 'SystemSettings/CheckProjectSetting',
          },
          {
            name: '检查项目设置',
            path: '/system-settings/check-project-setting/add',
            component:
              'SystemSettings/CheckProjectSetting/components/AddOrEditCheckProject',
          },
          {
            name: '检查项目设置',
            path: '/system-settings/check-project-setting/edit',
            component:
              'SystemSettings/CheckProjectSetting/components/AddOrEditCheckProject',
          },
        ],
      },
      {
        name: '供应商管理',
        path: '/system-settings/supplier-management',
        menu: {
          hideChildren: true,
        },
        routes: [
          {
            name: '供应商管理',
            path: '/system-settings/supplier-management',
            component: 'SystemSettings/SupplierManagement',
          },
          {
            name: '供应商管理',
            path: '/system-settings/supplier-management/add',
            component:
              'SystemSettings/SupplierManagement/components/AddOrEditSupplier',
          },
          {
            name: '供应商管理',
            path: '/system-settings/supplier-management/edit',
            component:
              'SystemSettings/SupplierManagement/components/AddOrEditSupplier',
          },
        ],
      },
    ],
  },
];
