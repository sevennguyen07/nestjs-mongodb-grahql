import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';

export type Gender = "male" | "female" | "other";
export type UserDocument = User & Document;
@Schema()
@ObjectType()
export class User {
    @Field(() => ID) // <-- GraphQL type
    _id: string; // <-- TypeScript type

    @Prop()
    @Field()
    full_name: string;

    @Prop()
    @Field()
    phone: string;

    @Prop()
    @Field()
    email: string;

    @Prop()
    @Field()
    age: number;

    @Prop()
    @Field()
    gender: Gender;
}

export const UserSchema = SchemaFactory.createForClass(User);

@InputType()
export class CreateUserInput{
    @Field()
    full_name: string;

    @Field()
    phone: string;

    @Field()
    email: string;

    @Field()
    age: number;

    @Field()
    gender: Gender;
}