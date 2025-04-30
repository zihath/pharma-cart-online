
import React from 'react';
import Layout from '@/components/Layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';

const FAQ = () => {
  const faqCategories = [
    {
      title: "Orders & Shipping",
      items: [
        {
          question: "How long does shipping take?",
          answer: "Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 business day delivery. Shipping times may vary based on your location and product availability."
        },
        {
          question: "How can I track my order?",
          answer: "Once your order is shipped, you'll receive a confirmation email with a tracking number. You can use this number to track your package on our website by visiting the 'My Orders' section of your account."
        },
        {
          question: "Do you ship internationally?",
          answer: "Currently, we only ship within the United States. We're working on expanding our shipping options to international destinations in the future."
        },
        {
          question: "What if I need to change or cancel my order?",
          answer: "You can change or cancel your order within 1 hour of placing it by contacting our customer service team. After this window, orders are processed for shipment and cannot be modified."
        }
      ]
    },
    {
      title: "Products & Medications",
      items: [
        {
          question: "Are all your products authentic?",
          answer: "Yes, all products sold on PharmaCart are sourced directly from authorized manufacturers or verified distributors. We have a strict quality control process to ensure authenticity and effectiveness."
        },
        {
          question: "Can I get prescription medications through PharmaCart?",
          answer: "No, PharmaCart currently only offers over-the-counter medications and health products. For prescription medications, please consult your local pharmacy or healthcare provider."
        },
        {
          question: "What if a product is out of stock?",
          answer: "Out-of-stock products are clearly marked on our website. You can sign up for email notifications to be alerted when these items become available again."
        },
        {
          question: "Do you offer generic alternatives to brand-name products?",
          answer: "Yes, we offer both brand-name and generic alternatives for many products. Generic options are clearly labeled and often provide the same benefits at a lower price."
        }
      ]
    },
    {
      title: "Returns & Refunds",
      items: [
        {
          question: "What is your return policy?",
          answer: "We accept returns of unopened products within 30 days of delivery. For defective or damaged items, please contact us within 7 days of receiving your order for a replacement or refund."
        },
        {
          question: "How do I request a return or refund?",
          answer: "To initiate a return, log into your account, go to 'My Orders', and select the relevant order. Click on 'Request Return' and follow the instructions provided. Our customer service team will guide you through the process."
        },
        {
          question: "How long do refunds take to process?",
          answer: "Once we receive and inspect the returned item, refunds are typically processed within 3-5 business days. The time it takes for the refund to appear in your account depends on your payment method and financial institution."
        },
        {
          question: "Can I return opened products?",
          answer: "For health and safety reasons, we cannot accept returns of opened medications or personal care items unless they are defective. Please contact customer service if you have concerns about a product you've opened."
        }
      ]
    },
    {
      title: "Account & Payment",
      items: [
        {
          question: "Is my payment information secure?",
          answer: "Yes, we use industry-standard encryption and security measures to protect your payment information. We do not store your full credit card details on our servers."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept major credit cards (Visa, MasterCard, American Express), PayPal, and various digital wallets. For certain orders, we also offer cash on delivery."
        },
        {
          question: "How can I update my account information?",
          answer: "You can update your account information by logging in and navigating to the 'My Profile' section. From there, you can edit your name, address, phone number, and other details."
        },
        {
          question: "Can I place an order without creating an account?",
          answer: "We require account creation to ensure the security of your personal and payment information, track your orders, and provide you with a better shopping experience."
        }
      ]
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 mb-8">
            Find answers to common questions about PharmaCart products, orders, shipping, and more.
          </p>
          
          {/* FAQ Search - This would be implemented with actual search functionality in a real app */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search the FAQ..."
                className="w-full px-4 py-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-pharma-primary"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* FAQ Categories */}
          {faqCategories.map((category, index) => (
            <div key={index} className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">{category.title}</h2>
              <Accordion type="single" collapsible className="w-full">
                {category.items.map((item, itemIndex) => (
                  <AccordionItem key={itemIndex} value={`item-${index}-${itemIndex}`}>
                    <AccordionTrigger className="text-left font-medium">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              {index < faqCategories.length - 1 && <Separator className="my-8" />}
            </div>
          ))}
          
          {/* Still Need Help Section */}
          <div className="mt-12 bg-gray-50 p-6 rounded-lg text-center">
            <h2 className="text-xl font-bold mb-2">Still Need Help?</h2>
            <p className="text-gray-600 mb-4">
              Our customer support team is here to assist you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="mailto:support@pharmacart.com" className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-pharma-primary hover:bg-gray-50">
                Email Support
              </a>
              <a href="tel:+11234567890" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-pharma-primary hover:bg-pharma-dark">
                Call Us: (123) 456-7890
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
