export type Customer = {
  active: boolean;
  createdAt?: string;
  email?: string;
  fullName?: string;
  id: number;
  provider?: string;
  updatedAt?: string;
  username: string;
};

export type AuthResponse = {
  accessToken: string;
  customer: Customer;
  expiresIn: number;
  refreshToken: string;
  tokenType: string;
};

export type LoginPayload = {
  password: string;
  username: string;
};

export type RegisterPayload = {
  email?: string;
  fullName?: string;
  password: string;
  username: string;
};