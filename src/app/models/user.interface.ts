export interface User {
  email: string;
  favorites: string[];
}

export interface UserLoginResponse  extends User{
  token: string;
  id: string;
}