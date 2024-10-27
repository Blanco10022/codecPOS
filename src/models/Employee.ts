import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services/database';

export interface EmployeeAttributes {
  id: string;
  user_id: string;
  shop_id: string;
  national_id: string;
  date_of_birth: Date;
  hire_date: Date;
  employment_status: 'full-time' | 'part-time' | 'contract' | 'intern';
  emergency_contact: {
    name: string;
    relationship: string;
    phone: string;
  };
  education: {
    degree: string;
    institution: string;
    graduation_year: number;
  };
  salary: number;
}

class Employee extends Model<EmployeeAttributes> implements EmployeeAttributes {
  public id!: string;
  public user_id!: string;
  public shop_id!: string;
  public national_id!: string;
  public date_of_birth!: Date;
  public hire_date!: Date;
  public employment_status!: 'full-time' | 'part-time' | 'contract' | 'intern';
  public emergency_contact!: {
    name: string;
    relationship: string;
    phone: string;
  };
  public education!: {
    degree: string;
    institution: string;
    graduation_year: number;
  };
  public salary!: number;
}

Employee.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    shop_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    national_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    hire_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    employment_status: {
      type: DataTypes.ENUM('full-time', 'part-time', 'contract', 'intern'),
      allowNull: false,
    },
    emergency_contact: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    education: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Employee',
    timestamps: true,
  }
);

export default Employee;
