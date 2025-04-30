
import React, { createContext, useContext, useEffect, useState } from 'react';

// Product interfaces
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
  featured?: boolean;
  rating?: number;
  reviews?: number;
}

// Define context type
interface ProductContextType {
  products: Product[];
  categories: string[];
  featuredProducts: Product[];
  getProduct: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  searchProducts: (query: string) => Product[];
  isLoading: boolean;
}

// Create the context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

// Sample product data
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Vitamin C Complex",
    description: "Boost your immune system with our high-quality Vitamin C supplement. Contains 1000mg of Vitamin C with added bioflavonoids for better absorption.",
    price: 15.99,
    category: "Vitamins & Supplements",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: 127
  },
  {
    id: "2",
    name: "Digital Thermometer",
    description: "Fast reading digital thermometer with LCD display. Accurate temperature readings in 10 seconds or less.",
    price: 12.50,
    category: "Medical Devices",
    image: "https://images.unsplash.com/photo-1584017141776-57d033969071?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    inStock: true,
    featured: false,
    rating: 4.5,
    reviews: 89
  },
  {
    id: "3",
    name: "Pain Relief Tablets",
    description: "Fast-acting pain relief for headaches, muscle pain, and fever. Each tablet contains 500mg of paracetamol.",
    price: 8.99,
    category: "Pain Relief",
    image: "https://images.unsplash.com/photo-1584308666999-b85ba069e341?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    inStock: true,
    featured: true,
    rating: 4.7,
    reviews: 215
  },
  {
    id: "4",
    name: "First Aid Kit",
    description: "Comprehensive first aid kit containing bandages, antiseptic wipes, scissors, and more. Essential for every home.",
    price: 24.95,
    category: "First Aid",
    image: "https://images.unsplash.com/photo-1583947581924-860bda5c8345?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    inStock: true,
    featured: false,
    rating: 4.9,
    reviews: 56
  },
  {
    id: "5",
    name: "Hand Sanitizer",
    description: "Kills 99.9% of germs without water. Alcohol-based formula with moisturizer to prevent dry skin.",
    price: 4.50,
    category: "Personal Care",
    image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    inStock: true,
    featured: true,
    rating: 4.6,
    reviews: 178
  },
  {
    id: "6",
    name: "Omega-3 Fish Oil",
    description: "High-strength omega-3 fatty acids from sustainable fish sources. Supports heart and brain health.",
    price: 19.99,
    category: "Vitamins & Supplements",
    image: "https://images.unsplash.com/photo-1577425714426-5d9e4175fff3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    inStock: true,
    featured: false,
    rating: 4.7,
    reviews: 93
  },
  {
    id: "7",
    name: "Blood Pressure Monitor",
    description: "Automatic digital blood pressure monitor for home use. Stores up to 90 readings with date and time.",
    price: 39.95,
    category: "Medical Devices",
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    inStock: false,
    featured: false,
    rating: 4.4,
    reviews: 67
  },
  {
    id: "8",
    name: "Allergy Relief Spray",
    description: "Fast-acting nasal spray for allergy symptom relief. Provides 24-hour relief from pollen, dust, and pet allergies.",
    price: 14.25,
    category: "Allergies",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    inStock: true,
    featured: true,
    rating: 4.3,
    reviews: 42
  },
  {
    id: "9",
    name: "Multivitamin Complex",
    description: "Complete daily multivitamin with 23 essential vitamins and minerals. Supports overall health and wellbeing.",
    price: 16.75,
    category: "Vitamins & Supplements",
    image: "https://images.unsplash.com/photo-1586611292717-f828b167408c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    inStock: true,
    featured: false,
    rating: 4.8,
    reviews: 152
  },
  {
    id: "10",
    name: "Antibacterial Soap",
    description: "Gentle, antibacterial hand soap that kills germs while moisturizing the skin. Pleasant lavender scent.",
    price: 3.99,
    category: "Personal Care",
    image: "https://images.unsplash.com/photo-1584473457493-83a4d7351773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    inStock: true,
    featured: false,
    rating: 4.5,
    reviews: 79
  },
  {
    id: "11",
    name: "Digital Pulse Oximeter",
    description: "Measures blood oxygen saturation levels and pulse rate. Easy to read LED display with one-button operation.",
    price: 29.99,
    category: "Medical Devices",
    image: "https://images.unsplash.com/photo-1584473454583-5b7c71ce7217?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    inStock: true,
    featured: true,
    rating: 4.7,
    reviews: 108
  },
  {
    id: "12",
    name: "Sunscreen SPF 50",
    description: "Broad-spectrum protection against UVA and UVB rays. Water-resistant and non-greasy formula.",
    price: 13.49,
    category: "Personal Care",
    image: "https://images.unsplash.com/photo-1560806102-8b104b87c3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    inStock: true,
    featured: false,
    rating: 4.6,
    reviews: 91
  }
];

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeProducts = async () => {
      setIsLoading(true);
      
      // Check if products exist in localStorage
      const storedProducts = localStorage.getItem('pharmaProducts');
      
      if (storedProducts) {
        try {
          setProducts(JSON.parse(storedProducts));
        } catch (error) {
          console.error('Failed to parse product data from localStorage:', error);
          // Fall back to sample data
          setProducts(sampleProducts);
          localStorage.setItem('pharmaProducts', JSON.stringify(sampleProducts));
        }
      } else {
        // Initialize with sample data
        setProducts(sampleProducts);
        localStorage.setItem('pharmaProducts', JSON.stringify(sampleProducts));
      }
      
      setIsLoading(false);
    };
    
    initializeProducts();
  }, []);

  // Get unique categories
  const categories = Array.from(new Set(products.map(product => product.category)));
  
  // Get featured products
  const featuredProducts = products.filter(product => product.featured);
  
  // Get a single product by ID
  const getProduct = (id: string) => products.find(product => product.id === id);
  
  // Get products by category
  const getProductsByCategory = (category: string) => 
    category === 'All' 
      ? products 
      : products.filter(product => product.category === category);
  
  // Search products
  const searchProducts = (query: string) => {
    const normalizedQuery = query.toLowerCase().trim();
    
    if (!normalizedQuery) {
      return products;
    }
    
    // Save search term to recent searches
    const recentSearches = JSON.parse(localStorage.getItem('pharmaRecentSearches') || '[]');
    if (!recentSearches.includes(normalizedQuery)) {
      const updatedSearches = [normalizedQuery, ...recentSearches.slice(0, 9)];
      localStorage.setItem('pharmaRecentSearches', JSON.stringify(updatedSearches));
    }
    
    return products.filter(product => 
      product.name.toLowerCase().includes(normalizedQuery) || 
      product.description.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery)
    );
  };

  const value = {
    products,
    categories,
    featuredProducts,
    getProduct,
    getProductsByCategory,
    searchProducts,
    isLoading
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
