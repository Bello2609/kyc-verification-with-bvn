import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dtos/user.dto';
interface Response {
    _id?: string,
    business_name?: string,
    wallet?: number
}
@Injectable()
export class UserService {
    constructor(@InjectModel(User.name)
        private readonly userModel: Model<User>
        ){}
    async postUser(req, res, createUserDto: CreateUserDto){
        const user =  await this.userModel.create(createUserDto)
        if(user){
            return res.status(200).json({
                message: "User created suceessfully",
                data: user
            })
        }
        return res.status(400).json({
            message: "error"
        })
    }
    async createTransaction(id:string): Promise<any | null>{
        let response  = await this.userModel.findOne({ business_id: id }).select("business_name wallet");
        if(!response){
            return "No user found"
        }
        if(response.wallet < 60){
            return "You dont have enough money in your wallet "
        }
        const balance = response.wallet - 60;
        response.wallet = balance;
        return await response.save(); 

    }
}
