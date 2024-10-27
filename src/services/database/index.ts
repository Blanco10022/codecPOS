import { Sequelize, DataTypes, Model } from 'sequelize';
import path from 'path';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(process.env.APPDATA || process.env.HOME || '', '.salesbox', 'database.sqlite')
});

export interface StorageAttributes {
  key: string;
  value: string;
}

export class Storage extends Model<StorageAttributes> implements StorageAttributes {
  public key!: string;
  public value!: string;
}

Storage.init(
  {
    key: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    value: DataTypes.TEXT,
  },
  {
    sequelize,
    modelName: 'Storage',
  }
);

export { sequelize };