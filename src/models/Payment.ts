import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services/database';

export interface PaymentAttributes {
  id: string;
  invoice_id: string;
  amount: number;
  payment_method: 'credit_card' | 'cash' | 'bank_transfer';
  payment_date: Date;
}

class Payment extends Model<PaymentAttributes> implements PaymentAttributes {
  public id!: string;
  public invoice_id!: string;
  public amount!: number;
  public payment_method!: 'credit_card' | 'cash' | 'bank_transfer';
  public payment_date!: Date;
}

Payment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    invoice_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.ENUM('credit_card', 'cash', 'bank_transfer'),
      allowNull: false,
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Payment',
    timestamps: true,
  }
);

export default Payment;
