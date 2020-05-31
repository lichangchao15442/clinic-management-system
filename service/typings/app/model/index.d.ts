// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportPatients from '../../../app/model/patients';

declare module 'egg' {
  interface IModel {
    Patients: ReturnType<typeof ExportPatients>;
  }
}
