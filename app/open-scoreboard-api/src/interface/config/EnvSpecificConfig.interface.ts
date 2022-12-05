import { DataSourceOptions } from 'typeorm';

export interface EnvSpecificConfigInterface {
  dataSourceOptions: DataSourceOptions;
}
