import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services/database';

export interface ProductAttributes {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  description: string | null;
  category_id: string | null;
  shop_id: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  reorderLevel: number;
  unitType: string;
  purchasePrice: number;
  image: string | null;
}

class Product extends Model<ProductAttributes> implements ProductAttributes {
  public id!: string;
  public name!: string;
  public sku!: string;
  public price!: number;
  public quantity!: number;
  public description!: string | null;
  public category_id!: string | null;
  public shop_id!: string;
  public status!: 'in_stock' | 'low_stock' | 'out_of_stock';
  public reorderLevel!: number;
  public unitType!: string;
  public purchasePrice!: number;
  public image!: string | null;
}

Product.init(
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
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    shop_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('in_stock', 'low_stock', 'out_of_stock'),
      defaultValue: 'in_stock',
    },
    reorderLevel: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
    },
    unitType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    purchasePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Product',
    timestamps: true,
  }
);

export default Product;
