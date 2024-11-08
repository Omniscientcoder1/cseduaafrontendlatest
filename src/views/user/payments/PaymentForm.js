// import axios from 'axios';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';

// const PaymentForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     const tran_id = new Date().getTime().toString();
//     const paymentData = {
//       ...data,
//       tran_id: tran_id,
//       success_url: 'https://localhost:8000/payments/success/',
//       fail_url: 'https://localhost:8000/payments/fail/',
//       cancel_url: 'https://localhost:8000/payments/cancel/',
//       ipn_url: 'https://localhost:8000/payments/ipn/',
//     };
//     try {
//       const response = await axios.post(
//         'https://localhost:8000/payments/initiate/',
//         paymentData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         },
//       );
//       if (response.data.payment_url) {
//         window.location.href = response.data.payment_url;
//       } else {
//         console.error('Payment initiation failed:', response.data);
//       }
//     } catch (error) {
//       console.error('Error initiating payment:', error);
//     }
//   };

//   return (
//     <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
//       <div className="card p-4 shadow w-100 max-w-md">
//         <h2 className="card-title text-center mb-4">SSLCOMMERZ Payment form</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="w-100">
//           <div className="mb-3">
//             <input
//               type="number"
//               placeholder="Amount"
//               {...register('amount', { required: 'Amount is required' })}
//               className="form-control"
//             />
//             {errors.amount && <p className="text-danger">{errors.amount.message}</p>}
//           </div>
//           <div className="mb-3">
//             <input
//               type="text"
//               placeholder="Currency"
//               defaultValue="BDT"
//               {...register('currency', { required: 'Currency is required' })}
//               className="form-control"
//             />
//             {errors.currency && <p className="text-danger">{errors.currency.message}</p>}
//           </div>
//           <div className="mb-3">
//             <input
//               type="text"
//               placeholder="Customer Name"
//               {...register('cus_name', { required: 'Customer Name is required' })}
//               className="form-control"
//             />
//             {errors.cus_name && <p className="text-danger">{errors.cus_name.message}</p>}
//           </div>
//           <div className="mb-3">
//             <input
//               type="email"
//               placeholder="Customer Email"
//               {...register('cus_email', { required: 'Customer Email is required' })}
//               className="form-control"
//             />
//             {errors.cus_email && <p className="text-danger">{errors.cus_email.message}</p>}
//           </div>
//           <div className="mb-3">
//             <input
//               type="text"
//               placeholder="Customer Phone"
//               {...register('cus_phone', { required: 'Customer Phone is required' })}
//               className="form-control"
//             />
//             {errors.cus_phone && <p className="text-danger">{errors.cus_phone.message}</p>}
//           </div>
//           <div className="mb-3">
//             <input
//               type="text"
//               placeholder="Customer Address"
//               {...register('cus_address', { required: 'Customer Address is required' })}
//               className="form-control"
//             />
//             {errors.cus_add1 && <p className="text-danger">{errors.cus_add1.message}</p>}
//           </div>
//           <div className="mb-3">
//             <input
//               type="text"
//               placeholder="Reference"
//               {...register('reference', { required: 'Reference is required' })}
//               className="form-control"
//             />
//             {errors.reference && <p className="text-danger">{errors.reference.message}</p>}
//           </div>
//           <div className="mb-3">
//             <input
//               type="text"
//               placeholder="City"
//               {...register('cus_city', { required: 'City is required' })}
//               className="form-control"
//             />
//             {errors.city && <p className="text-danger">{errors.city.message}</p>}
//           </div>
//           <div className="mb-3">
//             <input
//               type="text"
//               placeholder="Country"
//               {...register('cus_country', { required: 'Country is required' })}
//               className="form-control"
//             />
//             {errors.country && <p className="text-danger">{errors.country.message}</p>}
//           </div>
//           <button type="submit" className="btn btn-primary w-100">
//             Pay Now
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PaymentForm;
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

const PaymentForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAgreed, setIsAgreed] = useState(false);


  // const onSubmit = async (data) => {
  //   if (!isAgreed) {
  //     alert('Please agree to the terms and conditions before proceeding.');
  //     return;
  //   }

  // Extract the amount from the passed state
  const { amount } = location.state || { amount: 0 };  // Default to 0 if not provided

  // Set the amount in the form when the component loads
  useEffect(() => {
    setValue('amount', amount);  // Set the amount field with the value passed from the state
  }, [amount, setValue]);

  const onSubmit = async (data) => {
    if (!isAgreed) {
          alert('Please agree to the terms and conditions before proceeding.');
          return;
        }
    console.log(data);
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




