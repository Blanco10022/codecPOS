import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services/database';

export interface CustomerAttributes {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  location_id: string;
  shop_id: string;
}

class Customer extends Model<CustomerAttributes> implements CustomerAttributes {
  public id!: string;
  public first_name!: string;
  public last_name!: string;
  public phone_number!: string;
  public location_id!: string;
  public shop_id!: string;
}

Customer.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    location_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    shop_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Customer',
    timestamps: true,
  }
);

export default Customer;
