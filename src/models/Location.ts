import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services/database';

export interface LocationAttributes {
  address: string | null;
  city: string | null;
  region: string | null;
  country: {
    name: string;
    code: string;
  };
}

class Location extends Model<LocationAttributes> implements LocationAttributes {
  public address!: string | null;
  public city!: string | null;
  public region!: string | null;
  public country!: {
    name: string;
    code: string;
  };
}

Location.init(
  {
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Location',
  }
);

export default Location;
