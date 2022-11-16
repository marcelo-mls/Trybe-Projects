export interface IProduct {
  id?: number;
  name: string;
  amount: string;
  orderId?: number;
}

export interface INewUser {
  username: string;
  classe: string;
  level: number;
  password?: string;
}

export interface IUser extends INewUser {
  id: number;
}

export interface IOrder {
  id: number;
  userId: number;
  productsId: number[];
}
