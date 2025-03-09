import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Kyc } from './schemas/kyc.schema';

@Injectable()
export class KycService {
    constructor(@InjectModel(Kyc.name) private kycModel: Model<Kyc>){}
    
}
