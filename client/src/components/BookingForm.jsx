import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { loadStripe } from "@stripe/stripe-js";

const BookingForm = ({ address: initialAddress, lat, lon }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState(null);

  const DELIVERY_BASE = { lat: 27.8859, lon: -82.7991 };
  const today = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3); // 3 months from today
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  const handlePayment = async () => {
  const stripe = await stripePromise;

  const res = await fetch("http://localhost:4242/create-booking-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      address: userAddress,
      date: selectedDate ? selectedDate.toISOString().split("T")[0] : null,
      timeSlot,
    }),
  });

  const data = await res.json();

  if (data.url) {
    window.location.href = data.url;
  } else {
    alert("Failed to create checkout session.");
  }
};

  useEffect(() => {
    if (initialAddress) {
      setUserAddress(initialAddress);
    }
  }, [initialAddress]);

const geocodeAddress = async (address) => {
  try {
    const response = await fetch(
      `http://localhost:4242/geocode?q=${encodeURIComponent(address)}`
    );
    const data = await response.json();

    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      return { lat: parseFloat(lat), lon: parseFloat(lon) };
    } else {
      throw new Error("No results found");
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
};

const isValidAddress = async (address) => {
  const result = await geocodeAddress(address);
  if (!result) return false;

  try {
    const response = await fetch(
      `http://localhost:4242/reverse?lat=${result.lat}&lon=${result.lon}`
    );
    const data = await response.json();
    const addressType = data?.type;

    console.log("Address type:", addressType);

    if (!addressType || typeof addressType !== "string") return false;
    return !["postcode", "country", "state"].includes(addressType);
  } catch (error) {
    console.error("Reverse validation error:", error);
    return false;
  }
};


  const haversineDistance = (coords1, coords2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 3958.8;
    const dLat = toRad(coords2.lat - coords1.lat);
    const dLon = toRad(coords2.lon - coords1.lon);
    const lat1 = toRad(coords1.lat);
    const lat2 = toRad(coords2.lat);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.asin(Math.sqrt(a));
    return R * c;
  };

  const isTimeSlotInFuture = (selectedDate, selectedTime) => {
    if (!selectedDate || !selectedTime) return false;
    const [timeStr, meridiem] = selectedTime.split(" ");
    const [hoursRaw, minutes] = timeStr.split(":").map(Number);

    let hours = hoursRaw;
    if (meridiem === "PM" && hours !== 12) hours += 12;
    if (meridiem === "AM" && hours === 12) hours = 0;

    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(hours);
    selectedDateTime.setMinutes(minutes);
    return selectedDateTime > new Date();
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  const userCoords = await geocodeAddress(userAddress);
  if (!userCoords) {
    setError("Could not locate the address. Please enter a more specific one.");
    return;
  }

  const valid = await isValidAddress(userAddress);
  if (!valid) {
    setError("Please enter a complete street address.");
    return;
  }

  const distance = haversineDistance(userCoords, DELIVERY_BASE);
  if (distance > 20) {
    setError("Address is outside our 20-mile service area.");
    return;
  }

  if (!isTimeSlotInFuture(selectedDate, timeSlot)) {
    setError("Please select a future time slot.");
    return;
  }

  // If all checks pass, initiate payment
  await handlePayment();
};

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-xl border">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="mb-4">
            <label className="block text-sm font-medium">Meeting Address</label>
            <input
              type="text"
              value={userAddress}
              placeholder="Enter meeting address"
              onChange={(e) => setUserAddress(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>

          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            required
          >
            <option value="">Select a time slot</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="1:00 PM">1:00 PM</option>
            <option value="2:00 PM">2:00 PM</option>
          </select>

          {error && <div className="text-red-600 mt-2">{error}</div>}
        </div>

        <div className="flex-1 flex flex-col items-center justify-between">
          <DatePicker
            className="w-full"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={today}
            maxDate={maxDate}
            inline
            calendarClassName="bg-white border rounded-lg shadow-lg"
          />
          <button
  type="submit" // instead of using onClick={handlePayment}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Pay $25 to Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
