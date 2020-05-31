import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1590560823419_3947';

  // add your egg config in here
  config.middleware = [];

  config.security = {
    domainWhiteList:['http://localhost:8000']
  }

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'clinic',
    // user: 'root',
    password: '1qaz!QAZ'
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };


  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
    underscored:false
  };
};
