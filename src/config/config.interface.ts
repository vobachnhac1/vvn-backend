/* --------------------------------------------------------
 * Author Võ Bách Nhạc
 * Email vonhac.20394@gmail.com
 * Phone 0906.918.738
 * Created: 2022-03-30
 *------------------------------------------------------- */
import type { config as base } from './envs/default';
import type { config as production } from './envs/production';

export type Objectype = Record<string, unknown>;
export type Default = typeof base;
export type Production = typeof production;
export type Config = Default & Production;
