import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadDto } from 'src/dtos/payload.dto';
import { jwtConstants } from 'src/validators/jwt.constants';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}
  async createToken(data: PayloadDto): Promise<string> {
    const payload = { username: data.email, sub: data.id };
    const token = this.jwtService.sign(payload);

    return token;
  }

  async tokenValidation(token: string): Promise<boolean> {
    const payload = await this.jwtService
      .verifyAsync(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFzZHNkYWRzc3Nzc3Nzc3NkZmFhc3Nzc3Nkc3NhYWZzZGFhc3NkYWFhYWFzc2Fkc3Nkc2FkZ0Biay5ydSIsInN1YiI6Ijc3NDNlODBlLTE1YWItNDg5MC04NzBmLTc0YjM5MWI0OWU1OCIsImlhdCI6MTY4ODUzODMwOCwiZXhwIjoxNjg4NjI0NzA4fQ._keibR1Hjwdu4PNGmPzxNoBPQXHP5TdJHGZxil3rFJc',
        {
          secret: jwtConstants.secret,
        },
      )
      .then((data) => {
        return data;
      })
      .catch(() => {
        return false;
      });

    return payload;
  }
}
