
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/contexts/ProductContext';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getProduct, isLoading } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState<any | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  
  useEffect(() => {
    if (!isLoading && id) {
      const foundProduct = getProduct(id);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // Product not found, navigate to 404 or products page
        navigate('/products');
      }
    }
  }, [id, getProduct, isLoading, navigate]);
  
  const handleAddToCart = () => {
    if (product) {
      setIsAdding(true);
      // Simulate delay for better UX
      setTimeout(() => {
        addToCart(product, quantity);
        setIsAdding(false);
      }, 500);
    }
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (isLoading || !product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <Skeleton className="h-96 w-full rounded-lg" />
              </div>
              <div className="md:w-1/2">
                <Skeleton className="h-10 w-3/4 mb-4" />
                <Skeleton className="h-6 w-1/4 mb-6" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-3/4 mb-8" />
                <Skeleton className="h-12 w-full mb-4" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center mb-6">
            <Link 
              to="/products" 
              className="text-pharma-primary hover:underline flex items-center"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Products
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Image */}
            <div className="md:w-1/2">
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Product Info */}
            <div className="md:w-1/2">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center gap-1 mr-3">
                  <span className="text-yellow-500">★</span>
                  <span className="font-medium">{product.rating}</span>
                </div>
                <span className="text-gray-500">({product.reviews} reviews)</span>
                
                <span className="mx-3 text-gray-300">|</span>
                
                <span className={`${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              
              <div className="text-2xl font-bold mb-4 text-gray-900">
                ${product.price.toFixed(2)}
              </div>
              
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex">
                  <button 
                    onClick={decrementQuantity}
                    disabled={quantity <= 1 || !product.inStock}
                    className="px-3 py-2 border border-gray-300 bg-gray-100 text-gray-600 rounded-l-md hover:bg-gray-200 disabled:opacity-50"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    disabled={!product.inStock}
                    className="w-16 px-3 py-2 text-center border-y border-gray-300"
                  />
                  <button 
                    onClick={incrementQuantity}
                    disabled={!product.inStock}
                    className="px-3 py-2 border border-gray-300 bg-gray-100 text-gray-600 rounded-r-md hover:bg-gray-200 disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Add to Cart Button */}
              <Button
                className="w-full bg-pharma-primary hover:bg-pharma-dark py-6"
                onClick={handleAddToCart}
                disabled={!product.inStock || isAdding}
              >
                {isAdding ? (
                  'Adding...'
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </Button>
              
              {/* Categories */}
              <div className="mt-6">
                <p className="text-gray-600">
                  <span className="font-medium">Category:</span>{' '}
                  <Link 
                    to={`/products?category=${encodeURIComponent(product.category)}`}
                    className="text-pharma-primary hover:underline"
                  >
                    {product.category}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
