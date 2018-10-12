import { resolve } from 'path';
import { DbConnectionFactory } from '../db/DbConnectionFactory';

export async function initDbContainer(): Promise<void> {
    await (new DbConnectionFactory())
        .create([resolve(__dirname, '../../modules/**/models/*.js')]);
}