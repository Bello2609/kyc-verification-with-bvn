import { Module } from '@nestjs/common';
import { KycController } from './Kyc.controller';
import { KycService } from './Kyc.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from "../user/schemas/user.schema";
import { Kyc, KycSchema } from "./schemas/kyc.schema"

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name:  Kyc.name, schema: KycSchema}
      ]
    )
  ],
  controllers: [KycController],
  providers: [KycService]
})
export class KycModule {}
