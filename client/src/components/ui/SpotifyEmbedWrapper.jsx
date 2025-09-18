import React, { useState } from "react";
import SpotifyEmbed from "./SpotifyEmbed"; // assume your component is in the same folder

function SpotifyEmbedWrapper() {
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [fallbackUrl, setFallbackUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!spotifyUrl.includes("open.spotify.com/")) {
      alert("Please paste a valid Spotify URL.");
      return;
    }

    // Convert regular Spotify URL to embed URL
    const embed = spotifyUrl.replace("open.spotify.com/", "open.spotify.com/embed/");
    setEmbedUrl(embed);
    setFallbackUrl(spotifyUrl);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <label htmlFor="spotifyUrl" className="block text-sm font-medium text-gray-700">
          Paste any Spotify link:
        </label>
        <input
          id="spotifyUrl"
          type="text"
          value={spotifyUrl}
          onChange={(e) => setSpotifyUrl(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="https://open.spotify.com/track/..."
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Load Embed
        </button>
      </form>

      {embedUrl && <SpotifyEmbed embedUrl={embedUrl} fallbackUrl={fallbackUrl} />}
    </div>
  );
}

export default SpotifyEmbedWrapper;
