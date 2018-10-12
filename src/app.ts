import './bootstap';
import { resolve } from 'path';
import { configLoader } from './components/configLoader';
import { initDbContainer } from './components/ioc/initDbContainer';
import { Application, ServerConfig } from './components/server/Application';

import { middlewares } from './components/server/middlewares';
const CONTROLLERS_PATH = resolve(__dirname, 'modules/**/controllers/*.js');

void initDbContainer().then(() => {
    const serverConfig = configLoader.getConfig('server') as ServerConfig;
    new Application([CONTROLLERS_PATH], middlewares, serverConfig)
        .run();
});
