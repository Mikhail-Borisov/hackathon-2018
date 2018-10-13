import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export const categories = [
    'IT, телеком',
    'Маркетинг',
    'Консультирование',
    'Наука, образование',
    'Банки',
    'Управление персоналом',
    'Искусство, медиа',
    'Производство',
    'Топ-менеджмент',
    'Безопасность'
];

@Entity('skill_tag')
export class SkillTag {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public title: string;

    @Column()
    public imageUrl?: string;
}