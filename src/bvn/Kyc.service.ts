import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Kyc } from './schemas/kyc.schema';
import { User } from 'src/user/schemas/user.schema';
import { BvnDto } from './Dtos/bvn.dto';
import { CreateKycDto } from './Dtos/kyc.dto';
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
        await this.userService.createTransaction(id);
        const response = await this.findExisting(req, res,  "4", bvn);
        if(response){
            return res.status(200).json({
                data: response
            })
        }       
        const dojah_response = await this.apiService.fetchBVNData(bvnDto.bvn_number);
            if(dojah_response){
                let response = await this.saveKyc("4", bvn, dojah_response);
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

    async saveKyc(id, type, data){
        return await this.kycModel.create({
            business_id: id,
            type: type,
            data: data
        })
    }

   private async findExisting(req, res, id: string, type: string){
        let response = await this.kycModel.findOne({
            business_id: id,
            type: type
        })
        // if(!response){
        //     return "response";
        // }
        return response
    }
}
