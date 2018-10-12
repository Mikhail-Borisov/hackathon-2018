import '../bootstrap';
import { DbConnectionFactory } from '../components/db/DbConnectionFactory';

void(async() => {
    const dbConfig = new DbConnectionFactory().getConfig([]);
    process.stdout.write(JSON.stringify(dbConfig));
})();

