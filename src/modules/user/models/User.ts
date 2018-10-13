import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


export type UserCreateData = {
    email: string;
    firstname?: string;
    lastname?: string;
    role: UserRole;
};


export enum UserRole {
    WORKER = 'worker',
    EMPLOYER = 'employer',
    TEACHER = 'teacher',
}

export const userRoles = Object.keys(UserRole).map(key => UserRole[key as any]);

@Entity('auth_user')
class User {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public email: string;

    @Column()
    public role!: string;

    @Column()
    public password!: string;

    @Column({ nullable: true })
    public firstname: string;

    @Column({ nullable: true })
    public lastname: string;

    @Column({ nullable: true })
    public phoneNumber?: string;

    @Column({ nullable: true })
    public userpicUrl?: string;

    public setPassword(plainText: string): void {
        this.password = plainText;
    }
}

export { User };