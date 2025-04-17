import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'

import { Lab } from './lab.entities'

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'question_text', type: 'varchar', length: 255 })
  questionText!: string

  @Column({ type: 'jsonb' })
  choices!: { value: string; text: string }[]

  @Column({ type: 'varchar', length: 255 })
  answer!: string

  @Column({ type: 'text' , nullable: true})
  explanation?: string

  @Column({ type: 'int', default: 0 })
  order!: number

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
