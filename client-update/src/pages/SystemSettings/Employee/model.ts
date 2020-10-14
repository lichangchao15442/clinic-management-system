import { Effect, Reducer, Subscription } from 'umi';
import { parse } from 'qs';

import { EmployeeManagementState } from './data';
import {
  fetchEmployeeList,
  fetchDepartmentList,
  fetchRoleList,
  fetchAllDepartmentList,
  fetchAllRoleList,
  fetchEmployeeDetail,
  fetchDepartmentDetail,
  fetchRoleDetail,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  addDepartment,
  updateDepartment,
  deleteDepartment,
  addRole,
  updateRole,
  deleteRole,
} from './service';

interface EmployeeManagementModelType {
  namespace: string;
  state: EmployeeManagementState;
  effects: {
    /** 获取员工列表 */
    fetchEmployeeList: Effect;
    /** 获取某个员工的详情信息 */
    fetchEmployeeDetail: Effect;
    /** 获取科室列表 */
    fetchDepartmentList: Effect;
    /** 获取角色列表 */
    fetchRoleList: Effect;
    /** 获取所有的科室数据 */
    fetchAllDepartmentList: Effect;
    /** 获取所有的角色列表 */
    fetchAllRoleList: Effect;
    /** 获取科室详情 */
    fetchDepartmentDetail: Effect;
    /** 获取角色详情 */
    fetchRoleDetail: Effect;
    /** 新增员工 */
    addEmployee: Effect;
    /** 编辑员工 */
    updateEmployee: Effect;
    /** 删除员工 */
    deleteEmployee: Effect;
    /** 新增科室 */
    addDepartment: Effect;
    /** 编辑科室 */
    updateDepartment: Effect;
    /** 删除科室 */
    deleteDepartment: Effect;
    /** 新增角色 */
    addRole: Effect;
    /** 编辑角色 */
    updateRole: Effect;
    /** 删除角色 */
    deleteRole: Effect;
  };
  reducers: {
    save: Reducer;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const EmployeeManagementModel: EmployeeManagementModelType = {
  namespace: 'employee',

  state: {
    list: [],
    total: 0,
    departmentList: [],
    roleList: [],
    employeeDetail: {},
    currentListName: 'employee',
    departmentDetail: {},
    roleDetail: {},
  },

  effects: {
    *fetchEmployeeList({ payload }, { call, put }) {
      const response = yield call(fetchEmployeeList, payload);
      if (response.code === '1') {
        yield put({
          type: 'save',
          payload: {
            list: response.data.list,
            total: response.data.total,
          },
        });
      }
    },
    *fetchEmployeeDetail({ payload }, { call, put }) {
      const response = yield call(fetchEmployeeDetail, payload);
      if (response.code === '1') {
        yield put({
          type: 'save',
          payload: {
            employeeDetail: response.data,
          },
        });
      }
    },
    *fetchDepartmentList({ payload }, { call, put }) {
      const response = yield call(fetchDepartmentList, payload);
      if (response.code === '1') {
        yield put({
          type: 'save',
          payload: {
            list: response.data.list,
            total: response.data.total,
          },
        });
      }
    },
    *fetchAllDepartmentList({ payload }, { call, put }) {
      const response = yield call(fetchAllDepartmentList, payload);
      if (response.code === '1') {
        yield put({
          type: 'save',
          payload: {
            departmentList: response.data,
          },
        });
      }
    },
    *fetchDepartmentDetail({ payload }, { call, put }) {
      const response = yield call(fetchDepartmentDetail, payload);
      if (response.code === '1') {
        yield put({
          type: 'save',
          payload: {
            departmentDetail: response.data,
          },
        });
      }
    },
    *fetchRoleList({ payload }, { call, put }) {
      const response = yield call(fetchRoleList, payload);
      if (response.code === '1') {
        yield put({
          type: 'save',
          payload: {
            list: response.data.list,
            total: response.data.total,
          },
        });
      }
    },
    *fetchAllRoleList({ payload }, { call, put }) {
      const response = yield call(fetchAllRoleList);
      if (response.code === '1') {
        yield put({
          type: 'save',
          payload: { roleList: response.data },
        });
      }
    },
    *fetchRoleDetail({ payload }, { call, put }) {
      const response = yield call(fetchRoleDetail, payload);
      if (response.code === '1') {
        yield put({
          type: 'save',
          payload: {
            roleDetail: response.data,
          },
        });
      }
    },
    *addEmployee({ payload, callback }, { call }) {
      const res = yield call(addEmployee, payload);
      const { code } = res;
      code === '1' && callback && callback();
    },
    *updateEmployee({ payload, callback }, { call }) {
      const res = yield call(updateEmployee, payload);
      const { code } = res;
      code === '1' && callback && callback();
    },
    *deleteEmployee({ payload, callback }, { call }) {
      const res = yield call(deleteEmployee, payload);
      const { code } = res;
      code === '1' && callback && callback();
    },
    *addDepartment({ payload, callback }, { call }) {
      const res = yield call(addDepartment, payload);
      const { code } = res;
      code === '1' && callback && callback();
    },
    *updateDepartment({ payload, callback }, { call }) {
      const res = yield call(updateDepartment, payload);
      const { code } = res;
      code === '1' && callback && callback();
    },
    *deleteDepartment({ payload, callback }, { call }) {
      const res = yield call(deleteDepartment, payload);
      const { code } = res;
      code === '1' && callback && callback();
    },
    *addRole({ payload, callback }, { call }) {
      const res = yield call(addRole, payload);
      const { code } = res;
      code === '1' && callback && callback();
    },
    *updateRole({ payload, callback }, { call }) {
      const res = yield call(updateRole, payload);
      const { code } = res;
      code === '1' && callback && callback();
    },
    *deleteRole({ payload, callback }, { call }) {
      const res = yield call(deleteRole, payload);
      const { code } = res;
      code === '1' && callback && callback();
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },

  subscriptions: {
    setup({ history, dispatch }) {
      history.listen(({ pathname, search }) => {
        const query = search ? parse(search.split('?')[1]) : {};

        if (pathname === '/system-settings/employee') {
          // 获取科室列表
          dispatch({
            type: 'fetchAllDepartmentList',
          });
        }
        if (pathname.includes('/system-settings/employee/add')) {
          // 改变新增与编辑共用页面的操作类型为add
          dispatch({
            type: 'common/save',
            payload: {
              operationType: 'add',
            },
          });
        } else if (pathname.includes('/system-settings/employee/edit')) {
          // 改变新增与编辑共用页面的操作类型为add
          dispatch({
            type: 'common/save',
            payload: {
              operationType: 'edit',
            },
          });
        }

        // 新增/编辑员工信息
        if (
          pathname === '/system-settings/employee/add-employee' ||
          pathname === '/system-settings/employee/edit-employee'
        ) {
          // 获取所有科室列表
          dispatch({
            type: 'fetchAllDepartmentList',
          });
          // 获取所有角色列表
          dispatch({
            type: 'fetchAllRoleList',
          });

          // 新增员工信息
          if (pathname === '/system-settings/employee/add-employee') {
            // 获取自动填充的员工编号
            dispatch({
              type: 'common/fetchInitNumber',
              payload: {
                name: 'employee',
              },
            });
          } else {
            // 编辑员工信息
            // 获取该员工信息
            dispatch({
              type: 'fetchEmployeeDetail',
              payload: {
                id: query.id,
              },
            });
          }
        }

        if (pathname === '/system-settings/employee/add-department') {
          // 新增科室

          // 获取自动填充的科室编号
          dispatch({
            type: 'common/fetchInitNumber',
            payload: {
              name: 'department',
            },
          });
        }
        if (pathname === '/system-settings/employee/edit-department') {
          // 编辑科室
          // 获取科室详情
          dispatch({
            type: 'fetchDepartmentDetail',
            payload: {
              id: query.id,
            },
          });
        }

        if (pathname === '/system-settings/employee/add-role') {
          // 获取自动填充的角色编号
          dispatch({
            type: 'common/fetchInitNumber',
            payload: {
              name: 'role',
            },
          });
        }

        if (pathname === '/system-settings/employee/edit-role') {
          // 编辑角色
          // 获取角色详情
          dispatch({
            type: 'fetchRoleDetail',
            payload: {
              id: query.id,
            },
          });
        }
      });
    },
  },
};

export default EmployeeManagementModel;
