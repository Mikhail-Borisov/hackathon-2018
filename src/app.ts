import { resolve } from 'path';
import { AppConfigBuilder } from './components/configBuilder/AppConfigBuilder';
import { Application, ServerConfig } from './components/server/Application';

const configBuilder = new AppConfigBuilder(resolve(__dirname, '../config'));
const serverConfig = configBuilder.getConfig('server') as ServerConfig;

new Application([], [], serverConfig)
    .run();