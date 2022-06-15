/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-30
*------------------------------------------------------- */
import { LoggerService } from '@nestjs/common';

import { logger } from './winston.provider';

export class Logger implements LoggerService {
  constructor(private readonly context: string) {
    if (!this.context) {
      throw new Error('A logger must contain a context');
    }
  }

  public info(message: any, ...optionalParams: any[]): void {
    logger.info(message, { ...optionalParams, context: this.context });
  }

  public log(message: any, ...optionalParams: any[]): void {
    logger.info(message, { ...optionalParams, context: this.context });
  }

  public error(message: any, ...optionalParams: any[]): void {
    logger.error(message, { ...optionalParams, context: this.context });
    optionalParams.forEach((param) => {
      if (param instanceof Error) {
        logger.error(param.stack, { context: this.context });
      }
    });
  }

  public warn(message: any, ...optionalParams: any[]): void {
    logger.warn(message, { ...optionalParams, context: this.context });
  }

  public debug(message: any, ...optionalParams: any[]): void {
    logger.debug(message, { ...optionalParams, context: this.context });
  }

  public verbose(message: any, ...optionalParams: any[]): void {
    logger.verbose(message, { ...optionalParams, context: this.context });
  }

  public trace(message: any, ...optionalParams: any[]): void {
    logger.verbose(message, { ...optionalParams, context: this.context });
  }

  public fatal(message: any, ...optionalParams: any[]): void {
    logger.silly(message, { ...optionalParams, context: this.context });
  }

  public child() {
    return this;
  }
}
