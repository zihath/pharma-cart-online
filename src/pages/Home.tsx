
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/components/Layout';
import FeaturedProducts from '@/components/FeaturedProducts';
import { useProducts } from '@/contexts/ProductContext';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  const { categories } = useProducts();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-pharma-light py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Your Health, Our Priority
              </h1>
              <p className="text-xl mb-6 text-gray-700">
                Experience reliable medicine delivery with PharmaCart. 
                Fast, Affordable, and Trusted by thousands.
              </p>
              <div className="flex space-x-4">
                <Link to="/products">
                  <Button className="bg-pharma-primary hover:bg-pharma-dark text-lg py-6 px-8">
                    Shop Now
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" className="text-lg py-6 px-8">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Pharmacy products" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <FeaturedProducts />
      
      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Shop by Categories</h2>
            <p className="text-gray-600">Browse our wide range of healthcare products</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((category) => (
              <Link 
                key={category} 
                to={`/products?category=${encodeURIComponent(category)}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2 text-pharma-primary">{category}</h3>
                  <div className="text-gray-600 flex items-center justify-center">
                    <span>Shop Now</span>
                    <ArrowRight size={16} className="ml-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/products">
              <Button variant="outline" className="text-pharma-primary border-pharma-primary hover:bg-pharma-light">
                View All Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Why Choose PharmaCart?</h2>
            <p className="text-gray-600">We provide the best experience for our customers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto bg-pharma-light rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pharma-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your medications and health products delivered to your doorstep quickly and reliably.
              </p>
            </div>
            
            {/* Benefit 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto bg-pharma-light rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pharma-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Genuine Products</h3>
              <p className="text-gray-600">
                All our products are sourced from authorized distributors, ensuring quality and authenticity.
              </p>
            </div>
            
            {/* Benefit 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto bg-pharma-light rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pharma-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Our customer support team is always available to assist you with your health needs.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-12 bg-pharma-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="mb-6">Stay updated with our latest products, health tips, and exclusive offers</p>
            <form className="flex flex-col md:flex-row gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-grow bg-white text-gray-900"
              />
              <Button className="bg-pharma-secondary hover:opacity-90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
