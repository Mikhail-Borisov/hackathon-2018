import * as crypto from 'crypto';
import { NotAcceptableError } from 'routing-controllers';

type PasswordConfig = {
    minimumLength: number;
    secret: string;
};

const config: PasswordConfig = {
    minimumLength: 8,
    secret: '231123qwdasdawfd'
};

class PasswordService {
    public static validate(code: string): void | never {
        if (!code) {
            throw new NotAcceptableError('Password param required');
        }
        if (code.length < config.minimumLength) {
            throw new NotAcceptableError('Invalid password length');
        }
    }

    public static compare(actualPwd: string, expectedPwd: string): void | never {
        if (actualPwd.length !== expectedPwd.length) {
            throw new NotAcceptableError('Invalid auth data!');
        }
        const isValid = crypto.timingSafeEqual(Buffer.from(actualPwd), Buffer.from(expectedPwd));
        if (!isValid) {
            throw new NotAcceptableError('Invalid auth data!');
        }
    }

    public static getHmac(str: string): string {
        return crypto
            .createHash('sha256')
            .update(str + '-' + config.secret)
            .digest('hex');
    }
}

export { PasswordService };