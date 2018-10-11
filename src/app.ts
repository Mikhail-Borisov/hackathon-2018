import { configLoader } from './components/configLoader';
import { Application, ServerConfig } from './components/server/Application';

configLoader.print();
const serverConfig = configLoader.getConfig('server') as ServerConfig;

new Application([], [], serverConfig)
    .run();
