const cors = require('cors');
const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const uui = require('uuid');
require('dotenv').config();
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
app.post("/create-checkout-session", async (req, res) => {
    try {
        const { book } = req.body;
        const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                    name: book.name,
                    },
                    unit_amount: book.price,
                },
                quantity: book.quantity,
            }
            ],
        success_url: `${process.env.SERVER_URL}/`,
        cancel_url: `${process.env.SERVER_URL}/`,
        })
        res.json({ url: session.url })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
});

//listen on port
const Port = process.env.PORT || 3001;
app.listen(Port, () => console.log(`the server has started on ${Port}`)
);