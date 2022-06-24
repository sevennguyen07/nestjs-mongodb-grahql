import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as generatorString from 'randomstring';
import { Order, OrderDocument, CreateOrderInput } from './order.schema';
@Injectable()
export class OrderService {
    constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>){}

    /**
     * Generate new order code
     * 
     * @returns The unique order code
     */
    async generateOrderCode(): Promise<string> {
        while(true){
            const randomOrderCode = generatorString.generate({
                length: 5,
                charset: 'numeric'
            });

            const checkOrderCodeExists = await this.orderModel.countDocuments({code: randomOrderCode});
            if(!checkOrderCodeExists)
                return randomOrderCode;
        }
    }
    
    /**
     * Get all orders
     * 
     * @returns The list of orders
     */
    async findAll(): Promise<Order[]>{
        return this.orderModel.find().lean();
    }

    /**
     * Get order by id
     * 
     * @param _id - The id of order
     * @returns The order
     */
    async findById(_id: string): Promise<Order>{
        const order = await this.orderModel.findById(_id).lean();
        if(!order){
            throw new NotFoundException('Order not found.');
        }

        return order;
    }

    /**
     * Get orders by user
     * 
     * @param userId - The id of user
     * @returns The list of orders was created by this user
     */
    async findByUserId(userId: string): Promise<Order[]> {
        return this.orderModel.find({ user: userId }).lean();
    }

    /**
     * Create new order
     * 
     * @param input - The CreateOrderInput object 
     * @returns Thew new created order
     */
    async create(input: CreateOrderInput): Promise<Order>{
        const newOrderCode = await this.generateOrderCode();
        const createdOrder = new this.orderModel({...input, code: newOrderCode});
        return createdOrder.save();
    }

    /**
     * Get total amount of user in orders
     * 
     * @param userId - The id of user
     * @returns The total amount of the user in orders
     */
    async totalAmountOfUser(userId: string): Promise<number> {
        const data = await this.orderModel.aggregate([
            { $match: { user: userId } },
            { $group: { _id: null, total: { $sum: "$amount" }}}
        ]);

        const { total = 0 } = data[0] || {}
        return total;
    }

    
}
