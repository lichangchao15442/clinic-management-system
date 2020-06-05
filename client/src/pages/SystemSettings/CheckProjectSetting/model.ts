import { Effect, Reducer, Subscription } from 'umi';

import { CheckProjectSettingStateType } from './data.d';
import {
  fetchCheckProjectList,
  fetchUnitList,
  fetchProjectTypeList,
  fetchInvoiceItemList,
} from './service';

interface CheckProjectSettingModelType {
  namespace: string;
  state: CheckProjectSettingStateType;
  effects: {
    fetchCheckProjectList: Effect;
    fetchUnitList: Effect;
    fetchProjectTypeList: Effect;
    fetchInvoiceItemList: Effect;
  };
  reducers: {
    save: Reducer;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const CheckProjectSettingModel: CheckProjectSettingModelType = {
  namespace: 'checkProjectSetting',

  state: {
    checkProjectList: [],
    total: 0,
    unitList: [],
    projectTypeList: [],
    invoiceItemList: [],
  },

  effects: {
    *fetchCheckProjectList({ payload }, { call, put }) {
      const response = yield call(fetchCheckProjectList, payload);
      if (response.code === '1') {
        yield put({
          type: 'save',
          payload: {
            checkProjectList: response.data.list,
            total: response.data.total,
          },
        });
      }
    },
    // 获取项目单位列表
    *fetchUnitList({ _ }, { call, put }) {
      const response = yield call(fetchUnitList);
      if (response.code === '1') {
        yield put({
          type: 'save',
          payload: {
            unitList: response.data,
          },
        });
      }
    },
    // 获取项目分类列表
    *fetchProjectTypeList({ _ }, { call, put }) {
      const response = yield call(fetchProjectTypeList);
      if (response.code === '1') {
        yield put({
          type: 'save',
          payload: {
            projectTypeList: response.data,
          },
        });
      }
    },
    // 获取发票项目列表
    *fetchInvoiceItemList({ _ }, { call, put }) {
      const response = yield call(fetchInvoiceItemList);
      if (response.code === '1') {
        yield put({
          type: 'save',
          payload: {
            invoiceItemList: response.data,
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
        if (pathname === '/system-settings/check-project-setting/add') {
          dispatch({
            type: 'fetchUnitList',
          });
          dispatch({
            type: 'fetchProjectTypeList',
          });
          dispatch({
            type: 'fetchInvoiceItemList',
          });
        }
      });
    },
  },
};

export default CheckProjectSettingModel;
