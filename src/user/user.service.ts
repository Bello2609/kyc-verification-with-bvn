import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dtos/user.dto';
@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User> ){}
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
}
