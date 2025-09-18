const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");
require("dotenv").config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // or hardcode it for now

app.use(cors());
app.use(express.json());


app.post("/create-setup-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment", // One-time payment
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Site Setup Fee",
            },
            unit_amount: 20000, // $200
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:5173/choose-plan?setupSuccess=true",
      cancel_url: "http://localhost:5173/",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Error creating setup session", err);
    res.status(500).json({ error: "Server error" });
  }
});
app.post("/create-subscription-session", async (req, res) => {
  const { planId } = req.body;

  const plans = {
    hosted: "price_1RQFZ6G60qJCPC1RsJqnSI0G",
    pickup: "price_1RQFZTG60qJCPC1RA18UwTv8",
    online: "price_1RQFZhG60qJCPC1R9XiY4YZB",
  };

  const priceId = plans[planId];

  if (!priceId) {
    return res.status(400).json({ error: "Invalid plan selected" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/choose-plan",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Error creating subscription session", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/create-booking-session", async (req, res) => {
  const { name, email, address, date, timeSlot } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Booking with ${name}`,
              description: `Date: ${date}, Time: ${timeSlot}, Address: ${address}`,
            },
            unit_amount: 2500, // $25 for booking
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Error creating booking session", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Forward geocoding
app.get("/geocode", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Missing query parameter q" });

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`,
      { headers: { "User-Agent": "YourApp/1.0 (your@email.com)" } }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Geocoding failed" });
  }
});

// Reverse geocoding
app.get("/reverse", async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: "Missing lat or lon" });

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      { headers: { "User-Agent": "YourApp/1.0 (your@email.com)" } }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Reverse geocoding failed" });
  }
});





app.listen(4242, () => console.log("Server running on http://localhost:4242"));
