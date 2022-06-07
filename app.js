const cors = require('cors');
const express = require('express');
const app = express();
const { v4: uuid } = require('uuid');
require('dotenv').config();
const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(stripeKey);
//uncomment for production build
//const path = require('path');

//middleware
app.use(express.json());
app.use(cors());

//routes

// Have Node serve the files for our built React app
//uncomment for production build
// app.use(express.static(path.resolve(__dirname, './client/build')));

// All other GET requests not handled before will return our React app
//uncomment for production build
  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  // });

app.get('/', (req, res)=> {
    res.send("works!")
})

app.post("/pay", cors(), async (req, res) => {
    const orderId = uuid();
	let { book, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount: book.price,
			currency: "USD",
			description: book.name,
			payment_method: id,
			confirm: true,
            metadata: {
                order_id: orderId,
              },
		})
		console.log("Payment", payment)
		res.json({
            orderId: payment.metadata.order_id,
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

//listen on port
const Port = process.env.PORT || 3001;
app.listen(Port, () => console.log(`the server has started on ${Port}`)
);