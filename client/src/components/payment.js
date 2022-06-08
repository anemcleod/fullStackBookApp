import React from 'react';
import "../assets/stylesheets/footer.css";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaymentForm from './subPages/subPageComponents/paymentForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentPortal = ({togglePayment}) => {
    return (
        <div className="payment-container">
            <div className="payment-form-container"> 
                <h2>Purchase 'Book Title'</h2> 
                <Elements stripe={stripePromise}>
                    <PaymentForm/>
                </Elements> 
                <button 
                    className="close-btn" 
                    onClick={togglePayment}>
                    close
                </button>
            </div>
        </div>
    )
}

export default PaymentPortal;