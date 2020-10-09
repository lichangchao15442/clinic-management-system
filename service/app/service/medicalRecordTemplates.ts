const Service = require('egg').Service;
const _ = require('lodash');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

import { toInt, hasValue } from '../utils/util'


class MedicalRecordTemplatesService extends Service { 
  async getMedicalRecordTemplateList(params) {
    const ctx = this.ctx;
    const { pageSize = 10, pageNum = 1, query } = params;
    let where = {}
    // 查询条件
    const requestQuery = JSON.parse(query)
    Object.keys(requestQuery).map(key => {
      if (requestQuery.hasOwnProperty(key) && hasValue(requestQuery[key])) {
        console.log('key',key )
        switch (key) {
          case 'authority':
            where[key] = requestQuery[key]
            break;
          case 'search':
            where[Op.or] = [
              {
                name: requestQuery[key].trim(),
              },
              {
                number:requestQuery[key].trim()
              }
            ]
            break;
        
          default:
            break;
        }
      }
    })
    const allData = await ctx.model.MedicalRecordTemplates.findAll({where});
    const data = await ctx.model.MedicalRecordTemplates.findAll({
      limit: toInt(pageSize),
      offset: (toInt(pageNum) - 1) * toInt(pageSize),
      where
    });
    const newData:{[key:string]:any} = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      const dataItem = _.cloneDeep(item)
      const diagnosises = item.diagnosis.split(' ');
      const diagnosisNames: string[] = [];

      for (let j = 0; j < diagnosises.length; j++) {
        const diagnosis = await ctx.model.Dictionary.findByPk(toInt(diagnosises[j]));
        diagnosisNames.push(diagnosis.name);
      }
      dataItem.diagnosis = diagnosisNames.join(' ')
      
      newData.push(dataItem)
    }
    return {
      list: newData,
      total: allData.length
    };
  }
};

export { };

module.exports = MedicalRecordTemplatesService;