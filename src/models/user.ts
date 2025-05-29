export enum UserType {
  ADMIN = 'admin',
  OPERATOR = 'operator',
  CLIENT = 'client',
}

export interface User {
  user_id: string;
  user_first_name: string;
  user_last_name: string;
  email: string;
  password: string;
  user_type: UserType;
  company_name: string;
  api: boolean;
  created_at: string;
  updated_at: string;
  companiesAccess?: OperatorCompaniesAccess;
}

export interface AuthResponse {
  user: User;
  jwtToken: string;
  expires_date: string;
}

export interface OperatorCompaniesAccess {
  updated_at: string;
  companies: string[];
  user_id: string;
  created_at: string;
}
