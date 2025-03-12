import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Kyc } from './schemas/kyc.schema';
import { BvnDto } from './Dtos/bvn.dto';
import { UserService } from 'src/user/user.service';
import { ApiService } from './provider.service';



@Injectable()
export class KycService {
    constructor(
        @InjectModel(Kyc.name)
        private readonly kycModel: Model<Kyc>,
        private readonly userService: UserService,
        private readonly apiService: ApiService

        ){}
    async bvnAdvanced( req, res, id: string, bvnDto: BvnDto){
        let bvn = "bvn";
        
        const response = await this.findExisting(req, res, bvnDto.bvn_number, bvn);
        if(response){
            let transaction_response = await this.userService.createTransaction(bvnDto.business_id);
            if(transaction_response){
                return res.status(200).json({
                    message: "Your kyc has been retrieved",
                    data: response
                })
            }
            
        }       
        const dojah_response = await this.apiService.fetchBVNData(bvnDto.bvn_number);
            if(dojah_response){
                let transaction_response = await this.userService.createTransaction(id);
        if(transaction_response){
            return transaction_response;
        }
              
                let response = await this.saveKyc(id, bvn, dojah_response, bvnDto.bvn_number);
                if(response){
                    
                    return res.status(200).json({
                        message: "Your Kyc has been saved",
                        data: response
                    })
                }
                return res.status(400).json({
                    message: "Your Kyc is not saved try again later"
                })
            }
            // return res.status(500).json({
            //     message: "error"
            // })
        

    }

    async saveKyc(id, type, data, bvn){
        return await this.kycModel.create({
            business_id: id,
            type: type,
            data: data,
            kyc_id: bvn
        })
    }
    generateKycId(){
        let randomNumber = Math.floor(Math.random() * 15) * 3;
        return randomNumber;
    }
   private async findExisting(req, res, bvnId: string, type: string){
        let response = await this.kycModel.findOne({
            kyc_id: bvnId,
            type: type
        })
        return response;
    }
}
