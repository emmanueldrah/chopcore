import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { IdentityModule } from './domains/identity/identity.module';
import { MarketplaceModule } from './domains/marketplace/marketplace.module';
import { TransactionModule } from './domains/transaction/transaction.module';
import { FinancialModule } from './domains/financial/financial.module';
import { TrustModule } from './domains/trust/trust.module';
import { AuditMiddleware } from './core/middleware/audit.middleware';

@Module({
  imports: [
    CoreModule,
    IdentityModule,
    MarketplaceModule,
    TransactionModule,
    FinancialModule,
    TrustModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuditMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
