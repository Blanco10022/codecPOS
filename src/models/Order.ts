import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services/database';

export interface OrderAttributes {
  id: string;
  product_id: string;
  quantity: number;
  totalPrice: number;
  customer_id: string | null;
  paymentStatus: 'unpaid' | 'paid' | 'refunded';
  deliveryStatus: 'pending' | 'shipped' | 'delivered';
}

class Order extends Model<OrderAttributes> implements OrderAttributes {
  public id!: string;
  public product_id!: string;
  public quantity!: number;
  public totalPrice!: number;
  public customer_id!: string | null;
  public paymentStatus!: 'unpaid' | 'paid' | 'refunded';
  public deliveryStatus!: 'pending' | 'shipped' | 'delivered';
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    paymentStatus: {
      type: DataTypes.ENUM('unpaid', 'paid', 'refunded'),
      defaultValue: 'unpaid',
    },
    deliveryStatus: {
      type: DataTypes.ENUM('pending', 'shipped', 'delivered'),
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    modelName: 'Order',
    timestamps: true,
  }
);

export default Order;
