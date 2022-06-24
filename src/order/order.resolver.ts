import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { UserService } from '../user/user.service';
import { Order, CreateOrderInput } from './order.schema';
import { User } from '../user/user.schema';
@Resolver(() => Order)
export class OrderResolver {
    constructor(
        private readonly orderService: OrderService,
        private readonly userService: UserService
    ) {}

    /**
     * Query all orders
     * 
     * @returns the a list of orders
     */
    @Query(() => [Order])
    async orders(){
        return this.orderService.findAll();
    }

    /**
     * Query order by id
     * 
     * @param _id - The id of the order
     * @returns An order
     */
    @Query(() => Order)
    async order(@Args('_id') _id: string){
        return this.orderService.findById(_id);
    }
    
    /**
     * Query list of orders by user
     * 
     * @param user_id - The id of user
     * @returns The list of orders created by this user
     */
    @Query(() => [Order])
    async orderByUser(@Args('user') userId: string){
        return this.orderService.findByUserId(userId);
    }

    /**
     * Create new order
     * 
     * @param input - the CreateOrderInput object
     * @returns The new created order
     */
    @Mutation(() => Order)
    async createOrder(@Args('input') input: CreateOrderInput){
        return this.orderService.create(input);
    }
    
    /**
     * Resolve user field of order
     * 
     * @returns The user of the order
     */
    @ResolveField(() => User)
    async user(@Parent() order: Order) {
        return this.userService.findById(order.user);
    }

    /**
     * Resolve accrued_amount field of order
     * 
     * @returns an accrued amount that includes principal plus interest each month
     */
    @ResolveField(() => [Number])
    async accrued_amount(@Parent() order: Order) {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => {
            const interest = month * (order.interest_rate * order.amount) / 12;
            return Math.ceil((interest + order.amount));
        });
    }
}
