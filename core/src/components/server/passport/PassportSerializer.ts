import { SerializableUserRecord } from './SerializableUserRecord';
import { SerializedUser } from './SerializedUser';

type SerializationCallback = (error: Error | null, user: SerializedUser | null) => void;
type DeserializationCallback = (error: Error | null, user: SerializedUser | null ) => void;

export class PassportSerializer {
    public static serialize(record: SerializableUserRecord, done: SerializationCallback) {
        const result: SerializedUser = {
            id: record.id,
            role: record.role
        };
        done(null, result);
    }

    public static async deserialize(sessionUser: SerializedUser, done: DeserializationCallback) {
        try {
            done(null, sessionUser);
        } catch (exception) {
            done(exception, null);
        }

    }
}
