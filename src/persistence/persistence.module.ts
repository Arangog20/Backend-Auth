import { Global, Module } from '@nestjs/common';
import {configType} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';

@Global()
@Module({
    imports: [
        MongooseModule.forFeatureAsync({
            useFactory: () => {
                qwe
            }
        })
    ]
})
export class PersistenceModule {}
