import { CurrencyCode } from './utils/currency';

export interface Product {
  id: string;
  name: string;
  category: 'Skincare' | 'Makeup' | 'Body Care' | 'Hair Care' | 'Fragrance';
  subcategory?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  secondaryImages?: string[];
  description: string;
  benefits?: string[];
  ingredients?: string;
  volume?: string;
  badge?: 'Bestseller' | 'New' | 'Sale' | 'Trending';
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  image: string;
  itemCount: number;
  description: string;
}

export interface OrderDetails {
  customerName: string;
  phone: string;
  address: string;
  city: string;
  country?: string;
  notes?: string;
  paymentMethod: string;
  currency?: CurrencyCode;
  paymentReference?: string;
  receiptName?: string;
}
