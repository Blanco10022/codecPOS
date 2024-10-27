import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services/database';

export interface WarehouseAttributes {
  id: string;
  name: string;
  region: string;
}

class Warehouse extends Model<WarehouseAttributes> implements WarehouseAttributes {
  public id!: string;
  public name!: string;
  public region!: string;
}

Warehouse.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Warehouse',
    timestamps: true,
  }
);

export default Warehouse;

