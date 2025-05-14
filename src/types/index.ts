
export interface Item {
  id: string;
  name: string;
  category: string;
  quantity: number;
  purchasePrice: number;
  sellingPrice: number;
  description?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  createdAt: Date;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  totalCost: number;
  profit: number;
  date: Date;
  tags?: string[];
}

export interface OrderItem {
  itemId: string;
  itemName: string;
  quantity: number;
  purchasePrice: number;
  sellingPrice: number;
  totalPrice: number;
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalInvestment: number;
  totalProfit: number;
}

export interface BusinessProfile {
  name: string;
  gst?: string;
  currency: string;
}

export interface ChartData {
  name: string;
  revenue: number;
  profit: number;
}
