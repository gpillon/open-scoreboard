import { EnvSpecificConfigInterface } from '../interface/config/EnvSpecificConfig.interface';
import { TYPEORM_ENTITIES, TYPEORM_SUBSCRIBERS } from './constants';

const testConfig: EnvSpecificConfigInterface = {
  dataSourceOptions: {
    type: 'sqlite',
    database: 'data/data.db',
    entities: TYPEORM_ENTITIES,
    synchronize: true,
    logging: true,
    subscribers: TYPEORM_SUBSCRIBERS,
  },
};

export { testConfig };
