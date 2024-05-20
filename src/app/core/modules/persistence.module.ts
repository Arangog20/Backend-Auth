import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import dbConfig from '../../infrastructure/persistence/db_config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof dbConfig>) => {
        const { db, env } = configService;
        const uriDb =
          env === 'production' 
          ? `${db.connection}${db.host}`
          : `mongodb+srv://${db.user}:${db.password}${db.cluster}.mongodb.net/${db.name}?retryWrites=true&w=majority`;
        return {
          uri: uriDb,
        };
      },
      inject: [dbConfig.KEY],
    }),
  ],
})
export class PersistenceModule {}



