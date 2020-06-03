// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDictionary from '../../../app/model/dictionary';
import ExportOrders from '../../../app/model/orders';
import ExportPatients from '../../../app/model/patients';

declare module 'egg' {
  interface IModel {
    Dictionary: ReturnType<typeof ExportDictionary>;
    Orders: ReturnType<typeof ExportOrders>;
    Patients: ReturnType<typeof ExportPatients>;
  }
}
