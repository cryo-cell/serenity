import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import PricingTable from "./ui/PricingTable";
export default function HomePage() {
  const handleSetupFeeCheckout = async () => {
  const stripe = await stripePromise;

  const res = await fetch("http://localhost:4242/create-setup-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
const handlePlanCheckout = async (planId) => {
  const stripe = await stripePromise;

  const res = await fetch("http://localhost:4242/create-subscription-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ planId }),
  });

  const data = await res.json();
  if (data.url) {
    window.location.href = data.url;
  } else {
    alert("Failed to create subscription session.");
  }
};

  const data = await res.json();
  if (data.url) {
    window.location.href = data.url;
  } else {
    alert("Failed to create setup session.");
  }
};

  const pricingPlans = [
    {
      id: "hosted",
      title: "Hosted",
      price: "$80/mo",
      features: ["Includes hosting", "Free domain setup", "Basic updates"],
    },
    {
      id: "pickup",
      title: "Pickup Ordering",
      price: "$100/mo",
      features: [
        "Hosted site",
        "Pickup sales forms",
        "Daily order summary email",
      ],
    },
    {
      id: "online",
      title: "Online Sales",
      price: "$200/mo",
      features: [
        "Hosted + payment support",
        "Admin order dashboard",
        "Auto emails",
      ],
    },
  ];
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY); // or your actual key

  return (
    <main className="p-6  mx-auto space-y-12">
      {/* Hero Section */}

      <section className="text-center space-y-4">
        
        <h1 className="text-4xl font-bold text-wb">Build your site in minutes</h1>
        <p className="text-lg text-bb">
          Choose blocks, preview, and launch. No coding needed.
        </p>
        <Link
          to="/Editor"
          className="inline-block bg-bb text-wb px-6 py-2 rounded-xl text-lg font-semibold hover:bg-white transition text-db"
        >
          <button className="bg-bb text-wb px-6 py-2 rounded-xl text-lg font-semibold hover:bg-white transition  ">
            Start Building
          </button>
        </Link>
      </section>

      {/* How It Works */}
      {/*<section className="space-y-4">
        <h2 className="text-2xl font-bold text-bb">How it works</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Choose blocks from our visual builder",
            "Preview your site before publishing",
            "Launch with or without hosting support",
          ].map((step, index) => (
            <div
              key={index}
              className="border rounded-2xl p-4 shadow-sm bg-white"
            >
              <h3 className="font-bold text-lg mb-2 text-bb">Step {index + 1}</h3>
              <p className="text-bb">{step}</p>
            </div>
          ))}
        </div>
      </section>*/}

      {/* Pricing */}
      {/*<section className="space-y-4">
        <h2 className="text-2xl font-bold text-center text-bb">Pricing</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              id: "basic",
              title: "Basic Site",
              price: "$400 one-time",
              features: [
                "1-page site",
                "Form or CTA block",
                "Downloadable export",
                "You pay $400 upfront for the project."
              ],
            },
            {
              id: "hosted",
              title: "Hosted",
              price: "$200 one-time + $200 activation + $80/mo",
              features: [
                "Includes hosting",
                "Free domain setup",
                "Basic updates",
              ],
            },
            {
              id: "pickup",
              title: "Pickup Ordering",
              price: "$200 one-time + $200 activation + $100/mo",
              features: [
                "Hosted site",
                "Pickup sales forms",
                "Daily order summary email",
              ],
            },
            {
              id: "online",
              title: "Shipping or Delivery",
              price: "$200 one-time + $200 activation + $150/mo",
              features: [
                "Hosted + payment support",
                "Admin order dashboard",
                "Auto emails",
              ],
            },{
              id: "bundle",
              title: "Full-Suite",
              price: "$200 one-time + $200 activation + $200/mo",
              features: [
                "Hosted + payment support",
                "Admin order dashboard",
                "Auto emails",
                "Pickup, delivery, display, CMS tools — the full suite"
              ],
            }
          ].map((plan, index) => (
            <div
              key={index}
              className="border rounded-2xl p-4 shadow-md bg-white flex flex-col"
            >
              <h3 className="text-xl font-bold text-bb">{plan.title}</h3>
              <p className="text-lg text-bbm mt-2 mb-4">{plan.price}</p>
              <ul className="text-sm text-bb space-y-1 flex-grow">
                {plan.features.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => handleSetupFeeCheckout(plan.id)}
                className="w-full bg-bb hover:bg-bbm text-white font-bold py-2 px-4 rounded mt-4"
              >
                Select Premium Plan
              </button>
            </div>
          ))}
        </div>
                  <p className=" flex justify-center text-bb">No monthly fees will be charged while the project is in development. Monthly fees begin only once your site and delivery system are fully deployed and live.</p>

      </section>*/}
    </main>
  );
}
