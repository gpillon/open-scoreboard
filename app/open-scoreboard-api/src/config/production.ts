import { EnvSpecificConfigInterface } from '../interface/config/EnvSpecificConfig.interface';
import { TYPEORM_ENTITIES, TYPEORM_SUBSCRIBERS } from './constants';

const prodConfig: EnvSpecificConfigInterface = {
  dataSourceOptions: {
    type: 'sqlite',
    database: 'data/data.db',
    entities: TYPEORM_ENTITIES,
    logging: true,
    subscribers: TYPEORM_SUBSCRIBERS,
    synchronize: Boolean(process.env.DB_SYNC === 'true'),
    migrations: ['./migration/**/*.{js, ts}'],
    migrationsRun: !Boolean(process.env.DB_MIGRATION_RUN === 'false'),
  },
};
export { prodConfig };
