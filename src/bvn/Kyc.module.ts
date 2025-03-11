import { Module } from '@nestjs/common';
import { KycController } from './Kyc.controller';
import { KycService } from './Kyc.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Kyc, KycSchema } from "./schemas/kyc.schema";
import { UserModule } from 'src/user/user.module';
import { ApiService } from './provider.service';


@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature(
      [
        { name:  Kyc.name, schema: KycSchema}
      ]
    ),
      
  ],
  controllers: [KycController],
  providers: [KycService, ApiService]
})
export class KycModule {}
