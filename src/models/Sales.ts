import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services/database';

export interface SalesAttributes {
  id: string;
  product_id: string;
  quantity: number;
  total_price: number;
  status: 'completed' | 'pending' | 'cancelled';
}

class Sales extends Model<SalesAttributes> implements SalesAttributes {
  public id!: string;
  public product_id!: string;
  public quantity!: number;
  public total_price!: number;
  public status!: 'completed' | 'pending' | 'cancelled';
}

Sales.init(
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
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('completed', 'pending', 'cancelled'),
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    modelName: 'Sales',
    timestamps: true,
  }
);

export default Sales;
