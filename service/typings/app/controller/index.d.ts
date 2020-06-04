// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCheckProjects from '../../../app/controller/checkProjects';
import ExportDictionary from '../../../app/controller/dictionary';
import ExportHome from '../../../app/controller/home';
import ExportOrders from '../../../app/controller/orders';
import ExportPatients from '../../../app/controller/patients';

declare module 'egg' {
  interface IController {
    checkProjects: ExportCheckProjects;
    dictionary: ExportDictionary;
    home: ExportHome;
    orders: ExportOrders;
    patients: ExportPatients;
  }
}
