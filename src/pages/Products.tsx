
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';
import { useProducts } from '@/contexts/ProductContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialQuery = searchParams.get('search') || '';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  
  const { isLoading, getProductsByCategory, searchProducts } = useProducts();
  
  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);
  
  // Update URL when filters change
  useEffect(() => {
    const params: Record<string, string> = {};
    
    if (selectedCategory !== 'All') {
      params.category = selectedCategory;
    }
    
    if (searchQuery) {
      params.search = searchQuery;
    }
    
    setSearchParams(params, { replace: true });
  }, [selectedCategory, searchQuery, setSearchParams]);
  
  // Filter products based on category and search query
  const getFilteredProducts = () => {
    let filteredProducts = getProductsByCategory(selectedCategory);
    
    if (searchQuery) {
      filteredProducts = searchProducts(searchQuery).filter(product => 
        selectedCategory === 'All' || product.category === selectedCategory
      );
    }
    
    return filteredProducts;
  };
  
  const filteredProducts = getFilteredProducts();
  
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  
  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Products</h1>
        
        <div className="mb-8">
          <SearchBar 
            initialQuery={searchQuery} 
            onSearch={setSearchQuery}
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar/Filters */}
          <div className="md:w-1/4">
            <CategoryFilter 
              selectedCategory={selectedCategory} 
              onSelectCategory={setSelectedCategory}
            />
            
            {(selectedCategory !== 'All' || searchQuery) && (
              <div className="mt-4">
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="text-sm"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
          
          {/* Products Grid */}
          <div className="md:w-3/4">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="border rounded-md overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-4">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-6 w-1/4 mb-4" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <p className="text-gray-600">
                    {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                    {searchQuery && ` for "${searchQuery}"`}
                    {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                  </p>
                </div>
                
                {filteredProducts.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {currentItems.map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                    
                    {totalPages > 1 && (
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                      />
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-xl text-gray-600 mb-4">No products found</p>
                    <Button
                      onClick={handleClearFilters}
                      className="bg-pharma-primary hover:bg-pharma-dark"
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
