import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type KycDocument = HydratedDocument<Kyc>;

@Schema({ timestamps: true })
export class Kyc{

    @Prop({ required: true })
    type: string;

    @Prop({ type: mongoose.Schema.Types.Mixed })
    data: any
}
export const KycSchema = SchemaFactory.createForClass(Kyc)