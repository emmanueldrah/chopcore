import { Injectable } from '@nestjs/common';

export interface CountryConfig {
  currencyCode: string;
  currencySymbol: string;
  taxRate: number;
  paymentMethods: string[];
  deliveryZones: string[];
}

@Injectable()
export class CountryConfigService {
  private readonly configs: Record<string, CountryConfig> = {
    GH: {
      currencyCode: 'GHS',
      currencySymbol: '₵',
      taxRate: 0.15,
      paymentMethods: ['MTN_MOMO', 'TELECEL_CASH', 'AT_MONEY'],
      deliveryZones: ['HO_CENTRAL', 'KLEFE', 'ADAKLU'],
    },
    // Future expansion: NG, KE, etc.
  };

  getConfig(countryCode: string): CountryConfig {
    return this.configs[countryCode] || this.configs['GH'];
  }
}
