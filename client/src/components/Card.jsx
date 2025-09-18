import React, { useEffect } from "react";

function Card({ data, onUpdate }) {
  const { title = "", description = "", image = "", fileName = "" } = data;

  const textareaRef = React.useRef();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // adjust to scroll height
    }
  }, [description]);

  const handleRemoveImage = () => {
    onUpdate({ image: "", fileName: "" });
  };

  return (
    <div className="border rounded p-4 shadow-md bg-white text-black relative">
      {/* Title Input */}
      <input
        type="text"
        value={title}
        onChange={(e) => onUpdate({ title: e.target.value })}
        placeholder="Card Title"
        className="w-full border p-2 text-lg font-bold"
      />
      {title && (
        <button
          className="absolute top-1 right-1 text-xs text-red-600"
          onClick={() => onUpdate({ title: "" })}
        >
          ✕
        </button>
        
      )}
      <div className="mb-2 relative">
        {/* Image / Placeholder */}
    
        <div className="mb-2 relative">
          {image ? (
            <div className="relative">
              <img
                src={image}
                alt="Card"
                className="w-full h-auto rounded border"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-1 right-1 text-xs bg-white text-red-600 border rounded px-1"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="w-full h-40 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm border">
              No image uploaded
            </div>
          )}
          {/* Filename display */}
          {fileName && (
            <div
              className="mt-1 text-sm text-gray-600 truncate w-full"
              title={fileName} // full name on hover
            >
              {fileName}
            </div>
          )}
        </div>

        {/* Image Upload */}
        {/* Image Upload */}
        <div className="mt-2 flex items-center gap-2">
          <label className="cursor-pointer inline-block bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md">
            Upload Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () =>
                    onUpdate({ image: reader.result, fileName: file.name });
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>

          {fileName && (
            <span
              className="text-sm text-gray-700 max-w-[180px] truncate"
              title={fileName}
            >
              {fileName}
            </span>
          )}
        </div>
      </div>

      {/* Description Input */}
      <div className="mb-2 relative">
        <textarea
          ref={textareaRef}
          value={description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Card Description"
          className="w-full border p-2 resize-none overflow-hidden text-base"
          rows={1}
        />
        {description && (
          <button
            className="absolute top-1 right-1 text-xs text-red-600"
            onClick={() => onUpdate({ description: "" })}
          >
            ✕
          </button>
        )}
        
      </div>
    </div>
  );
}

export default Card;
