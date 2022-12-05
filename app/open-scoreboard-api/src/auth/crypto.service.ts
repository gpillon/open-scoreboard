import {
  CharacterEncoding,
  createCipheriv,
  createDecipheriv,
  pbkdf2Sync,
  randomBytes,
} from 'crypto';
import { Injectable } from '@nestjs/common';
import { User } from '../api/user/entities/user.entity';
import { ReadUserDto } from '../api/user/dto/read-user.dto';
import config from '../config';
import { IToken } from './auth.interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CryptoService {
  private readonly cipherAlgorythm: string = 'aes256';
  private readonly hashAlgorythm: string = 'sha512';
  private readonly inputEncoding: string = 'utf8';
  private readonly outputEncoding: BufferEncoding = 'hex';
  private readonly SPLITTER_IV: string = ':';

  constructor(private jwtService: JwtService) {}

  public generateResponseTokens(
    user: User | ReadUserDto,
    rememberMe?: boolean,
  ): IToken {
    const normalizedUser = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };
    const accessTokenLife = rememberMe
      ? 315360000
      : config.auth.jwt.accessTokenLife;
    const refreshTokenLife = rememberMe
      ? 315360000
      : config.auth.jwt.refreshTokenLife;

    const accessToken: string = this.jwtService.sign(normalizedUser, {
      expiresIn: accessTokenLife,
      secret: config.auth.jwt.accessTokenSecret,
    });
    const refreshToken: string = this.jwtService.sign(normalizedUser, {
      expiresIn: accessTokenLife,
      secret: config.auth.jwt.accessTokenSecret,
    });
    return {
      expires_in: accessTokenLife,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  public hashPassword(password: string): { salt: string; hash: string } {
    // Salt is a pseudo-random data buffer contains raw bytes represented in hex
    const salt = randomBytes(32).toString(this.outputEncoding);
    const hash = this.getHash(password, salt);
    // Return the salt + hash of the password
    return { salt, hash };
  }

  public checkPassword(
    originalHash: string,
    salt: string,
    candidatePassword: string,
  ): boolean {
    const hash = this.getHash(candidatePassword, salt);
    return hash === originalHash;
  }

  public generateResetPasswordToken(id: string): string {
    const text = JSON.stringify({
      id,
      valid: new Date().getTime() + config.auth.resetPassword.ttl,
    });

    const iv = randomBytes(16);

    const cipher = createCipheriv(
      this.cipherAlgorythm,
      config.auth.resetPassword.secret.substring(0, 32),
      iv,
    );
    let token = cipher.update(text, this.inputEncoding as CharacterEncoding);
    token = Buffer.concat([token, cipher.final()]);

    return `${iv.toString(this.outputEncoding)}${
      this.SPLITTER_IV
    }${token.toString(this.outputEncoding)}`;
  }

  public decipherResetPasswordToken(token: string): Record<string, any> {
    const parts = token.split(this.SPLITTER_IV);
    const iv = Buffer.from(parts.shift(), this.outputEncoding);
    const tokenBody = Buffer.from(
      parts.join(this.SPLITTER_IV),
      this.outputEncoding,
    );

    const decipher = createDecipheriv(
      this.cipherAlgorythm,
      config.auth.resetPassword.secret.substring(0, 32),
      iv,
    );
    let decrypted = decipher.update(tokenBody);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return JSON.parse(decrypted.toString());
  }

  public getHash(password: string, salt: string): string {
    // Generate Hash using Password based key derivative function (PBKDF2)
    return pbkdf2Sync(password, salt, 2048, 32, this.hashAlgorythm).toString(
      this.outputEncoding,
    );
  }
}
