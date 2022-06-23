import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, CreateUserInput } from './user.schema';
@Resolver()
export class UserResolver {

    constructor(private readonly userService: UserService) {}

    @Query(() => [User])
    async users(){
        return this.userService.findAll();
    }

    @Mutation(() => User)
    async user(@Args('_id') _id: string){
        return this.userService.findById(_id);
    }

    @Mutation(() => User)
    async createUser(@Args('input') input: CreateUserInput){
        return this.userService.create(input);
    }
    
    @Mutation(() => User)
    async updateUser(@Args('_id') _id: string, @Args('input') input: CreateUserInput){
        return this.userService.update(_id, input);
    }
    
}
