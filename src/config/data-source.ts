import { DataSource, DataSourceOptions } from 'typeorm'
import { SeederOptions } from 'typeorm-extension'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

import entities from '@/database/entities'
import configuration from '@/config/configuraton'

const config = configuration()

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  entities: entities,
  logging: config.mode === 'development',
  migrations: ['src/database/migrations/*{.ts,.js}'],
  seeds: ['src/database/seeds/*{.ts,.js}'],
}

export const AppDataSource = new DataSource(options)