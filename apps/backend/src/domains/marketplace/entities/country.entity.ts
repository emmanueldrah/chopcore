import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';

@Entity('countries')
export class Country extends BaseEntity {
  @Column({ unique: true })
  code: string; // e.g., 'GH'

  @Column()
  name: string;

  @Column()
  currencyCode: string; // e.g., 'GHS'

  @Column()
  currencySymbol: string; // e.g., '₵'

  @Column({ type: 'jsonb', default: {} })
  configuration: Record<string, any>;
}
