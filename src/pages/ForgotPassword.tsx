
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');
  const { resetPassword } = useAuth();
  
  const validateEmail = () => {
    if (!email) {
      setValidationError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setValidationError('Email is invalid');
      return false;
    }
    
    setValidationError('');
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await resetPassword(email);
      if (success) {
        setIsSubmitted(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 max-w-md">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold mb-2">Check your email</h2>
            <p className="text-gray-600 mb-6">
              We've sent password reset instructions to:
              <br />
              <span className="font-medium">{email}</span>
            </p>
            
            <div className="space-y-4">
              <Button className="w-full bg-pharma-primary hover:bg-pharma-dark" onClick={() => setIsSubmitted(false)}>
                Resend Email
              </Button>
              
              <div>
                <Link to="/login" className="text-pharma-primary hover:underline">
                  Back to login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Forgot Password</h1>
            <p className="text-gray-600 mt-2">
              Enter your email and we'll send you instructions to reset your password
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={validationError ? "border-red-500" : ""}
              />
              {validationError && (
                <p className="mt-1 text-sm text-red-500">{validationError}</p>
              )}
            </div>
            
            <Button
              type="submit"
              className="w-full bg-pharma-primary hover:bg-pharma-dark"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Instructions'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <Link to="/login" className="text-pharma-primary hover:underline">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
