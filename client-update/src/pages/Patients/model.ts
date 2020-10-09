import { Effect, Reducer } from 'umi';

import { PatientsManagementStateType } from './data';
import { fetchPatientList } from './service';

interface PatientsManagementModelType {
  namespace: string;
  state: PatientsManagementStateType;
  effects: {
    fetchPatientList: Effect;
  };
  reducers: {
    save: Reducer;
  };
}

const PatientsManagementModel: PatientsManagementModelType = {
  namespace: 'patients',

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

export default PatientsManagementModel;
