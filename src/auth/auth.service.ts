import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { JwtPayload, sign } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { User } from 'src/users/models/users.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private readonly usersModel: Model<User>,
  ) {}

  public createAccessToken(userId: string): string {
    return sign({ userId }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRATION as string,
    });
  }

  public async validateUser(jwtPayload: JwtPayload): Promise<User> {
    const user = await this.usersModel.findOne({ _id: jwtPayload.userId });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  private jwtExtractor(request: Request): string {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new BadRequestException('Bad request');
    }

    return authHeader.split(' ').at(1) as string;
  }

  public returnJwtExtractor(): (request: Request) => string {
    return (request: Request) => this.jwtExtractor(request);
  }
}
