import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services/database';
import BusinessInformation from './BusinessInformation';
import User from './User';

export interface ShopAttributes {
  id: string;
  name: string;
  description: string;
  businessId: string;  // Reference to the associated BusinessInformation
  ownerId: string;  // Reference to the User who owns this shop
  status: 'active' | 'inactive';
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  contactInfo: {
    phone: string;
    email: string;
  };
  operatingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}

class Shop extends Model<ShopAttributes> implements ShopAttributes {
  public id!: string;
  public name!: string;
  public description!: string;
  public businessId!: string;
  public ownerId!: string;
  public status!: 'active' | 'inactive';
  public location!: {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  public contactInfo!: {
    phone: string;
    email: string;
  };
  public operatingHours!: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Shop.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    businessId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: BusinessInformation,
        key: 'id',
      },
    },
    ownerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
    },
    location: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    contactInfo: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    operatingHours: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Shop',
    timestamps: true,
  }
);

// Define associations
Shop.belongsTo(BusinessInformation, { foreignKey: 'businessId', as: 'business' });
Shop.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

export default Shop;
