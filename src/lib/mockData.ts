
import { Item, Category, Order, ChartData, BusinessProfile } from '@/types';

export const mockCategories: Category[] = [
  { id: '1', name: 'Gifts', createdAt: new Date('2023-01-01') },
  { id: '2', name: 'Bags', createdAt: new Date('2023-01-02') },
  { id: '3', name: 'Accessories', createdAt: new Date('2023-01-03') },
  { id: '4', name: 'Electronics', createdAt: new Date('2023-01-04') },
  { id: '5', name: 'Clothing', createdAt: new Date('2023-01-05') },
];

export const mockItems: Item[] = [
  {
    id: '1',
    name: 'Leather Tote Bag',
    category: 'Bags',
    quantity: 25,
    purchasePrice: 45,
    sellingPrice: 89.99,
    description: 'Premium handcrafted leather tote bag',
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2023-01-10'),
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    category: 'Electronics',
    quantity: 12,
    purchasePrice: 85,
    sellingPrice: 149.99,
    description: 'Noise-cancelling wireless headphones',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15'),
  },
  {
    id: '3',
    name: 'Scented Candle Set',
    category: 'Gifts',
    quantity: 30,
    purchasePrice: 12,
    sellingPrice: 29.99,
    description: 'Set of 3 premium scented candles',
    createdAt: new Date('2023-01-20'),
    updatedAt: new Date('2023-01-20'),
  },
  {
    id: '4',
    name: 'Silver Bracelet',
    category: 'Accessories',
    quantity: 8,
    purchasePrice: 25,
    sellingPrice: 59.99,
    description: 'Sterling silver bracelet with charm',
    createdAt: new Date('2023-01-25'),
    updatedAt: new Date('2023-01-25'),
  },
  {
    id: '5',
    name: 'Cotton T-Shirt',
    category: 'Clothing',
    quantity: 45,
    purchasePrice: 8,
    sellingPrice: 24.99,
    description: 'Premium cotton t-shirt, various colors',
    createdAt: new Date('2023-01-30'),
    updatedAt: new Date('2023-01-30'),
  },
  {
    id: '6',
    name: 'Smart Watch',
    category: 'Electronics',
    quantity: 5,
    purchasePrice: 120,
    sellingPrice: 249.99,
    description: 'Smart watch with fitness tracking',
    createdAt: new Date('2023-02-05'),
    updatedAt: new Date('2023-02-05'),
  },
  {
    id: '7',
    name: 'Laptop Sleeve',
    category: 'Bags',
    quantity: 18,
    purchasePrice: 15,
    sellingPrice: 34.99,
    description: 'Padded laptop sleeve for 15" laptops',
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-02-10'),
  },
  {
    id: '8',
    name: 'Skincare Gift Box',
    category: 'Gifts',
    quantity: 10,
    purchasePrice: 40,
    sellingPrice: 89.99,
    description: 'Premium skincare products gift box',
    createdAt: new Date('2023-02-15'),
    updatedAt: new Date('2023-02-15'),
  },
];

export const mockOrders: Order[] = [
  {
    id: '1',
    items: [
      {
        itemId: '1',
        itemName: 'Leather Tote Bag',
        quantity: 2,
        purchasePrice: 45,
        sellingPrice: 89.99,
        totalPrice: 179.98,
      },
    ],
    totalAmount: 179.98,
    totalCost: 90,
    profit: 89.98,
    date: new Date('2023-03-15'),
    tags: ['walk-in'],
  },
  {
    id: '2',
    items: [
      {
        itemId: '2',
        itemName: 'Wireless Headphones',
        quantity: 1,
        purchasePrice: 85,
        sellingPrice: 149.99,
        totalPrice: 149.99,
      },
      {
        itemId: '3',
        itemName: 'Scented Candle Set',
        quantity: 1,
        purchasePrice: 12,
        sellingPrice: 29.99,
        totalPrice: 29.99,
      },
    ],
    totalAmount: 179.98,
    totalCost: 97,
    profit: 82.98,
    date: new Date('2023-03-18'),
    tags: ['online'],
  },
  {
    id: '3',
    items: [
      {
        itemId: '4',
        itemName: 'Silver Bracelet',
        quantity: 3,
        purchasePrice: 25,
        sellingPrice: 59.99,
        totalPrice: 179.97,
      },
    ],
    totalAmount: 179.97,
    totalCost: 75,
    profit: 104.97,
    date: new Date('2023-03-22'),
    tags: ['walk-in'],
  },
  {
    id: '4',
    items: [
      {
        itemId: '5',
        itemName: 'Cotton T-Shirt',
        quantity: 5,
        purchasePrice: 8,
        sellingPrice: 24.99,
        totalPrice: 124.95,
      },
    ],
    totalAmount: 124.95,
    totalCost: 40,
    profit: 84.95,
    date: new Date('2023-04-05'),
    tags: ['online'],
  },
  {
    id: '5',
    items: [
      {
        itemId: '6',
        itemName: 'Smart Watch',
        quantity: 1,
        purchasePrice: 120,
        sellingPrice: 249.99,
        totalPrice: 249.99,
      },
    ],
    totalAmount: 249.99,
    totalCost: 120,
    profit: 129.99,
    date: new Date('2023-04-10'),
    tags: ['walk-in'],
  },
];

export const mockMonthlyData: ChartData[] = [
  { name: 'Jan', revenue: 1200, profit: 450 },
  { name: 'Feb', revenue: 1900, profit: 650 },
  { name: 'Mar', revenue: 2800, profit: 1200 },
  { name: 'Apr', revenue: 3500, profit: 1500 },
  { name: 'May', revenue: 2500, profit: 1000 },
  { name: 'Jun', revenue: 3200, profit: 1350 },
  { name: 'Jul', revenue: 4100, profit: 1800 },
  { name: 'Aug', revenue: 3800, profit: 1650 },
  { name: 'Sep', revenue: 3000, profit: 1300 },
  { name: 'Oct', revenue: 2700, profit: 1100 },
  { name: 'Nov', revenue: 3900, profit: 1700 },
  { name: 'Dec', revenue: 4500, profit: 2000 },
];

export const mockBusinessProfile: BusinessProfile = {
  name: 'My Inventory Store',
  gst: 'GST123456789',
  currency: 'USD',
};

export const calculateDashboardStats = () => {
  const totalOrders = mockOrders.length;
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalInvestment = mockOrders.reduce((sum, order) => sum + order.totalCost, 0);
  const totalProfit = mockOrders.reduce((sum, order) => sum + order.profit, 0);

  return {
    totalOrders,
    totalRevenue,
    totalInvestment,
    totalProfit,
  };
};

export const getLowStockItems = () => {
  return mockItems.filter(item => item.quantity < 10);
};
