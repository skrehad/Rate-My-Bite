export interface IUser {
  id: string;
  fullName: string;
  email: string;
  photo?: string;
  password: string;
  role: "USER" | "ADMIN" | "PREMIUM";
  status: "ACTIVE" | "BLOCKED" | "DELETED";
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
