import { Effect, Reducer, Subscription } from 'umi';
import { parse } from 'qs';

import { SupplierManagementState } from './data';
import {
  fetchSupplierList,
  fetchSupplierNumber,
  fetchSupplierDetail,
} from './service';

interface SupplierManagementModelType {
  namespace: string;
  state: SupplierManagementState;
  effects: {
    fetchSupplierList: Effect;
    fetchSupplierNumber: Effect;
    fetchSupplierDetail: Effect;
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
    supplierDetail: {},
  },

  effects: {
    // 获取供应商列表
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
    // 获取最新的供应商编码
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
    // 获取供应商详情
    *fetchSupplierDetail({ payload }, { call, put }) {
      const response = yield call(fetchSupplierDetail, payload);
      if (response.code === '1') {
        yield put({
          type: 'save',
          payload: {
            supplierDetail: response.data,
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
      history.listen(({ pathname, search }) => {
        if (pathname === '/system-settings/supplier-management/add') {
          // 修改当前新增/编辑共用页面的操作类型为add
          dispatch({
            type: 'common/save',
            payload: {
              operationType: 'add',
            },
          });
          // 获取最新的供应商编号
          dispatch({
            type: 'fetchSupplierNumber',
          });
        } else if (pathname === '/system-settings/supplier-management/edit') {
          // 修改当前新增/编辑共用页面的操作类型为edit
          dispatch({
            type: 'common/save',
            payload: {
              operationType: 'edit',
            },
          });

          // 获取供应商详情
          const query = parse(search.split('?')[1]);
          dispatch({
            type: 'fetchSupplierDetail',
            payload: {
              id: query.id,
            },
          });
        }
      });
    },
  },
};

export default SupplierManagementModel;
