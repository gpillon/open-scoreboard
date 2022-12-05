import { Injectable } from '@nestjs/common';
import config from '../config';

@Injectable()
export class EmailService {
  constructor() {} // private readonly logger: Logger

  public async sendEmail(email: string, text: string): Promise<boolean> {
    //this.logger.log(`email to be sent to: ${email}. Text: ${text}`);
    return Promise.resolve(true);
  }

  public async sendResetPasswordEmail(email, name, token): Promise<boolean> {
    const text =
      `Hello ${name},` +
      '\nWe have received password reset request. ' +
      `To do this, please proceed at ${config.frontEnd.domain}/#/auth/reset-password?resetPasswordToken=${token}` +
      "\nIf it wasn't you, take no action or contact support." +
      '\n\nThank you,' +
      '\nSupport team.';
    return this.sendEmail(email, text);
  }
}
