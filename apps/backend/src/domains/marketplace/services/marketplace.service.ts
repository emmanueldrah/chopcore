import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from '../entities/vendor.entity';
import { Item } from '../entities/item.entity';
import { VendorCategory } from '../enums/vendor-category.enum';

@Injectable()
export class MarketplaceService {
  constructor(
    @InjectRepository(Vendor)
    private vendorRepository: Repository<Vendor>,
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async createItem(vendorId: string, itemData: Partial<Item>) {
    const vendor = await this.vendorRepository.findOne({ where: { id: vendorId } });
    if (!vendor) throw new BadRequestException('Vendor not found');

    // Bible Principle: Pharmacy OTC Enforcement
    if (vendor.category === VendorCategory.PHARMACY_OTC && !itemData.otcCategoryId) {
      throw new BadRequestException('Pharmacy items must have an OTC category. Prescription drugs are strictly prohibited.');
    }

    const item = this.itemRepository.create({ ...itemData, vendor });
    return this.itemRepository.save(item);
  }
}
