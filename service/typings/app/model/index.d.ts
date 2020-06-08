// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCheckProjects from '../../../app/model/checkProjects';
import ExportDepartments from '../../../app/model/departments';
import ExportDictionary from '../../../app/model/dictionary';
import ExportEmployees from '../../../app/model/employees';
import ExportOrders from '../../../app/model/orders';
import ExportPatients from '../../../app/model/patients';
import ExportRoles from '../../../app/model/roles';
import ExportSuppliers from '../../../app/model/suppliers';

declare module 'egg' {
  interface IModel {
    CheckProjects: ReturnType<typeof ExportCheckProjects>;
    Departments: ReturnType<typeof ExportDepartments>;
    Dictionary: ReturnType<typeof ExportDictionary>;
    Employees: ReturnType<typeof ExportEmployees>;
    Orders: ReturnType<typeof ExportOrders>;
    Patients: ReturnType<typeof ExportPatients>;
    Roles: ReturnType<typeof ExportRoles>;
    Suppliers: ReturnType<typeof ExportSuppliers>;
  }
}
