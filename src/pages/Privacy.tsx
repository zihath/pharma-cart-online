
import React from 'react';
import Layout from '@/components/Layout';
import { Separator } from '@/components/ui/separator';

const Privacy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">
            Last Updated: April 30, 2025
          </p>
          
          <div className="prose max-w-none">
            <p className="mb-4">
              PharmaCart ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
            
            <h2 className="text-xl font-bold my-4">Information We Collect</h2>
            <p className="mb-4">We may collect information about you in a variety of ways. The information we may collect includes:</p>
            
            <h3 className="text-lg font-semibold mt-4 mb-2">Personal Data</h3>
            <p className="mb-4">
              When you register an account, place an order, or subscribe to our newsletter, we may collect personally identifiable information, such as your:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Mailing address</li>
              <li>Payment information</li>
            </ul>
            
            <h3 className="text-lg font-semibold mt-4 mb-2">Usage Data</h3>
            <p className="mb-4">
              We may also collect information about how you access and use our website, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Your computer's IP address</li>
              <li>Browser type</li>
              <li>Pages viewed</li>
              <li>Time spent on pages</li>
              <li>Links clicked</li>
              <li>The page you visited before navigating to our website</li>
            </ul>
            
            <Separator className="my-6" />
            
            <h2 className="text-xl font-bold my-4">How We Use Your Information</h2>
            <p className="mb-4">We may use the information we collect about you to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Process and fulfill your orders</li>
              <li>Send you order confirmations and updates</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Provide customer service and support</li>
              <li>Send you technical notices, updates, security alerts, and administrative messages</li>
              <li>Communicate with you about products, services, offers, and promotions</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our website</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              <li>Personalize your experience on our website</li>
            </ul>
            
            <Separator className="my-6" />
            
            <h2 className="text-xl font-bold my-4">Sharing Your Information</h2>
            <p className="mb-4">We may share your information as follows or as otherwise described in this Privacy Policy:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>With vendors, service providers, and consultants who need access to such information to carry out work on our behalf</li>
              <li>In response to a request for information if we believe disclosure is in accordance with any applicable law, regulation, or legal process</li>
              <li>If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of PharmaCart or others</li>
              <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business by another company</li>
              <li>With your consent or at your direction</li>
            </ul>
            
            <Separator className="my-6" />
            
            <h2 className="text-xl font-bold my-4">Data Storage and Security</h2>
            <p className="mb-4">
              We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no data security measures can guarantee 100% security.
            </p>
            <p className="mb-4">
              Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential.
            </p>
            
            <Separator className="my-6" />
            
            <h2 className="text-xl font-bold my-4">Your Choices</h2>
            <h3 className="text-lg font-semibold mt-4 mb-2">Account Information</h3>
            <p className="mb-4">
              You may update, correct, or delete your account information at any time by logging into your account or emailing us at privacy@pharmacart.com. Note that we may retain certain information as required by law or for legitimate business purposes.
            </p>
            
            <h3 className="text-lg font-semibold mt-4 mb-2">Cookies</h3>
            <p className="mb-4">
              Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove or reject browser cookies. Please note that if you choose to remove or reject cookies, this could affect the availability and functionality of our website.
            </p>
            
            <h3 className="text-lg font-semibold mt-4 mb-2">Promotional Communications</h3>
            <p className="mb-4">
              You may opt out of receiving promotional emails from PharmaCart by following the instructions in those emails. If you opt out, we may still send you non-promotional emails, such as those about your account or our ongoing business relations.
            </p>
            
            <Separator className="my-6" />
            
            <h2 className="text-xl font-bold my-4">Changes to this Privacy Policy</h2>
            <p className="mb-4">
              We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice (such as adding a statement to our website homepage or sending you a notification).
            </p>
            <p className="mb-4">
              We encourage you to review the Privacy Policy whenever you access our website to stay informed about our information practices and the choices available to you.
            </p>
            
            <Separator className="my-6" />
            
            <h2 className="text-xl font-bold my-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mb-4">
              PharmaCart<br />
              123 Pharmacy Street<br />
              Health City, HC 12345<br />
              Email: privacy@pharmacart.com<br />
              Phone: (123) 456-7890
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
