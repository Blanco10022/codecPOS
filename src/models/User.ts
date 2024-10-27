import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services/database';
import { LocationAttributes } from './Location';

export interface UserAttributes {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  is_staff: boolean;
  role: 'shop owner' | 'manager' | 'seller';
  profile_image: string | null;
  phone_number: string | null;
  location: LocationAttributes;
  status: 'active' | 'inactive';
  last_login: Date | null;
  created_at: Date;
  updated_at: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public username!: string;
  public email!: string;
  public password_hash!: string;
  public is_staff!: boolean;
  public role!: 'shop owner' | 'manager' | 'seller';
  public profile_image!: string | null;
  public phone_number!: string | null;
  public location!: LocationAttributes;
  public status!: 'active' | 'inactive';
  public last_login!: Date | null;
  public created_at!: Date;
  public updated_at!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_staff: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.ENUM('shop owner', 'manager', 'seller'),
      allowNull: false,
    },
    profile_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeSave: (user: User) => {
        user.updated_at = new Date();
      },
    },
  }
);

export default User;
