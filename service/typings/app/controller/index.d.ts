// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCheckProjects from '../../../app/controller/checkProjects';
import ExportCommon from '../../../app/controller/common';
import ExportDepartments from '../../../app/controller/departments';
import ExportDictionary from '../../../app/controller/dictionary';
import ExportEmployees from '../../../app/controller/employees';
import ExportHome from '../../../app/controller/home';
import ExportOrders from '../../../app/controller/orders';
import ExportPatients from '../../../app/controller/patients';
import ExportRoles from '../../../app/controller/roles';
import ExportSuppliers from '../../../app/controller/suppliers';

declare module 'egg' {
  interface IController {
    checkProjects: ExportCheckProjects;
    common: ExportCommon;
    departments: ExportDepartments;
    dictionary: ExportDictionary;
    employees: ExportEmployees;
    home: ExportHome;
    orders: ExportOrders;
    patients: ExportPatients;
    roles: ExportRoles;
    suppliers: ExportSuppliers;
  }
}
