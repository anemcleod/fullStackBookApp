import React from 'react'
import { withRouter } from 'react-router-dom';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import CARD_OPTIONS from './paymentHelpers/cardOptions'

const PaymentForm = (props) => {
    //stripe
    const stripe = useStripe()
    const elements = useElements()

    //on submit attempt stripe payment
    const handleSubmit = async (e) => {
        e.preventDefault()
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
                            pathname: "/payment_success",
                            state: { orderId: response.data.orderId}
                        })
                    }else{
                        props.history.push("/payment_failure")
                    }
                }

            } catch (error) {
                console.log("Error", error);
                props.history.push("/payment_failure")
            }
        } else {
            console.log(error.message)
        }
    }

    return (
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
}

export default withRouter(PaymentForm);