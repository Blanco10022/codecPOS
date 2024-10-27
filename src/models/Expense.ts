import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services/database';

export interface ExpenseAttributes {
  id: string;
  shop_id: string;
  description: string;
  amount: number;
  expense_date: Date;
}

class Expense extends Model<ExpenseAttributes> implements ExpenseAttributes {
  public id!: string;
  public shop_id!: string;
  public description!: string;
  public amount!: number;
  public expense_date!: Date;
}

Expense.init(
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    expense_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Expense',
    timestamps: true,
  }
);

export default Expense;
