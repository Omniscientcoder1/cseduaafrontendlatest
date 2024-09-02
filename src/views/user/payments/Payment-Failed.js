import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentFailed = () => {
  const query = new URLSearchParams(useLocation().search);
  const transactionId = query.get('transaction_id');

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' ,color:'red'}}>
      <h1>Payment Failed</h1>
      <p>The payment has been failed.</p>
      {transactionId ? (
        <p>Your transaction ID is: <strong>{transactionId}</strong></p>
      ) : (
        <p>No transaction ID found.</p>
      )}
    </div>
  );
};

export default PaymentFailed;
