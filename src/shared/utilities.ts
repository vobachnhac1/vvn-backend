/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-30
*------------------------------------------------------- */

import * as path from 'path';
import * as fsx from 'fs-extra';

import { Logger } from 'src/logging';

const logger = new Logger('Ultilities');

export const isExistedDir = (dirPath: string): boolean => {
  if (!dirPath || !fsx.existsSync(dirPath)) {
    return false;
  }
  return fsx.statSync(dirPath).isDirectory();
};

export const checkExitedDir = (dirPath: string): void => {
  if (!dirPath || !fsx.existsSync(dirPath)) {
    throw new Error(`[${dirPath}] isn't exist`);
  }

  if (!fsx.statSync(dirPath).isDirectory()) {
    throw new Error(`[${dirPath}] isn't a directory`);
  }
};

export const checkWritableDir = (dirPath: string): void => {
  checkExitedDir(dirPath);
  fsx.accessSync(dirPath, fsx.constants.W_OK);
};

export const createDir = (...paths: Array<string>): string => {
  const target = path.resolve(...paths).normalize();
  fsx.mkdirSync(target, { recursive: true });
  return target;
};

export const removeDirSilent = (targetDir: string): void => {
  try {
    if (isExistedDir(targetDir)) {
      fsx.removeSync(targetDir);
    }
  } catch (error) {
    logger.error(`Cannot clean a directory [${targetDir}]`, error);
  }
};
