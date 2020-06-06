import { Effect, Reducer, Subscription } from 'umi';

import { SupplierManagementState } from './data';
import { fetchSupplierList, fetchSupplierNumber } from './service';

interface SupplierManagementModelType {
  namespace: string;
  state: SupplierManagementState;
  effects: {
    fetchSupplierList: Effect;
    fetchSupplierNumber: Effect;
  };
  reducers: {
    save: Reducer;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const SupplierManagementModel: SupplierManagementModelType = {
  namespace: 'supplierManagement',

  state: {
    supplierList: [],
    total: 0,
    supplierNumber: null,
    operationType: 'add',
  },

  effects: {
    *fetchSupplierList({ payload }, { call, put }) {
      const response = yield call(fetchSupplierList, payload);
      if (response.code === '1') {
        yield put({
          type: 'save',
          payload: {
            supplierList: response.data.list,
            total: response.data.total,
          },
        });
      }
    },
    *fetchSupplierNumber({ _ }, { call, put }) {
      const response = yield call(fetchSupplierNumber);
      if (response.code === '1') {
        yield put({
          type: 'save',
          payload: {
            supplierNumber: response.data,
          },
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
      history.listen(({ pathname }) => {
        if (pathname === '/system-settings/supplier-management/add') {
          // 修改当前新增/编辑共用页面的操作类型为add
          dispatch({
            type: 'save',
            payload: {
              operationType: 'add',
            },
          });
          // 获取最新的供应商编号
          dispatch({
            type: 'fetchSupplierNumber',
          });
        }
      });
    },
  },
};

export default SupplierManagementModel;
