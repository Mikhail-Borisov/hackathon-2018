import { resolve } from 'path';
import { AppConfigBuilder } from './components/configBuilder/AppConfigBuilder';

const configBuilder = new AppConfigBuilder(resolve(__dirname, '../config'));
configBuilder.print();