export interface IUser {
  _id: string;
  email: string;
  phone: string;
  password: string;
  name: string;
  role: "customer" | "provider";
  isActive: boolean;
  address?: string;
  cuisineSpecialties?: string[];
  iat: number;
  exp: number;
}
