import { resolve } from 'path';
import { AppConfigBuilder } from './components/configBuilder/AppConfigBuilder';
import { Application } from './components/server/Application';

const configBuilder = new AppConfigBuilder(resolve(__dirname, '../config'));
configBuilder.print();

new Application([], [])
    .setHost('localhost')
    .setPort(3000)
    .setWorkers(2)
    .run();