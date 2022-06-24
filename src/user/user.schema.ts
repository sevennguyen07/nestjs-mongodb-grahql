import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';
import { IsEmail, IsMobilePhone, IsOptional, IsNotEmpty, IsIn, Min} from 'class-validator';

export type Gender = "male" | "female" | "other";
export type UserDocument = User & Document;
@Schema()
@ObjectType()
export class User {
    @Field(() => ID) // <-- GraphQL type
    _id: string; // <-- TypeScript type

    @Prop({ required: true})
    @Field()
    full_name: string;

    @Prop({ required: true})
    @Field()
    phone: string;

    @Prop()
    @Field({ nullable: true })
    email?: string;

    @Prop()
    @Field({ nullable: true })
    age?: number;

    @Prop()
    @Field({ nullable: true })
    gender?: Gender;
}

export const UserSchema = SchemaFactory.createForClass(User);

@InputType()
export class CreateUserInput{
    @Field()
    @IsNotEmpty()
    full_name: string;

    @Field()
    @IsMobilePhone('vi-VN')
    phone: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsEmail()
    email?: string;

    @Field({ nullable: true })
    @Min(15)
    @IsOptional()
    age?: number;

    @Field({ nullable: true })
    @IsIn(['male', 'female', 'other'])
    @IsOptional()
    gender?: Gender;
}

@InputType()
export class UpdateUserInput{
    @Field({ nullable: true })
    @IsNotEmpty()
    @IsOptional()
    full_name?: string;

    @Field({ nullable: true })
    @IsMobilePhone('vi-VN')
    @IsOptional()
    phone?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsEmail()
    email?: string;

    @Field({ nullable: true })
    @Min(15)
    @IsOptional()
    age?: number;

    @Field({ nullable: true })
    @IsIn(['male', 'female', 'other'])
    @IsOptional()
    gender?: Gender;
}