import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { TokenService } from './token.service';
import { PayloadDto } from 'src/dtos/payload.dto';

@Controller()
export class TokenController {
  constructor(private readonly tokenServices: TokenService) {}
  @EventPattern('generate-token')
  async createToken(@Payload() data: PayloadDto): Promise<string> {
    const newToken = await this.tokenServices.createToken(data);

    return newToken;
  }

  @EventPattern('validation-token')
  async checkToken(@Payload() data: string): Promise<boolean> {
    const newToken = await this.tokenServices.tokenValidation(data);

    return newToken;
  }
}
