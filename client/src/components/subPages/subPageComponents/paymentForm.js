import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "rgb(43, 74, 72)",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "rgb(43, 74, 72)" },
			"::placeholder": { color: "rgb(43, 74, 72)" }
		},
		invalid: {
			iconColor: "rgb(178, 51, 31)",
			color: "rgb(178, 51, 31)"
		}
	}
}

const PaymentForm = () => {
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()


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
            })

            if(response) {
                console.log(response);
                setSuccess(true)
            }

        } catch (error) {
            console.log("Error", error)
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

export default PaymentForm;