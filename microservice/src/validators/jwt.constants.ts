import { JwtModule } from '@nestjs/jwt';
const secret = 'secretKey';

export const jwtConstants = {
  secret,
  JWTModule: JwtModule.register({
    global: true,
    secret,
    signOptions: { expiresIn: '24h' },
  }),
};
