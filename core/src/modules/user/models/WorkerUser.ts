import { UserRole } from './User';

export class WorkerUser {
    public id: number;
    public email: string;
    public firstname: string;
    public lastname: string;
    public role: UserRole;
}