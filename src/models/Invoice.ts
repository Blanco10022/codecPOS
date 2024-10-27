import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services/database';

export interface InvoiceAttributes {
  id: string;
  sale_id: string;
  amount: number;
  status: 'unpaid' | 'paid';
}

class Invoice extends Model<InvoiceAttributes> implements InvoiceAttributes {
  public id!: string;
  public sale_id!: string;
  public amount!: number;
  public status!: 'unpaid' | 'paid';
}

Invoice.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    sale_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('unpaid', 'paid'),
      defaultValue: 'unpaid',
    },
  },
  {
    sequelize,
    modelName: 'Invoice',
    timestamps: true,
  }
);

export default Invoice;
