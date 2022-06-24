import { Model } from 'mongoose';
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, CreateUserInput, UpdateUserInput } from './user.schema';
@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

    /**
     * Get all users
     * 
     * @returns All users
     */
    async findAll(): Promise<User[]>{
        return this.userModel.find().lean();
    }

    /**
     * Get user by _id
     * 
     * @param _id - The id of user
     * @returns The user
     */
    async findById(_id: User | string): Promise<User>{
        const user = await this.userModel.findById(_id).lean();
        if(!user){
            throw new NotFoundException('User not found.');
        }

        return user;
    }

    /**
     * Create new user
     * @param input - The CreateUserInput object
     * @returns The new created user 
     */
    async create(input: CreateUserInput): Promise<User>{
        const { email } = input;
        
        if(email){
            const user = await this.userModel.findOne({ email }).lean();
            if(user) {
                throw new UnprocessableEntityException('User email already exists.');
            }
        }

        const createdUser = new this.userModel(input);
        return createdUser.save();
    }

    /**
     * Update user
     * 
     * @param _id - The id of user 
     * @param input - The UpdateUserInput object
     * @returns The updated user
     */
    async update(_id: string, input: UpdateUserInput): Promise<User> {
        const { email } = input;

        if(email){
            const user = await this.userModel.findOne({ email }).lean();
            if(user && user._id.toString() !== _id) {
                throw new UnprocessableEntityException('User email already exists.');
            }
        }

        return this.userModel.findByIdAndUpdate(_id, input, { returnDocument: 'after' });
    }
}
