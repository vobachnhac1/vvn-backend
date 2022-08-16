/* --------------------------------------------------------
 * Author Võ Bách Nhạc
 * Email vonhac.20394@gmail.com
 * Phone 0906.918.738
 * Created: 2022-03-30
 *------------------------------------------------------- */
import type { Config, Objectype, Production } from './config.interface';

const util = {
  isObject<T>(value: T): value is T & Objectype {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  },

  merge<T extends Objectype, U extends Objectype>(target: T, source: U): T & U {
    for (const key of Object.keys(source)) {
      const targetValue = target[key];
      const sourceValue = source[key];
      if (this.isObject(targetValue) && this.isObject(sourceValue)) {
        Object.assign(sourceValue, this.merge(targetValue, sourceValue));
      }
    }
    return { ...target, ...source };
  },
};

export const configuration = async (): Promise<Config> => {
  const { config } = await import('./envs/default');

  const envName = process.env.NODE_ENV || 'development';
  let { config: environment } = <{ config: Production }>(
    await import(`./envs/${envName}`)
  );

  try {
    const { config: local } = <{ config: any }>(
      await import(`./envs/${envName}.local`)
    );
    environment = util.merge(environment, local);
  } catch (ignored) {}
  return util.merge(config, environment);
};
