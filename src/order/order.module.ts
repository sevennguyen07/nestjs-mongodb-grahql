import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './order.schema';
import { User, UserSchema } from '../user/user.schema';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Order.name, schema: OrderSchema },
    { name: User.name, schema: UserSchema }
  ])],
  providers: [OrderResolver, OrderService, UserService]
})
export class OrderModule {}
