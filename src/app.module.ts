import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KycModule } from './bvn/Kyc.module';
import { MongooseModule } from "@nestjs/mongoose"
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://bellohadi:bellohadi@cluster0.4hiah.mongodb.net/bvn"),
    KycModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
