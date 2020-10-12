import { Effect, Reducer } from 'umi';

import { DictionaryTableMaintenanceState } from './data';
import {
  fetchDictionaryList,
  removeDictionary,
  addDictionary,
  editDictionary,
} from './service';

interface DictionaryTableMaintenanceModelType {
  namespace: string;
  state: DictionaryTableMaintenanceState;
  effects: {
    /** 获取数据字典列表 */
    fetchDictionaryList: Effect;
    /** 删除某条数据字典数据 */
    removeDictionary: Effect;
    /** 新增一条数据字典数据 */
    addDictionary: Effect;
    /** 编辑某条数据字典数据 */
    editDictionary: Effect;
  };
  reducers: {
    save: Reducer;
  };
}

const DictionaryTableMaintenanceModel: DictionaryTableMaintenanceModelType = {
  namespace: 'dictionary',

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
    *removeDictionary({ payload, callback }, { call, put }) {
      const res = yield call(removeDictionary, payload);
      const { code } = res;
      code === '1' && callback && callback();
    },
    *addDictionary({ payload, callback }, { call, put }) {
      const res = yield call(addDictionary, payload);
      const { code } = res;
      code === '1' && callback && callback();
    },
    *editDictionary({ payload, callback }, { call, put }) {
      const res = yield call(editDictionary, payload);
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
};

export default DictionaryTableMaintenanceModel;
