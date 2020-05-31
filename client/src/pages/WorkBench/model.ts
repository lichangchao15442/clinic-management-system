import { Subscription, Effect, Reducer } from 'umi';

import { WorkBenchModalStateType } from './data.d';
import { fetchPatientList } from './service';

interface WorkBenchModalType {
  namespace: string;
  state: WorkBenchModalStateType;
  effects: {
    fetchPatientList: Effect;
  };
  reducers: {
    save: Reducer;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const WorkBenchModal: WorkBenchModalType = {
  namespace: 'workBench',

  state: {
    patientList: [],
    total: 0,
  },

  effects: {
    // 获取患者列表
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

  subscriptions: {
    setup({ history, dispatch }) {
      history.listen(({ pathname }) => {
        if (pathname === '/work-bench') {
          console.log('/work-bench');
          // dispatch({
          //   type: 'fetchPatientList',
          // });
        }
      });
    },
  },
};

export default WorkBenchModal;
