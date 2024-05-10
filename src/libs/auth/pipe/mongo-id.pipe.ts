import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { IsMongoId } from "class-validator";

@Injectable()
export class MongoIdPipe implements PipeTransform {
    transform (value: any , metadata: ArgumentMetadata) {
        if (!IsMongoId(value)){
            throw new HttpException('Invalid MongoId', HttpStatus.BAD_REQUEST);
        } return value;
    }


}