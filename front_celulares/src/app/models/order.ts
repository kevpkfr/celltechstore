
export interface Order {
  id?: string;
  userId: string;
  userName?: string;
  adress: string;
  date: string;
  products: OrderProduct[];
}

export interface OrderProduct {
  id: string;
  quantity: number;
}
