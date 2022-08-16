/* --------------------------------------------------------
 * Author Võ Bách Nhạc
 * Email vonhac.20394@gmail.com
 * Phone 0906.918.738
 * Created: 2022-03-30
 *------------------------------------------------------- */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmConfigPostgres: TypeOrmModuleOptions = {
  name: 'POSTGRE_CONNECTION',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'bachnhac1',
  database: 'nestjs',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
};

export const TypeOrmConfigOracle: TypeOrmModuleOptions = {
  type: 'oracle',
  host: 'localhost',
  port: 9092,
  username: 'username',
  password: 'bachnhac',
  sid: 'XE',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
};

export const TypeOrmConfigMySQL1: TypeOrmModuleOptions = {
  name: 'MYSQL_CONNECTION',
  type: 'mysql',
  host: 'binhtan-its.com',
  port: 3306,
  username: 'binhtamao7ys_php',
  password: 'B@chnhac1',
  database: 'binhtamao7ys_HOME',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
};

export const TypeOrmConfigMySQL2: TypeOrmModuleOptions = {
  name: 'MYSQL_CONNECTION_DEMO',
  type: 'mysql',
  host: 'binhtan-its.com',
  port: 3306,
  username: 'binhtamao7ys_php',
  password: 'B@chnhac1',
  database: 'binhtamao7ys_MOBILE',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
};
