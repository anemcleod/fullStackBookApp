import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import CARD_OPTIONS from './paymentHelpers/cardOptions'
import TurnPage from '../../svg/turnPage';

const PaymentForm = (props) => {

    const [isLoading, setIsLoading] = useState(false);    
    //stripe
    const stripe = useStripe()
    const elements = useElements()

    //on submit attempt stripe payment
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        if(!error) {
            try {
                const {id} = paymentMethod
                const response = await axios.post("http://localhost:3001/pay", {
                    book: {
                        id: 1234,
                        price: 299,
                        name: "Vietnam: She made me do it."
                    },
                    id: id,
                });

                if(response) {
                    if(response.data.success){
                        props.history.push({
                            pathname: "/payment",
                            state: {
                                success: true, 
                                orderId: response.data.orderId
                            }
                        });
                    }else{
                        props.history.push({
                            pathname: "/payment",
                            state: {
                                success: false, 
                                orderId: null
                            }
                        });
                    }
                    setIsLoading(false);
                }

            } catch (error) {
                console.log("Error", error);
                props.history.push({
                    pathname: "/payment",
                    state: {
                        success: false, 
                        orderId: null
                    }
                });
                setIsLoading(false);
            }
        }
    }

    return (
        isLoading ? <div className="payment-load"><TurnPage /></div> : (
            <form onSubmit={handleSubmit} className="payment-form">
                <fieldset className="form-group">
                    <div className="form-row">
                        <CardElement options={CARD_OPTIONS}/>
                    </div>
                </fieldset>
                <button className="pay-btn">
                    Pay $2.99
                </button>
            </form>
        )
    )
}

export default withRouter(PaymentForm);