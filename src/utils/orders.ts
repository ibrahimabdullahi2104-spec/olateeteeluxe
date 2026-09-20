export type OrderStatus = 'awaiting_payment' | 'payment_verified' | 'processing' | 'out_for_delivery' | 'delivered';

export interface SavedOrder {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  country?: string;
  items: Array<{
    name: string;
    quantity: number;
    priceFormatted: string;
  }>;
  totalFormatted: string;
  paymentMethod: string;
  paymentReference?: string;
  status: OrderStatus;
  createdAt: string;
  isDemo?: boolean;
}

const ORDERS_STORAGE_KEY = 'olateetee_saved_orders';

export function getSavedOrders(): SavedOrder[] {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read saved orders', e);
    return [];
  }
}

export function saveOrder(order: SavedOrder): void {
  try {
    const current = getSavedOrders();
    // Prepend new order
    const updated = [order, ...current.filter((o) => o.orderId !== order.orderId)];
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save order', e);
  }
}

export function findSavedOrder(query: string): SavedOrder | null {
  const cleanQuery = query.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!cleanQuery) return null;

  const orders = getSavedOrders();
  
  // Try exact match on orderId
  const matchById = orders.find(
    (o) => o.orderId.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanQuery
  );
  if (matchById) return matchById;

  // Try phone number matching (last 7+ digits)
  const matchByPhone = orders.find((o) => {
    const cleanPhone = o.phone.replace(/[^0-9]/g, '');
    return cleanPhone && (cleanPhone.includes(cleanQuery) || cleanQuery.includes(cleanPhone));
  });
  if (matchByPhone) return matchByPhone;

  return null;
}
