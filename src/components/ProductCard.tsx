
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/contexts/ProductContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <div className="relative overflow-hidden aspect-square bg-gray-100">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {!product.inStock && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
              Out of stock
            </div>
          )}
          {product.featured && (
            <div className="absolute top-2 left-2 bg-pharma-secondary text-white text-xs font-medium px-2 py-1 rounded">
              Featured
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-900 line-clamp-2">{product.name}</h3>
          </div>
          
          <div className="mt-1 flex items-center">
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-gray-500 text-sm ml-2">({product.reviews} reviews)</span>
          </div>
          
          <div className="mt-2 flex items-center justify-between">
            <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          </div>
          
          <div className="mt-3">
            <Button
              className="w-full bg-pharma-primary hover:bg-pharma-dark"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
