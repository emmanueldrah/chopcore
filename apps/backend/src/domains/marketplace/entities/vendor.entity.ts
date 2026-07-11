import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';
import { User } from '../../identity/entities/user.entity';
import { Country } from './country.entity';
import { VendorCategory } from '../enums/vendor-category.enum';
import { VerificationStatus } from '../enums/verification-status.enum';
import { Item } from './item.entity';

@Entity('vendors')
export class Vendor extends BaseEntity {
  @Column()
  businessName: string;

  @ManyToOne(() => User)
  owner: User;

  @ManyToOne(() => Country)
  country: Country;

  @Column({ type: 'enum', enum: VendorCategory })
  category: VendorCategory;

  @Column({ type: 'enum', enum: VerificationStatus, default: VerificationStatus.PENDING })
  verificationStatus: VerificationStatus;

  @Column({ nullable: true })
  addressText: string;

  @Column({ type: 'float', nullable: true })
  latitude: number;

  @Column({ type: 'float', nullable: true })
  longitude: number;

  @Column({ type: 'jsonb', default: {} })
  openHours: Record<string, any>;

  @OneToMany(() => Item, (item) => item.vendor)
  items: Item[];
}
