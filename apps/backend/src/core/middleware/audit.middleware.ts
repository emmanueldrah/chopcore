import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, body, user } = req as any;

    // In a production Amazon-grade system, this would queue a job to a persistent ledger
    if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(method)) {
      console.log(`[AUDIT] ${new Date().toISOString()} - User: ${user?.id || 'ANON'} - Action: ${method} ${url}`);
    }
    next();
  }
}
