

import Stripe from "stripe";
const seckey = process.env.STRIPESECRET_KEY;
const stripe = new Stripe(seckey);

export default async function handler(req, res) {
  
  const jc = req.body.data.product

  if (req.method === "POST") {
    try {
   
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: jc,
              },
              unit_amount: 1000,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/`,
      });

      res.status(200).json({ sessionId: session.id });
    } catch (err) {
      res.status(500).json({ error: "Error creating checkout session" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}




