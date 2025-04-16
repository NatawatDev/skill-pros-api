import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

import { AdminRoleEnum, AdminStatusEnum } from '@/common/enum/admin.enum'

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', length: 150 })
  firstname!: string

  @Column({ type: 'varchar', length: 150 })
  lastname!: string

  @Column({ type: 'varchar', length: 150, unique: true })
  email!: string

  @Column({ type: 'varchar', length: 20 })
  phone!: string

  @Column({ type: 'varchar', length: 150,  nullable: true })
  password?: string

  @Column({ type: 'varchar', length: 20, default: AdminStatusEnum.PENDING })
  status!: AdminStatusEnum

  @Column({ type: 'varchar', length: 20, default: AdminRoleEnum.EDITOR })
  role!: AdminRoleEnum

  @Column({ name: 'invite_token', type: 'varchar', length: 255, nullable: true })
  inviteToken?: string | null

  @Column({ name: 'reset_password_token', type: 'varchar', length: 255, nullable: true })
  resetPasswordToken?: string

  @Column({ name: 'refresh_token', type: 'varchar', length: 255, nullable: true })
  refreshToken?: string | null

  @Column({ name: 'invited_at', type: 'timestamp', nullable: true })
  invitedAt?: Date

  @Column({ name: 'last_login_at', type: 'timestamp', nullable: true })
  lastLoginAt?: Date

  @Column({ name: 'invited_by', type: 'int', nullable: true })
  invitedBy?: number

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date
}
