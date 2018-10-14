import { ExpressSessionWrapper, SessionConfig } from './ExpressSessionWrapper';
import { configLoader } from '../../configLoader';

const sessionWrapper = new ExpressSessionWrapper(configLoader.getConfig('session') as SessionConfig);

export { ExpressSessionWrapper, SessionConfig, sessionWrapper };