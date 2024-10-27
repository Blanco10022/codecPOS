import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services/database';
import Warehouse from './warehouse'; 

export interface InventoryAttributes {
  id: string;
  product_id: string;
  quantity: number;
  lastUpdated: Date;
  minimumStockLevel: number;
  maximumStockLevel: number | null;
  batchNumber: string | null;
  expirationDate: Date | null;
  notes: string | null;
  warehouse_id: string; // Warehouse location
}

class Inventory extends Model<InventoryAttributes> implements InventoryAttributes {
  public id!: string;
  public product_id!: string;
  public quantity!: number;
  public lastUpdated!: Date;
  public minimumStockLevel!: number;
  public maximumStockLevel!: number | null;
  public batchNumber!: string | null;
  public expirationDate!: Date | null;
  public notes!: string | null;
  public warehouse_id!: string; // Warehouse location
}

Inventory.init(
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
    lastUpdated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    minimumStockLevel: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    maximumStockLevel: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    batchNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    warehouse_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Warehouse, 
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Inventory',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['product_id', 'warehouse_id'], 
      },
    ],
  }
);

export default Inventory;
