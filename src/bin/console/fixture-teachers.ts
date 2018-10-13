import '../../bootstrap';
import { initDbContainer } from '../../components/ioc/initDbContainer';
import { getRepository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { User } from '../../modules/user/models/User';
import { PasswordService } from '../../modules/user/service/PasswordService';
const data = (require('../../../fixtures/users') as User[]).filter(user => user.role === 'teacher');

void initDbContainer().then(async() => {
    const repository = getRepository(User);
    const existingUsers = await repository.find();
    existingUsers.forEach(existingUser => {
        data.forEach(user => {
            if (user.email === existingUser.email) {
                throw new Error('Email already exists: ' + JSON.stringify(user, null, 2));
            }
        });
    }); 
    const users = 
        plainToClass(User, data)
        .map(user => {
            user.password = PasswordService.getHmac(user.password);
            return user;
        });

    await repository.save(users);
});