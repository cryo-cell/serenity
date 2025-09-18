import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import { useState } from "react";

const baseLocation = [27.97, -82.79]; // Your base
const radiusMeters = 32186.9; // 20 miles in meters

function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const toRad = (deg) => deg * (Math.PI / 180);
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function ConsultationMap({ onLocationSelected }) {
  const [position, setPosition] = useState(baseLocation);
  const [input, setInput] = useState("");

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

     const response = await fetch(
  `http://localhost:4242/geocode?q=${encodeURIComponent(input)}`
);

      const data = await response.json();

      if (data[0]) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setPosition([lat, lon]);

        const distance = getDistanceFromLatLonInMeters(
          baseLocation[0],
          baseLocation[1],
          lat,
          lon
        );

        const eligible = distance <= radiusMeters;

        onLocationSelected({
          address: input,
          lat,
          lon,
          eligible,
        });
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter meeting address"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="border px-2 py-1 rounded mb-4 w-full"
      />
      <MapContainer center={position} zoom={12} style={{ height: "400px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} />
        <Circle
          center={baseLocation}
          radius={radiusMeters}
          pathOptions={{ fillColor: "blue", fillOpacity: 0.2, color: "blue" }}
        />
      </MapContainer>
    </div>
  );
}

export default ConsultationMap;
