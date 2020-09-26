import { Effect, Reducer } from 'umi';

import { WorkBenchModalStateType } from './data';
import { fetchPatientList } from './service';

interface WorkBenchModalType {
  namespace: string;
  state: WorkBenchModalStateType;
  effects: {
    /** 获取患者列表 */
    fetchPatientList: Effect;
  };
  reducers: {
    save: Reducer;
  };
}

const WorkBenchModal: WorkBenchModalType = {
  namespace: 'workBench',

  state: {
    patientList: [],
    total: 0,
  },

  effects: {
    *fetchPatientList({ payload }, { call, put }) {
      const response = yield call(fetchPatientList, payload);
      if (response.code === '1') {
        yield put({
          type: 'save',
          payload: {
            patientList: response.data.list,
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

export default WorkBenchModal;
