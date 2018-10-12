import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class User {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public username!: string;

    @Column({ nullable: true })
    public firstName?: string;

    @Column({ nullable: true })
    public phoneNumber?: string;

    @Column({ nullable: true })
    public email?: string;

    @Column()
    public role!: string;

    @Column()
    public password!: string;
}

export { User };