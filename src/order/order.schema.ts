import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { IsPositive } from 'class-validator';

import { User } from '../user/user.schema';

export type OrderDocument = Order & Document;
@Schema()
@ObjectType()
export class Order {
    @Field(() => ID) // <-- GraphQL type
    _id: string; // <-- TypeScript type

    @Prop({ 
        required: true,
        unique: true
    })
    @Field()
    code: string;

    @Prop({ required: true})
    @Field()
    amount: number;

    @Prop({ required: true})
    @Field()
    interest_rate: number;

    @Prop({ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: User.name,
        required: true
    })
    @Field(() => User)
    user: User | string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.index({ user: 1 });

@InputType()
export class CreateOrderInput{
    @Field()
    user: string;

    @Field()
    @IsPositive()
    amount: number;

    @Field()
    @IsPositive()
    interest_rate: number;
}