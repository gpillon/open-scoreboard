import { Injectable } from '@nestjs/common';
// import * as appRoot from 'app-root-path';
//import * as winston from 'winston';

@Injectable()
export class WinstonLogger /*implements LoggerService*/ {
  // // private readonly logDir = `${appRoot}/${config.logger.file.logDir}`;
  //  private readonly logFileUrl = `${this.logDir}/${config.logger.file.logFile}`;
  //
  //  private readonly logger = winston.createLogger({
  //    transports: [
  //      new winston.transports.File({
  //        level: config.logger.file.level,
  //        filename: this.logFileUrl,
  //        handleExceptions: true,
  //        // json: true,
  //        maxsize: config.logger.file.maxsize,
  //        maxFiles: config.logger.file.maxFiles,
  //        // colorize: false,
  //        // timestamp: () => (new Date()).toLocaleString('en-US', { hour12: false }),
  //      }),
  //      new winston.transports.Console({
  //        level: config.logger.console.level,
  //        handleExceptions: true,
  //        // json: false,
  //        // colorize: true,
  //        // timestamp: () => (new Date()).toLocaleString('en-US', { hour12: false }),
  //      }),
  //    ],
  //    exitOnError: false,
  //  });
  //
  //  constructor() {
  //    winston.addColors(winston.config.npm.colors);
  //
  //    if (!fs.existsSync(this.logDir)) {
  //      fs.mkdirSync(this.logDir);
  //    }
  //  }
  // debug(message: any, context?: string): any {
  //   this.logger.debug(this.getLogMessage(message, context));
  // }
  //
  // error(message: any, trace?: string, context?: string): any {
  //   this.logger.error(this.getLogMessage(message, context));
  // }
  //
  // log(message: any, context?: string): any {
  //   this.logger.log(
  //     config.logger.file.level,
  //     this.getLogMessage(message, context),
  //   );
  // }
  //
  // verbose(message: any, context?: string): any {
  //   this.logger.verbose(this.getLogMessage(message, context));
  // }
  //
  // warn(message: any, context?: string): any {
  //   this.logger.warn(this.getLogMessage(message, context));
  // }
  //
  // private getLogMessage(message: any, context?: string): string {
  //   return context ? `[${context}]: ${message}` : message;
  // }
}
