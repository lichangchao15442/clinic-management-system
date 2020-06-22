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
} from './service';
import { request } from 'express';

interface EmployeeManagementModelType {
  namespace: string;
  state: EmployeeManagementState;
  effects: {
    fetchEmployeeList: Effect;
    fetchEmployeeDetail: Effect;
    fetchDepartmentList: Effect;
    fetchRoleList: Effect;
    fetchAllDepartmentList: Effect;
    fetchAllRoleList: Effect;
    fetchDepartmentDetail: Effect;
  };
  reducers: {
    save: Reducer;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const EmployeeManagementModel: EmployeeManagementModelType = {
  namespace: 'employeeManagement',

  state: {
    list: [],
    total: 0,
    departmentList: [],
    operationType: 'add',
    roleList: [],
    employeeDetail: {},
    currentListName: 'employee',
    departmentDetail: {},
  },

  effects: {
    // 获取员工列表
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
    // 获取某个员工的详情信息
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
    // 获取科室列表
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
    // 获取所有的科室数据
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
    // 获取科室详情
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
    // 获取角色列表
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
    // 获取所有的角色列表
    *fetchAllRoleList({ payload }, { call, put }) {
      const response = yield call(fetchAllRoleList);
      if (response.code === '1') {
        yield put({
          type: 'save',
          payload: { roleList: response.data },
        });
      }
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

        if (pathname === '/system-settings/employee-management') {
          // 获取科室列表
          dispatch({
            type: 'fetchAllDepartmentList',
          });
        }
        if (pathname.includes('/system-settings/employee-management/add')) {
          // 改变新增与编辑共用页面的操作类型为add
          dispatch({
            type: 'save',
            payload: {
              operationType: 'add',
            },
          });
        } else if (
          pathname.includes('/system-settings/employee-management/edit')
        ) {
          // 改变新增与编辑共用页面的操作类型为add
          dispatch({
            type: 'save',
            payload: {
              operationType: 'edit',
            },
          });
        }

        // 新增/编辑员工信息
        if (
          pathname === '/system-settings/employee-management/add-employee' ||
          pathname === '/system-settings/employee-management/edit-employee'
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
          if (
            pathname === '/system-settings/employee-management/add-employee'
          ) {
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

        if (
          pathname === '/system-settings/employee-management/add-department'
        ) {
          // 新增科室

          // 获取自动填充的科室编号
          dispatch({
            type: 'common/fetchInitNumber',
            payload: {
              name: 'department',
            },
          });
        }
        if (
          pathname === '/system-settings/employee-management/edit-department'
        ) {
          // 编辑科室
          // 获取科室详情
          dispatch({
            type: 'fetchDepartmentDetail',
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
