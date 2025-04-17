import { LabStatusEnum } from '@/common/enum/lab.enum'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import { Lesson } from './lesson.entities'
import { MediaTypeEnum } from '@/common/enum/media.enum'
import { Question } from './question.entity'

@Entity('labs')
export class Lab {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', length: 255 })
  name!: string

  @Column({ type: 'text', nullable: true })
  description?: string

  @Column({ name: 'attachment_path', type: 'jsonb', nullable: true })
  attachmentPath!: { url: string , type: MediaTypeEnum }

  @Column({ name: 'created_by', type: 'varchar', length: 255 })
  createdBy!: string

  @Column({ name: 'updated_by', type: 'varchar', length: 255, nullable: true })
  updatedBy?: string

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date

  @Column({
    name: 'status',
    type: 'enum',
    enum: LabStatusEnum,
    default: LabStatusEnum.PUBLISHED,
  })
  status!: LabStatusEnum 

  @OneToMany(() => Lesson, (lesson) => lesson.lab, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  lessons!: Lesson[]

  @OneToMany(() => Question, (question) => question.lab, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  questions!: Question[]
}

