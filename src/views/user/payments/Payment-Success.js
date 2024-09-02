import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const query = new URLSearchParams(useLocation().search);
  const transactionId = query.get('transaction_id');

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Payment Successful</h1>
      <p>Thank you for your payment.</p>
      {transactionId ? (
        <p>Your transaction ID is: <strong>{transactionId}</strong></p>
      ) : (
        <p>No transaction ID found.</p>
      )}
    </div>
  );
};

export default PaymentSuccess;
