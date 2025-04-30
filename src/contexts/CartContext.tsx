
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';

// Define cart item type
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// Define context type
interface CartContextType {
  items: CartItem[];
  addToCart: (product: any, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { user } = useAuth();

  // Calculate total cart value
  const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calculate total cart items
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  // Load cart from localStorage when user changes
  useEffect(() => {
    if (user) {
      const cartKey = `pharmaCart_${user.id}`;
      const storedCart = localStorage.getItem(cartKey);
      if (storedCart) {
        try {
          setItems(JSON.parse(storedCart));
        } catch (error) {
          console.error('Failed to parse cart data from localStorage:', error);
          localStorage.removeItem(cartKey);
          setItems([]);
        }
      } else {
        setItems([]);
      }
    } else {
      // Anonymous cart
      const anonymousCart = localStorage.getItem('pharmaCart_anonymous');
      if (anonymousCart) {
        try {
          setItems(JSON.parse(anonymousCart));
        } catch (error) {
          console.error('Failed to parse anonymous cart data:', error);
          localStorage.removeItem('pharmaCart_anonymous');
          setItems([]);
        }
      } else {
        setItems([]);
      }
    }
  }, [user]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    const cartKey = user ? `pharmaCart_${user.id}` : 'pharmaCart_anonymous';
    localStorage.setItem(cartKey, JSON.stringify(items));
  }, [items, user]);

  // Add item to cart
  const addToCart = (product: any, quantity: number) => {
    setItems(currentItems => {
      // Check if item already exists in cart
      const existingItemIndex = currentItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return updatedItems;
      } else {
        // Add new item if it doesn't exist
        return [...currentItems, {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity
        }];
      }
    });
    
    toast.success(`${product.name} added to cart`);
  };

  // Remove item from cart
  const removeFromCart = (productId: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== productId));
    toast.success('Item removed from cart');
  };

  // Update item quantity
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setItems(currentItems => 
      currentItems.map(item => 
        item.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
  };

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
