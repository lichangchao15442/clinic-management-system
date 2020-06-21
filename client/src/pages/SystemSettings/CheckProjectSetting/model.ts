import { Effect, Reducer, Subscription } from 'umi';
import { parse } from 'qs';

import { CheckProjectSettingStateType } from './data.d';
import {
  fetchCheckProjectList,
  fetchUnitList,
  fetchProjectTypeList,
  fetchInvoiceItemList,
  fetchCheckProjectDetail,
} from './service';

interface CheckProjectSettingModelType {
  namespace: string;
  state: CheckProjectSettingStateType;
  effects: {
    fetchCheckProjectList: Effect;
    fetchUnitList: Effect;
    fetchProjectTypeList: Effect;
    fetchInvoiceItemList: Effect;
    fetchCheckProjectDetail: Effect;
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
    operationType: 'add',
    checkProjectDetail: null,
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
    // 获取检查项目详情
    *fetchCheckProjectDetail({ payload }, { call, put }) {
      const response = yield call(fetchCheckProjectDetail, payload);
      if (response.code === '1') {
        yield put({
          type: 'save',
          payload: {
            checkProjectDetail: response.data,
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
        if (
          pathname === '/system-settings/check-project-setting/add' ||
          pathname === '/system-settings/check-project-setting/edit'
        ) {
          // 获取下拉框的动态数据
          dispatch({
            type: 'fetchUnitList',
          });
          dispatch({
            type: 'fetchProjectTypeList',
          });
          dispatch({
            type: 'fetchInvoiceItemList',
          });

          // 根据路由判断当前页面是新增还是编辑
          let operationType = 'add';
          if (pathname === '/system-settings/check-project-setting/add') {
            operationType = 'add';
            // 获取自动生成的项目编号
            dispatch({
              type: 'common/fetchInitNumber',
              payload: {
                name: 'checkProject',
              },
            });
          } else if (
            pathname === '/system-settings/check-project-setting/edit'
          ) {
            operationType = 'edit';
            const query = parse(search.split('?')[1]);
            console.log('query', query);
            // 获取检查项目详情
            dispatch({
              type: 'fetchCheckProjectDetail',
              payload: {
                id: query.id,
              },
            });
          }
          dispatch({
            type: 'save',
            payload: { operationType },
          });
        }
      });
    },
  },
};

export default CheckProjectSettingModel;
