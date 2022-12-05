import {BaseConfigInterface} from './BaseConfig.interface';
import {EnvSpecificConfigInterface} from './EnvSpecificConfig.interface';

export interface AppConfigInterface extends BaseConfigInterface, EnvSpecificConfigInterface {

}
