export interface Employee {
  id: string;  
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  hireDate: Date;
  status: 'active' | 'inactive' | 'terminated';
  description?: string;
  shop?: string;
  country?: string;
  address?: string;
  dateOfBirth?: Date; // Changed to Date only
  password?: string;
}
