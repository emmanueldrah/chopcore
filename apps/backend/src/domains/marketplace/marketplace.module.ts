import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { Vendor } from './entities/vendor.entity';
import { Item } from './entities/item.entity';
import { MarketplaceService } from './services/marketplace.service';
import { CountryConfigService } from './services/country-config.service';

@Module({
  imports: [TypeOrmModule.forFeature([Country, Vendor, Item])],
  providers: [MarketplaceService, CountryConfigService],
  exports: [MarketplaceService, CountryConfigService],
})
export class MarketplaceModule {}
