export default [
  {
    path: '/',
    redirect: '/work-bench',
  },
  {
    name: '工作台',
    icon: 'appstore',
    path: '/work-bench',
    component: 'WorkBench/List',
  },
  {
    name: '患者管理',
    icon: 'user',
    path: '/patients',
    component: 'Patients/List',
  },
  {
    name: '收费管理',
    icon: 'dollar',
    path: '/charge',
    component: 'Charge/List',
  },
  {
    name: '系统设置',
    icon: 'setting',
    path: '/system-settings',
    routes: [
      {
        name: '字典表维护',
        path: '/system-settings/dictionary',
        component: 'SystemSettings/Dictionary',
      },
      {
        name: '员工管理',
        path: '/system-settings/employee',
        menu: {
          hideChildren: true,
        },
        routes: [
          {
            name: '员工管理',
            path: '/system-settings/employee',
            component: 'SystemSettings/Employee/List',
          },
          {
            name: '新增员工',
            path: '/system-settings/employee/add-employee',
            component:
              'SystemSettings/Employee/AddOrEditEmployee',
          },
          {
            name: '编辑员工',
            path: '/system-settings/employee/edit-employee',
            component:
              'SystemSettings/Employee/AddOrEditEmployee',
          },
          {
            name: '新增科室',
            path: '/system-settings/employee/add-department',
            component:
              'SystemSettings/Employee/AddOrEditDepartment',
          },
          {
            name: '编辑科室',
            path: '/system-settings/employee/edit-department',
            component:
              'SystemSettings/Employee/AddOrEditDepartment',
          },
          {
            name: '新增角色',
            path: '/system-settings/employee/add-role',
            component:
              'SystemSettings/Employee/AddOrEditRole',
          },
          {
            name: '编辑角色',
            path: '/system-settings/employee/edit-role',
            component:
              'SystemSettings/Employee/AddOrEditRole',
          },
        ],
      },
      // {
      //   name: '检查项目设置',
      //   path: '/system-settings/check-project-setting',
      //   menu: {
      //     hideChildren: true,
      //   },
      //   routes: [
      //     {
      //       name: '检查项目设置',
      //       path: '/system-settings/check-project-setting',
      //       component: 'SystemSettings/CheckProjectSetting',
      //     },
      //     {
      //       name: '检查项目设置',
      //       path: '/system-settings/check-project-setting/add',
      //       component:
      //         'SystemSettings/CheckProjectSetting/components/AddOrEditCheckProject',
      //     },
      //     {
      //       name: '检查项目设置',
      //       path: '/system-settings/check-project-setting/edit',
      //       component:
      //         'SystemSettings/CheckProjectSetting/components/AddOrEditCheckProject',
      //     },
      //   ],
      // },
      // {
      //   name: '供应商管理',
      //   path: '/system-settings/supplier-management',
      //   menu: {
      //     hideChildren: true,
      //   },
      //   routes: [
      //     {
      //       name: '供应商管理',
      //       path: '/system-settings/supplier-management',
      //       component: 'SystemSettings/SupplierManagement',
      //     },
      //     {
      //       name: '供应商管理',
      //       path: '/system-settings/supplier-management/add',
      //       component:
      //         'SystemSettings/SupplierManagement/components/AddOrEditSupplier',
      //     },
      //     {
      //       name: '供应商管理',
      //       path: '/system-settings/supplier-management/edit',
      //       component:
      //         'SystemSettings/SupplierManagement/components/AddOrEditSupplier',
      //     },
      //   ],
      // },
      // {
      //   name: '模版维护',
      //   path: '/system-settings/template-maintenance',
      //   menu: {
      //     hideChildren: true,
      //   },
      //   routes: [
      //     {
      //       name: '模版维护',
      //       path: '/system-settings/template-maintenance',
      //       component: 'SystemSettings/TemplateMaintenance',
      //     },
      //     {
      //       name: '模版维护',
      //       path: '/system-settings/template-maintenance/add-medical_record',
      //       component:
      //         'SystemSettings/TemplateMaintenance/components/AddOrEditMedicalRecordTemplate',
      //     },
      //   ],
      // },
    ],
  },
];
