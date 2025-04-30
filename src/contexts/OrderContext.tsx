
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';

// Define order types
export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  };
  paymentMethod: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

// Define context type
interface OrderContextType {
  orders: Order[];
  placeOrder: (shippingAddress: any, paymentMethod: string) => Promise<string | null>;
  getUserOrders: () => Order[];
  getOrderById: (orderId: string) => Order | undefined;
}

// Create the context
const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useAuth();
  const { items, clearCart, cartTotal } = useCart();
  
  // Load orders from localStorage
  useEffect(() => {
    const storedOrders = localStorage.getItem('pharmaOrders');
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (error) {
        console.error('Failed to parse orders data from localStorage:', error);
        localStorage.setItem('pharmaOrders', JSON.stringify([]));
        setOrders([]);
      }
    }
  }, []);

  // Place a new order
  const placeOrder = async (shippingAddress: any, paymentMethod: string): Promise<string | null> => {
    if (!user) {
      toast.error('You need to be logged in to place an order');
      return null;
    }
    
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return null;
    }
    
    // Calculate values
    const subtotal = cartTotal;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    
    // Create new order
    const newOrder: Order = {
      id: `ORDER-${Date.now()}`,
      userId: user.id,
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      subtotal,
      tax,
      total,
      shippingAddress,
      paymentMethod,
      status: 'processing',
      createdAt: new Date().toISOString()
    };
    
    // Update orders state and localStorage
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('pharmaOrders', JSON.stringify(updatedOrders));
    
    // Clear the cart after successful order
    clearCart();
    
    toast.success('Order placed successfully');
    return newOrder.id;
  };

  // Get orders for current user
  const getUserOrders = (): Order[] => {
    if (!user) return [];
    return orders.filter(order => order.userId === user.id)
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  // Get order by ID
  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  };

  const value = {
    orders,
    placeOrder,
    getUserOrders,
    getOrderById
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};
