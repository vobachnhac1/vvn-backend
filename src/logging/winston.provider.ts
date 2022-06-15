/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-30
*------------------------------------------------------- */
import * as path from 'path';
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;
const isDevelopment: boolean = process.env.NODE_ENV !== 'production';

const ROOT_STORAGE: string =
  process.env.LOG_ROOT_STORAGE || path.resolve(path.dirname(__dirname), 'logs');

const formatContextName = (context: string, length = 16): string => {
  if (!context) {
    return '_'.repeat(length);
  }
  if (context.length > length) {
    return context.substring(0, length - 3) + '...';
  } else {
    return context.padEnd(length, ' ');
  }
};

const formatMessage = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  printf(
    (i) =>
      `${i.timestamp} [${i.level
        .toUpperCase()
        .padEnd(5, ' ')}] [${formatContextName(i.context)}] ${i.message}`
  )
);

export const logger = createLogger({
  level: process.env.LOGGER_LEVEL || 'info',
  format: formatMessage,
  transports: [
    new transports.File({
      level: process.env.LOGGER_LEVEL || 'info',
      filename: path.resolve(ROOT_STORAGE, `backup.log`),
      maxFiles: 10,
      maxsize: 5242880
    })
  ]
});

if (isDevelopment) {
  logger.add(new transports.Console({ level: 'debug' }));
}
