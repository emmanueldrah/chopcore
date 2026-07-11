import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';
import { UserRole } from '../../../shared/enums/roles.enum';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  phoneNumber: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.BUYER })
  role: UserRole;

  @Column({ unique: true })
  supabaseId: string;

  @Column({ type: 'jsonb', default: {} })
  notificationPrefs: Record<string, any>;
}
