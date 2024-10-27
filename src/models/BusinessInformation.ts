import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services/database';

export interface BusinessInformationAttributes {
  id: string;
  fullBusinessName: string;
  businessType: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  numberOfEmployees: number;
  taxIdNumber: string;
  shopLogo: string | null;
  taxationDocuments: string | null;
  nationalIdCard: string | null;
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
  legalStructure: string;
  yearEstablished: number;
  industryCategory: string;
  annualRevenue: number | null;
  businessDescription: string;
}

class BusinessInformation extends Model<BusinessInformationAttributes> implements BusinessInformationAttributes {
  public id!: string;
  public fullBusinessName!: string;
  public businessType!: string;
  public address!: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  public numberOfEmployees!: number;
  public taxIdNumber!: string;
  public shopLogo!: string | null;
  public taxationDocuments!: string | null;
  public nationalIdCard!: string | null;
  public contactInfo!: {
    phone: string;
    email: string;
    website?: string;
  };
  public legalStructure!: string;
  public yearEstablished!: number;
  public industryCategory!: string;
  public annualRevenue!: number | null;
  public businessDescription!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BusinessInformation.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fullBusinessName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    businessType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    numberOfEmployees: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    taxIdNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shopLogo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    taxationDocuments: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nationalIdCard: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contactInfo: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    legalStructure: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    yearEstablished: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    industryCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    annualRevenue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    businessDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'BusinessInformation',
    timestamps: true,
  }
);

export default BusinessInformation;
