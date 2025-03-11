import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
export type BvnDocument = HydratedDocument<User>

@Schema({ timestamps:true })
export class User{

    @Prop({ required: true })
    business_id: string;
    
    @Prop({ required: true })
    business_name: string;

    @Prop({ required: true })
    wallet: number
   
}
export const UserSchema = SchemaFactory.createForClass(User);