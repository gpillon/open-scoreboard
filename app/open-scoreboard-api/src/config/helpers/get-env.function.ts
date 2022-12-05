import { Environments } from '../../interface/config/Environments';

export function getEnv() {
  let env: Environments;
  switch (process.env.NODE_ENV) {
    case 'production':
      env = 'prod';
      break;
    case 'test':
      env = 'test';
      break;
    case 'development':
    default:
      env = 'dev';
      break;
  }
  return env;
}
