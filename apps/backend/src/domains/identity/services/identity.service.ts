import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IdentityService {
  private supabase: SupabaseClient;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL')!,
      this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY')!,
    );
  }

  async validateSupabaseUser(supabaseId: string, emailOrPhone: string) {
    let user = await this.userRepository.findOne({ where: { supabaseId } });

    if (!user) {
      user = this.userRepository.create({
        supabaseId,
        phoneNumber: emailOrPhone,
      });
      await this.userRepository.save(user);
    }

    return user;
  }
}
