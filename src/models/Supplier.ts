import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services/database';

export interface SupplierAttributes {
  id: string;
  name: string;
  contactInfo: string | null;
  email: string;
  phone: string | null;
  address: string | null;
}

class Supplier extends Model<SupplierAttributes> implements SupplierAttributes {
  public id!: string;
  public name!: string;
  public contactInfo!: string | null;
  public email!: string;
  public phone!: string | null;
  public address!: string | null;
}

Supplier.init(
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
    contactInfo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Supplier',
    timestamps: true,
  }
);

export default Supplier;
