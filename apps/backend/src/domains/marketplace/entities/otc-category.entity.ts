import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';

@Entity('otc_categories')
export class OtcCategory extends BaseEntity {
  @Column({ unique: true })
  name: string; // e.g., 'Pain Relievers'

  @Column({ type: 'text', nullable: true })
  description: string;
}
