import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services/database';

export interface CategoryAttributes {
  id: string;
  name: string;
  description: string | null;
}

class Category extends Model<CategoryAttributes> implements CategoryAttributes {
  public id!: string;
  public name!: string;
  public description!: string | null;
}

Category.init(
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
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Category',
    timestamps: true,
  }
);

export default Category;
