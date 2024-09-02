import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PaymentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const tran_id = new Date().getTime().toString();
    const paymentData = {
      ...data,
      tran_id: tran_id,
      success_url: 'http://localhost:8000/success', // Replace with your success URL
      fail_url: 'http://localhost:8000/fail', // Repl
      ace with your fail URL
      cancel_url: 'http://localhost:8000/cancel', // Replace with your cancel URL
      ipn_url: 'http://localhost:8000/ipn', // Replace with your IPN URL
    };

    try {
      const response = await axios.post('http://localhost:8000/initiate-payment', paymentData);
      if (response.data.GatewayPageURL) {
        window.location.href = response.data.GatewayPageURL;
      } else {
        console.error('Payment initiation failed:', response.data);
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card p-4 shadow w-100 max-w-md">
        <h2 className="card-title text-center mb-4">SSLCOMMERZ Payment Integration</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-100">
          <div className="mb-3">
            <input
              type="number"
              placeholder="Amount"
              {...register('amount', { required: 'Amount is required' })}
              className="form-control"
            />
            {errors.amount && <p className="text-danger">{errors.amount.message}</p>}
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Currency"
              defaultValue="BDT"
              {...register('currency', { required: 'Currency is required' })}
              className="form-control"
            />
            {errors.currency && <p className="text-danger">{errors.currency.message}</p>}
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Customer Name"
              {...register('cus_name', { required: 'Customer Name is required' })}
              className="form-control"
            />
            {errors.cus_name && <p className="text-danger">{errors.cus_name.message}</p>}
          </div>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Customer Email"
              {...register('cus_email', { required: 'Customer Email is required' })}
              className="form-control"
            />
            {errors.cus_email && <p className="text-danger">{errors.cus_email.message}</p>}
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Customer Phone"
              {...register('cus_phone', { required: 'Customer Phone is required' })}
              className="form-control"
            />
            {errors.cus_phone && <p className="text-danger">{errors.cus_phone.message}</p>}
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Customer Address"
              {...register('cus_add1', { required: 'Customer Address is required' })}
              className="form-control"
            />
            {errors.cus_add1 && <p className="text-danger">{errors.cus_add1.message}</p>}
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Reference"
              {...register('reference', { required: 'Reference is required' })}
              className="form-control"
            />
            {errors.reference && <p className="text-danger">{errors.reference.message}</p>}
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="City"
              {...register('city', { required: 'City is required' })}
              className="form-control"
            />
            {errors.city && <p className="text-danger">{errors.city.message}</p>}
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Country"
              {...register('country', { required: 'Country is required' })}
              className="form-control"
            />
            {errors.country && <p className="text-danger">{errors.country.message}</p>}
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
