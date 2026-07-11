import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
import { IdentityService } from '../../domains/identity/services/identity.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private supabase: SupabaseClient;

  constructor(
    private configService: ConfigService,
    private identityService: IdentityService,
  ) {
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL')!,
      this.configService.get<string>('SUPABASE_ANON_KEY')!,
    );
  }

  async use(req: any, res: any, next: () => void) {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new UnauthorizedException();

    const token = authHeader.split(' ')[1];
    const { data: { user }, error } = await this.supabase.auth.getUser(token);

    if (error || !user) throw new UnauthorizedException();

    // Attach domain user to request
    req.user = await this.identityService.validateSupabaseUser(user.id, user.phone || user.email || '');
    next();
  }
}
