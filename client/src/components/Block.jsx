import React, { useEffect, useState } from "react";
import SpotifyEmbed from "./ui/SpotifyEmbed";

export default function Block({ content = {}, onUpdate }) {
  const [text, setText] = useState(content.text || "Editable headline");
  const [buttonText, setButtonText] = useState(content.buttonText || "Click Me");
  const [imageUrl, setImageUrl] = useState(content.imageUrl || null);
  const [spotifyUrl, setSpotifyUrl] = useState(content.spotifyEmbedUrl || "");
  const [spotifyEmbedConverted, setSpotifyEmbedConverted] = useState(content.spotifyEmbedConverted || "");

  // Sync with props when parent updates
  useEffect(() => {
    setText(content.text || "Editable headline");
    setButtonText(content.buttonText || "Click Me");
    setImageUrl(content.imageUrl || null);
    setSpotifyUrl(content.spotifyEmbedUrl || "");
    setSpotifyEmbedConverted(content.spotifyEmbedConverted || "");
  }, [content]);

  // Image upload handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newUrl = reader.result;
      setImageUrl(newUrl);
      onUpdate({ ...content, imageUrl: newUrl });
    };
    reader.readAsDataURL(file);
  };

  const handleSpotifyChange = (e) => {
    const rawUrl = e.target.value;
    let embedUrl = "";

    if (rawUrl.includes("open.spotify.com/")) {
      embedUrl = rawUrl.replace("open.spotify.com/", "open.spotify.com/embed/");
    }

    setSpotifyUrl(rawUrl);
    setSpotifyEmbedConverted(embedUrl);
    onUpdate({
      ...content,
      spotifyEmbedUrl: rawUrl,
      spotifyEmbedConverted: embedUrl,
    });
  };

  return (
    <div
      className="flex flex-col items-center justify-center max-w mx-auto p-6 text-left bg-cover"
      style={{
        backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
        minHeight: "300px",
      }}
    >
      {/* Headline */}
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          onUpdate({ ...content, text: e.target.value });
        }}
        className="w-full max-w-xl p-2 text-lg font-bold border border-white/50 bg-white/80 rounded text-center"
        rows={1}
      />

      {/* Upload Image */}
      <div className="mb-4 mt-4">
        <label className="cursor-pointer text-sm text-white bg-black/40 px-3 py-1 rounded hover:bg-black/60">
          Upload Background Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Spotify Input */}
      <input
        type="text"
        placeholder="Paste Spotify URL (not embed)"
        value={spotifyUrl}
        onChange={handleSpotifyChange}
        className="mt-4 w-full max-w-xl p-2 border rounded"
      />

      {/* Spotify Preview */}
      <SpotifyEmbed
        embedUrl={spotifyEmbedConverted}
        fallbackUrl={spotifyUrl}
      />

      {/* Button Text */}
      <input
        value={buttonText}
        onChange={(e) => {
          setButtonText(e.target.value);
          onUpdate({ ...content, buttonText: e.target.value });
        }}
        className="mt-4 px-4 py-2 rounded bg-blue-600 text-white cursor-pointer hover:bg-blue-700 text-center"
      />
    </div>
  );
}
