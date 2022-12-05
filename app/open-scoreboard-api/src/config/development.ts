import { EnvSpecificConfigInterface } from '../interface/config/EnvSpecificConfig.interface';
import { TYPEORM_ENTITIES, TYPEORM_SUBSCRIBERS } from './constants';

const devConfig: EnvSpecificConfigInterface = {
  dataSourceOptions: {
    // type: 'sqlite',
    // database: 'data/data.db',
    // entities: TYPEORM_ENTITIES,
    // synchronize: true,
    // logging: true,
    // subscribers: TYPEORM_SUBSCRIBERS,
    type: 'postgres',
    database: 'open-scoreboard',
    username: 'postgres',
    password: 'ybg654kYUKY234UgyByg2376BFyKDBk',
    entities: TYPEORM_ENTITIES,
    synchronize: true,
    logging: true,
    subscribers: TYPEORM_SUBSCRIBERS,
  },
};

//TODO: Generare dinamicamente il Datasource Tramite
// const devDataSourceMigrations = new DataSource(devConfig.dataSourceOptions);
export { devConfig };
