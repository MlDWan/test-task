import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import dbConfig from './config/configDb';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ...dbConfig,
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
