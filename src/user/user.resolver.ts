import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { OrderService } from '../order/order.service';
import { User, CreateUserInput, UpdateUserInput } from './user.schema';
@Resolver(() => User)
export class UserResolver {

    constructor(
        private readonly userService: UserService,
        private readonly orderService: OrderService
    ) {}

    /**
     * Query all users
     * 
     * @returns the a list of users
     */
    @Query(() => [User])
    async users(){
        return this.userService.findAll();
    }

    /**
     * Query user by id
     * 
     * @param _id - The id of the user
     * @returns An user
     */
    @Query(() => User)
    async user(@Args('_id') _id: string){
        return this.userService.findById(_id);
    }

    /**
     * Create new user
     * 
     * @param input - the CreateUserInput object
     * @returns The new created user
     */
    @Mutation(() => User)
    async createUser(@Args('input') input: CreateUserInput){
        return this.userService.create(input);
    }
    
    /**
     * Update new user
     * 
     * @param _id - The id of the user
     * @param input - the UpdateUserInput object
     * @returns The updated user
     */
    @Mutation(() => User)
    async updateUser(@Args('_id') _id: string, @Args('input') input: UpdateUserInput){
        return this.userService.update(_id, input);
    }

    /**
     * Resolve total_amount field of user
     * 
     * @returns The total amount of the user in orders
     */
    @ResolveField(() => Number)
    async total_amount(@Parent() user: User) {
        return this.orderService.totalAmountOfUser(user._id);
    }
    
}
