import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'

import { LabStatusEnum } from '@/common/enum/lab.enum'
import { MediaTypeEnum } from '@/common/enum/media.enum'
import { Lab } from './lab.entities'

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', length: 255 })
  title!: string

  @Column({ type: 'text', nullable: true })
  content?: string

  @Column({ type: 'jsonb', name: 'attachment_path', nullable: true })
  attachmentPath!: { url: string , type: MediaTypeEnum }

  @Column({ type: 'int', default: 0 })
  order!: number

  @Column({ type: 'enum', enum: LabStatusEnum, default: LabStatusEnum.PUBLISHED })
  status!: LabStatusEnum

  @Column({ name: 'created_by', type: 'varchar', length: 255 })
  createdBy!: string

  @Column({ name: 'updated_by', type: 'varchar', length: 255, nullable: true })
  updatedBy?: string

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date

  @ManyToOne(() => Lab, (lab) => lab.lessons)
  lab!: Lab
}
