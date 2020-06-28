import { Effect, Reducer } from 'umi';

import { getInitNumber } from '@/services/common';

export interface CommonState {
  initNumber: number | null; // 表单为添加类型自动填充的编号
  operationType: 'add' | 'edit'; // 新增/编辑共用表单的当前操作类型
}

interface ModelType {
  namespace: string;
  state: CommonState;
  effects: {
    fetchInitNumber: Effect;
  };
  reducers: {
    save: Reducer;
  };
}

const Model: ModelType = {
  namespace: 'common',

  state: {
    initNumber: null,
    operationType: 'add',
  },

  effects: {
    // 在添加某条数据时，获取该页面所需的自动填充编号
    *fetchInitNumber({ payload }, { call, put }) {
      const response = yield call(getInitNumber, payload);
      if (response.code === '1') {
        yield put({
          type: 'save',
          payload: {
            initNumber: response.data,
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
};

export default Model;
