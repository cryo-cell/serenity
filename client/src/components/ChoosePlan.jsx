import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const plans = [
  {
    id: "hosted",
    title: "Hosted",
    price: "$50/mo",
    features: ["Includes hosting", "Free domain setup", "Basic updates"],
  },
  {
    id: "pickup",
    title: "Pickup Ordering",
    price: "$75/mo",
    features: [
      "Hosted site",
      "Pickup sales forms",
      "Daily order summary email",
      "No online payments"
    ],
  },
  {
    id: "online",
    title: "Online Sales",
    price: "$100/mo",
    features: [
      "Hosted + payment support",
      "Admin order dashboard",
      "Auto emails",
    ],
  },
];

export default function ChoosePlan() {
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
      alert("Failed to start subscription checkout.");
    }
  };

  return (
    <main className="p-6 max-w-5xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold text-center">Choose Your Monthly Plan</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.id} className="border p-4 rounded-xl shadow-sm bg-white flex flex-col">
                <h3 className="text-lg font-bold">{plan.title}</h3>
                <p className="text-gray-700 mt-1">{plan.price}</p>
                <ul className="text-sm mt-3 space-y-1 flex-grow">
                {plan.features.map((f, i) => (
                    <li key={i}>• {f}</li>
                ))}
                </ul>
                <button
                onClick={() => handlePlanCheckout(plan.id)}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                Subscribe to {plan.title}
                </button>
          </div>
            

        ))}
        

      </div>
      <div className="w-full text-center">
      <button
  onClick={() => {
    window.location.href = "/success";
  }}
  className="mt-6 text-black-600 bg-gray-200 p-4 rounded font-bold hover:bg-gray/60 border"
>
  Skip this step
</button>
</div>
    </main>
  );
}
