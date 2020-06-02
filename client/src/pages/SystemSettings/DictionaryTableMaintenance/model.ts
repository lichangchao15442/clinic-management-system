import { Effect, Reducer } from 'umi';

import { DictionaryTableMaintenanceState } from './data';
import { fetchDictionaryList } from './service';

interface DictionaryTableMaintenanceModelType {
  namespace: string;
  state: DictionaryTableMaintenanceState;
  effects: {
    fetchDictionaryList: Effect;
  };
  reducers: {
    save: Reducer;
  };
}

const DictionaryTableMaintenanceModel: DictionaryTableMaintenanceModelType = {
  namespace: 'dictionaryTableMaintenance',

  state: {
    dictionaryList: [],
    total: 0,
  },

  effects: {
    *fetchDictionaryList({ payload }, { call, put }) {
      const response = yield call(fetchDictionaryList, payload);
      if (response.code === '1') {
        yield put({
          type: 'save',
          payload: {
            dictionaryList: response.data.list,
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

export default DictionaryTableMaintenanceModel;
