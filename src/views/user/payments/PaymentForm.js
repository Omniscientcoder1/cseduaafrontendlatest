import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState,useContext } from 'react';
import { AuthContext } from 'src/context/AuthContext';

const PaymentForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const location = useLocation();
  const [isAgreed, setIsAgreed] = useState(false);
  const { userData } = useContext(AuthContext);

  // Extract the amount from the passed state
  const { amount,membershipId  } = location.state || { amount: 0 };  // Default to 0 if not provided
  // console.log(membershipId);
  const email_address = userData && userData.email_address ? userData.email_address : '';
  const name = userData && `${userData.first_name || ''} ${userData.last_name || ''}`;
  const address = userData && userData.hometown ? userData.hometown : '';
  const city = userData && userData.hometown ? userData.hometown : '';
  const phone_number = userData && userData.phone_number ? userData.phone_number : '';
  const country = userData.present_address && userData.present_address.country ? userData.present_address.country : '';

  // Set the amount in the form when the component loads
 useEffect(() => {
  setValue('amount', amount);
  setValue('cus_name', name); 
  setValue('cus_address', address); 
  setValue('cus_email', email_address); 
  setValue('cus_city', city); 
  setValue('cus_country', country); 
  setValue('cus_phone', phone_number); 
}, [amount, email_address,name,address,city,country,phone_number, setValue]);

  const onSubmit = async (data) => {
    if (!isAgreed) {
          alert('Please agree to the terms and conditions before proceeding.');
          return;
        }
    // console.log(data);
    // return;
    const tran_id = new Date().getTime().toString();
    const paymentData = {
      ...data,
      tran_id: tran_id,
      success_url: 'http://localhost:8000/payments/success/',
      fail_url: 'http://localhost:8000/payments/fail/',
      cancel_url: 'http://localhost:8000/payments/cancel/',
      ipn_url: 'http://localhost:8000/payments/ipn/',
    };
    try {
      const response = await axios.post(
        'http://localhost:8000/payments/initiate/',
        paymentData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.data.payment_url) {
        window.location.href = response.data.payment_url;
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
        <h2 className="card-title text-center mb-4">SSLCOMMERZ Payment form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-100">
          {/* Predefined Amount */}
          <input
          type="hidden"
          {...register('membershipId')}
          value={membershipId || ''}
        />
          <div className="mb-3">
            <input
              type="number"
              placeholder="Amount"
              {...register('amount', { required: 'Amount is required' })}
              className="form-control"
              readOnly
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
              {...register('cus_address', { required: 'Customer Address is required' })}
              className="form-control"
            />
            {errors.cus_address && <p className="text-danger">{errors.cus_address.message}</p>}
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
              {...register('cus_city', { required: 'City is required' })}
              className="form-control"
            />
            {errors.city && <p className="text-danger">{errors.city.message}</p>}
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Country"
              {...register('cus_country', { required: 'Country is required' })}
              className="form-control"
            />
            {errors.country && <p className="text-danger">{errors.country.message}</p>}
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="termsCheckbox"
              checked={isAgreed}
              onChange={() => setIsAgreed(!isAgreed)}
            />
            <label className="form-check-label" htmlFor="termsCheckbox">
              I HAVE READ AND AGREE TO THE WEBSITE'S TERMS AND CONDITIONS, PRIVACY POLICY, REFUND POLICY
            </label>
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




