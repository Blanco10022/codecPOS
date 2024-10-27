import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services/database';

export interface StockMovementAttributes {
  id: string;
  product_id: string;
  movementType: 'added' | 'sold' | 'returned' | 'adjustment';
  quantity: number;
  supplier_id: string | null;
  reason: string | null;
  performedBy_id: string;
}

class StockMovement extends Model<StockMovementAttributes> implements StockMovementAttributes {
  public id!: string;
  public product_id!: string;
  public movementType!: 'added' | 'sold' | 'returned' | 'adjustment';
  public quantity!: number;
  public supplier_id!: string | null;
  public reason!: string | null;
  public performedBy_id!: string;
}

StockMovement.init(
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
    movementType: {
      type: DataTypes.ENUM('added', 'sold', 'returned', 'adjustment'),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    supplier_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    performedBy_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'StockMovement',
    timestamps: true,
  }
);

export default StockMovement;
