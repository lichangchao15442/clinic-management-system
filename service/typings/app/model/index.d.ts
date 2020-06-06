// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCheckProjects from '../../../app/model/checkProjects';
import ExportDictionary from '../../../app/model/dictionary';
import ExportOrders from '../../../app/model/orders';
import ExportPatients from '../../../app/model/patients';
import ExportSuppliers from '../../../app/model/suppliers';

declare module 'egg' {
  interface IModel {
    CheckProjects: ReturnType<typeof ExportCheckProjects>;
    Dictionary: ReturnType<typeof ExportDictionary>;
    Orders: ReturnType<typeof ExportOrders>;
    Patients: ReturnType<typeof ExportPatients>;
    Suppliers: ReturnType<typeof ExportSuppliers>;
  }
}
