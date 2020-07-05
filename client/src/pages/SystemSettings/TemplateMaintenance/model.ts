import { Subscription } from 'umi';

import { TemplateMaintenanceState } from './data';

interface TemplateMaintenanceModel {
  namespace: string;
  state: TemplateMaintenanceState;
  effects: {};
  reducers: {};
  subscriptions: {
    setup: Subscription;
  };
}

const Model: TemplateMaintenanceModel = {
  namespace: 'templateMaintenance',

  state: {},

  effects: {},

  reducers: {},

  subscriptions: {
    setup({ history, dispatch }) {
      history.listen(({ pathname }) => {
        if (pathname.includes('/system-settings/template-maintenance/add')) {
          // 改变当前页面的操作类型为add
          dispatch({
            type: 'common/save',
            payload: {
              operationType: 'add',
            },
          });
          // 页面为新增病历模版
          if (
            pathname ===
            '/system-settings/template-maintenance/add-medical_record'
          ) {
            // 获取自动填充的编号
            dispatch({
              type: 'common/fetchInitNumber',
              payload: {
                name: 'medicalRecordTemplate',
              },
            });
          }
        } else if (
          pathname.includes('/system-settings/template-maintenance/edit')
        ) {
          // 改变当前操作类型为edit
          dispatch({
            type: 'common/save',
            payload: {
              operationType: 'edit',
            },
          });
        }

        // 新增/编辑病历模版（获取公共数据）
        if (
          pathname ===
            '/system-settings/template-maintenance/add-medical_record' ||
          pathname ===
            '/system-settings/template-maintenance/edit-medical_record'
        ) {
          dispatch({
            type: 'common/fetchAllDictionary',
          });
        }
      });
    },
  },
};

export default Model;
