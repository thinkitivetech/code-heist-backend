import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'code_heist_db',
        entities: ["dist/**/*.entity.js"],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];