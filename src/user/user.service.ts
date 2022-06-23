import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, CreateUserInput } from './user.schema';
@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

    async findAll(): Promise<User[]>{
        return this.userModel.find().lean();
    }

    async findById(_id: string): Promise<User>{
        const user = await this.userModel.findById(_id).lean();
        if(!user){
            throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
        }

        return user;
    }

    async create(input: CreateUserInput): Promise<User>{
        const user = this.userModel.findOne({ email: input.email });
        if(user) {
            throw new HttpException('This email is already exists.', HttpStatus.BAD_GATEWAY);
        }
        const createdCat = new this.userModel(input);
        return createdCat.save();
    }

    async update(_id: string, input: CreateUserInput): Promise<User> {
        const { email } = input;
        if(email){
            const user = await this.userModel.findOne({ email }).lean();
            if(user && user._id.toString() !== _id) {
                throw new HttpException('This email is already exists.', HttpStatus.BAD_GATEWAY);
            }
        }

        return this.userModel.findByIdAndUpdate(_id, input, { returnDocument: 'after' });
    }
}
