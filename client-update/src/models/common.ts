import { Effect, Reducer } from 'umi';

import { getInitNumber, getAllDictionary } from '@/services/common';
import { DictionaryType } from '@/pages/SystemSettings/Dictionary/data.d';

interface MedicalRecordInformationType {
  /** 诊断列表 */
  diagnosisList: DictionaryType[];
  /** 主诉列表数据 */
  chiefComplaintData: {
    /** 常用症状列表 */
    commonSymptomsList: DictionaryType[];
    /** 常用时间列表 */
    commonTimeList: DictionaryType[];
    /** 常用标点列表 */
    commonPunctuationList: DictionaryType[];
    /** 常用词汇列表 */
    commonVocabulary: DictionaryType[];
  };
  /** 现病史列表 */
  currentMedicalHistoryList: DictionaryType[];
  /** 既往史列表 */
  pastHistoryList: DictionaryType[];
  /** 过敏史列表 */
  allergyHistoryList: DictionaryType[];
  /** 个人史列表 */
  personalHistoryList: DictionaryType[];
  /** 辅助检查列表 */
  auxiliaryExaminationList: DictionaryType[];
  /** 治疗意见列表 */
  treatmentAdviceList: DictionaryType[];
  /** 医嘱列表 */
  medicalAdviceList: DictionaryType[];
}

export interface CommonState {
  /** 表单为添加类型自动填充的编号 */
  initNumber: any;
  /** 新增/编辑共用表单的当前操作类型 */
  operationType: 'add' | 'edit';
  /** 病历信息中下拉框所需数据集合 */
  medicalRecordInformation: MedicalRecordInformationType;
}

interface ModelType {
  namespace: string;
  state: CommonState;
  effects: {
    /** 在添加某条数据时，获取该页面所需的自动填充编号 */
    fetchInitNumber: Effect;
    /** 获取病历信息中字典表所有数据（不分页） */
    fetchAllDictionary: Effect;
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
    medicalRecordInformation: {
      diagnosisList: [],
      chiefComplaintData: {
        commonSymptomsList: [],
        commonTimeList: [],
        commonPunctuationList: [],
        commonVocabulary: [],
      },
      currentMedicalHistoryList: [],
      pastHistoryList: [],
      allergyHistoryList: [],
      personalHistoryList: [],
      auxiliaryExaminationList: [],
      treatmentAdviceList: [],
      medicalAdviceList: [],
    },
  },

  effects: {
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
    *fetchAllDictionary({}, { call, put }) {
      const response = yield call(getAllDictionary);
      if (response.code === '1') {
        yield put({
          type: 'save',
          payload: {
            // 主要为了与接口返回数据命名低耦合（如果直接使用后端返回字段名，若后端修改，前端需大量修改）
            medicalRecordInformation: {
              diagnosisList: response.data.diagnosisList,
              chiefComplaintData: {
                commonSymptomsList: response.data.chiefComplaintData.commonSymptomsList,
                commonTimeList: response.data.chiefComplaintData.commonTimeList,
                commonPunctuationList: response.data.chiefComplaintData.commonPunctuationList,
                commonVocabulary: response.data.chiefComplaintData.commonVocabulary,
              },
              currentMedicalHistoryList: response.data.currentMedicalHistoryList,
              pastHistoryList: response.data.pastHistoryList,
              allergyHistoryList: response.data.allergyHistoryList,
              personalHistoryList: response.data.personalHistoryList,
              auxiliaryExaminationList: response.data.auxiliaryExaminationList,
              treatmentAdviceList: response.data.treatmentAdviceList,
              medicalAdviceList: response.data.medicalAdviceList,
            },
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
