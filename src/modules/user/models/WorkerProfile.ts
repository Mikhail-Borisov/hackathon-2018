import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    ManyToMany,
    JoinTable 
} from 'typeorm';
import { SkillTag } from '../../../modules/course/models/Tag';
import { JobStrory } from './JobStory';
import { User } from './User';

@Entity()
class WorkerProfile {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public userId: number;

    @ManyToMany(() => SkillTag, {
        eager: true,
        cascade: ['update', 'insert']
    })
    @JoinTable()
    public skillTags: SkillTag[];

    @Column('json')
    public jobs: JobStrory[];

    public setUserId(user: User) {
        this.userId = user.id;
    }
}

export { WorkerProfile };