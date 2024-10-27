import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services/database';

export interface TransactionAttributes {
  id: string;
  shop_id: string;
  type: 'sale' | 'expense' | 'payment';
  amount: number;
  related_document_id: string;
  documentType: 'Sales' | 'Expense' | 'Payment';
  description: string | null;
  transaction_date: Date;
}

class Transaction extends Model<TransactionAttributes> implements TransactionAttributes {
  public id!: string;
  public shop_id!: string;
  public type!: 'sale' | 'expense' | 'payment';
  public amount!: number;
  public related_document_id!: string;
  public documentType!: 'Sales' | 'Expense' | 'Payment';
  public description!: string | null;
  public transaction_date!: Date;
}

Transaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    shop_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('sale', 'expense', 'payment'),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    related_document_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    documentType: {
      type: DataTypes.ENUM('Sales', 'Expense', 'Payment'),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    transaction_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Transaction',
    timestamps: true,
  }
);

export default Transaction;
