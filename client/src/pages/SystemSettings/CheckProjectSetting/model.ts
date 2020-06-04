import { Effect, Reducer } from 'umi';

import { CheckProjectSettingStateType } from './data.d';
import { fetchCheckProjectList } from './service';

interface CheckProjectSettingModelType {
  namespace: string;
  state: CheckProjectSettingStateType;
  effects: {
    fetchCheckProjectList: Effect;
  };
  reducers: {
    save: Reducer;
  };
}

const CheckProjectSettingModel: CheckProjectSettingModelType = {
  namespace: 'checkProjectSetting',

  state: {
    checkProjectList: [],
    total: 0,
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

export default CheckProjectSettingModel;
