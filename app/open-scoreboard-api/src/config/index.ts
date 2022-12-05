import { getEnv } from './helpers/get-env.function';
import { devConfig } from './development';
import { prodConfig } from './production';
import { testConfig } from './test';
import { AppConfigInterface } from '../interface/config/AppConfig.interface';
import { merge } from 'lodash';
import { BaseConfigInterface } from '../interface/config/BaseConfig.interface';

function generateConfig(): AppConfigInterface {
  const baseConfig: BaseConfigInterface = {
    env: getEnv(),
  };

  switch (getEnv()) {
    case 'dev':
      return merge(baseConfig, devConfig);
    case 'prod':
      return merge(baseConfig, prodConfig);
    case 'test':
      return merge(baseConfig, testConfig);
  }
}

const appConfig: AppConfigInterface = generateConfig();

export { appConfig as config };
