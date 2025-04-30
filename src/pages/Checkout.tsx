
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/contexts/OrderContext';

const Checkout = () => {
  const { user } = useAuth();
  const { items, cartTotal } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();
  
  // Shipping form state
  const [shippingDetails, setShippingDetails] = useState({
    name: user?.name || '',
    address: user?.address || '',
    city: '',
    state: '',
    zipCode: '',
    phone: user?.phone || '',
  });
  
  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  
  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Loading state
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
  // Redirect if cart is empty or user is not logged in
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
    
    if (!user) {
      navigate('/login');
    }
  }, [items, user, navigate]);
  
  // Calculate order totals
  const subtotal = cartTotal;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;
  
  const handleShippingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Validate required fields
    const requiredFields = ['name', 'address', 'city', 'state', 'zipCode', 'phone'];
    requiredFields.forEach(field => {
      if (!shippingDetails[field as keyof typeof shippingDetails].trim()) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Validate phone number
    if (shippingDetails.phone && !/^\d{10}$/.test(shippingDetails.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    // Validate zip code
    if (shippingDetails.zipCode && !/^\d{5}(-\d{4})?$/.test(shippingDetails.zipCode)) {
      newErrors.zipCode = 'Please enter a valid zip code';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsPlacingOrder(true);
    
    try {
      const orderId = await placeOrder(shippingDetails, paymentMethod);
      if (orderId) {
        navigate(`/order-success?orderId=${orderId}`);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <Input
                    name="name"
                    value={shippingDetails.name}
                    onChange={handleShippingInputChange}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <Input
                    name="address"
                    value={shippingDetails.address}
                    onChange={handleShippingInputChange}
                    className={errors.address ? "border-red-500" : ""}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <Input
                    name="city"
                    value={shippingDetails.city}
                    onChange={handleShippingInputChange}
                    className={errors.city ? "border-red-500" : ""}
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <Input
                    name="state"
                    value={shippingDetails.state}
                    onChange={handleShippingInputChange}
                    className={errors.state ? "border-red-500" : ""}
                  />
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <Input
                    name="zipCode"
                    value={shippingDetails.zipCode}
                    onChange={handleShippingInputChange}
                    className={errors.zipCode ? "border-red-500" : ""}
                  />
                  {errors.zipCode && (
                    <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <Input
                    name="phone"
                    value={shippingDetails.phone}
                    onChange={handleShippingInputChange}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 border p-4 rounded-md">
                  <RadioGroupItem value="creditCard" id="creditCard" />
                  <Label htmlFor="creditCard" className="flex-1">
                    <div className="flex justify-between items-center">
                      <span>Credit Card</span>
                      <div className="flex space-x-1">
                        <div className="w-10 h-6 bg-blue-500 rounded"></div>
                        <div className="w-10 h-6 bg-red-500 rounded"></div>
                      </div>
                    </div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border p-4 rounded-md">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="flex-1">
                    <div className="flex justify-between items-center">
                      <span>PayPal</span>
                      <div className="w-10 h-6 bg-blue-700 rounded"></div>
                    </div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border p-4 rounded-md">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex-1">
                    Cash on Delivery
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-4">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex items-center">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-12 w-12 rounded object-cover mr-3"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              {/* Totals */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Place Order Button */}
              <Button
                className="w-full bg-pharma-primary hover:bg-pharma-dark"
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder || items.length === 0}
              >
                {isPlacingOrder ? 'Processing...' : 'Place Order'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
