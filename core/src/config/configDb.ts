import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

const configService = new ConfigService();

const dbConfig = [
  ConfigModule.forRoot({ envFilePath: '.env' }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    username: 'postgres',
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    synchronize: true,
    autoLoadEntities: true,
  }),
];

export default dbConfig;
