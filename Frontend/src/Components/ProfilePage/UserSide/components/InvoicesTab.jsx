import React from 'react';
import { CreditCard } from 'lucide-react';

const InvoicesTab = ({ invoices }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Purchase History</h3>
        <div className="flex items-center">
          <CreditCard size={18} className="text-gray-500 mr-1" />
          <span>{invoices.length} Courses</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {invoices.map(invoice => (
          <div key={invoice.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">{invoice.courseName}</h4>
              <span className="font-medium">${invoice.amount}</span>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Purchase date: {new Date(invoice.date).toLocaleDateString()}
            </div>
          </div>
        ))}
        
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Spent</span>
            <span className="font-medium">
              ${invoices.reduce((total, inv) => total + inv.amount, 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicesTab;