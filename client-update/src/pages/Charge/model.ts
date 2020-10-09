import { Effect, Reducer } from 'umi';

import { ChargeManagementStateType } from './data';
import { fetchOrderList } from './service';

interface ChargeManagementModelType {
  namespace: string;
  state: ChargeManagementStateType;
  effects: {
    fetchOrderList: Effect;
  };
  reducers: {
    save: Reducer;
  };
}

const ChargeManagementModel: ChargeManagementModelType = {
  namespace: 'charge',

  state: {
    orderList: [],
    total: 0,
  },

  effects: {
    *fetchOrderList({ payload }, { call, put }) {
      const response = yield call(fetchOrderList, payload);
      if (response.code === '1') {
        yield put({
          type: 'save',
          payload: {
            orderList: response.data.list,
            total: response.data.total,
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

export default ChargeManagementModel;
