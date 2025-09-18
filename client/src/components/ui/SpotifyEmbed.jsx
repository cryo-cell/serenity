import React from "react";

export default function SpotifyEmbed({ embedUrl, fallbackUrl }) {
  if (!embedUrl) return null;

  return (
    <div className="w-full h-96 my-4">
      <iframe
        title="Spotify Embed"
        style={{ borderRadius: "12px" }}
        src={embedUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
}
