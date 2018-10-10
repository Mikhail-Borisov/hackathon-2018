import { resolve } from 'path';
import { AppConfigLoader } from './components/configLoader/AppConfigLoader';
import { Application, ServerConfig } from './components/server/Application';

const configLoader = new AppConfigLoader(resolve(__dirname, '../config'));
const serverConfig = configLoader.getConfig('server') as ServerConfig;

new Application([], [], serverConfig)
    .run();
