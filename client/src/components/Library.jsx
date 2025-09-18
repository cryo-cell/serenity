import Form from "./Form";
import Card from "./Card";
import Block from "./Block";
import { useState } from "react";
function Library({
  siteTitle,
  setSiteTitle,
  siteDescription,
  setSiteDescription,
  buttonText,
  setButtonText,
  bgImage,
  setBgImage,
  components,
  setComponents,
  logo,
  setLogo,
  menuItems,
  setMenuItems,
  fields = [],
  setFields,
}) {
  // No type annotations here:
  const moveComponent = (index, direction) => {
    const newComponents = [...components];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newComponents.length) return;

    [newComponents[index], newComponents[targetIndex]] = [
      newComponents[targetIndex],
      newComponents[index],
    ];

    setComponents(newComponents);
  };

  const updateFormFields = (updatedFields) => {
    setComponents((prevComponents) => {
      const updated = prevComponents.map((comp) => {
        if (comp.type === "form") {
          return { ...comp, fields: updatedFields }; // Update the fields for the form component
        }
        return comp;
      });
      return updated;
    });
  };
  const [socialLinks, setSocialLinks] = useState([]);
  const [platform, setPlatform] = useState("");

  // New state for new platform data or object (depending on your use case)
  const [newPlatform, setNewPlatform] = useState(null);

  // Example handler to add social link or platform
  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { platform, url: "" }]);
    setPlatform(""); // reset input
  };
  return (
    <div className="flex flex-col gap-4">
      <details open>
        <summary className="text-xl font-bold cursor-pointer">
          Navigation
        </summary>

        <label className="block mt-2">Logo:</label>
        <input
          type="text"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <label className="block mt-4">Social Media Links:</label>
        {socialLinks.map((link, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <select
              value={newPlatform}
              onChange={(e) => setNewPlatform(e.target.value)}
            >
              <option value="">Select Platform</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="twitter">Spotify</option>
              <option value="twitter">Twitter</option>
            </select>
            <input
              type="text"
              placeholder="URL"
              value={link.url}
              onChange={(e) => {
                const updated = [...socialLinks];
                updated[index].url = e.target.value;
                setSocialLinks(updated);
              }}
              className="border p-2 rounded w-full"
            />
            <button
              onClick={() => {
                updated = [...socialLinks];
                updated.splice(index, 1);
                setSocialLinks(updated);
              }}
              className="text-red-500"
            >
              ✕
            </button>
          </div>
        ))}
        <div>
          <button onClick={addSocialLink}>Add Social Link</button>

          <ul>
            {socialLinks.map((link, index) => (
              <li key={index}>{link.platform}</li>
            ))}
          </ul>
        </div>

        <label className="block mt-4">Menu Items:</label>
        {menuItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={item}
              onChange={(e) => {
                const updated = [...menuItems];
                updated[index] = e.target.value;
                setMenuItems(updated);
              }}
              className="border p-2 rounded w-full"
            />
            <button
              onClick={() => {
                const updated = [...menuItems];
                updated.splice(index, 1);
                setMenuItems(updated);
              }}
              className="text-red-500"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          onClick={() => setMenuItems([...menuItems, "New Item"])}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Menu Item
        </button>
      </details>
      <details open>
        <summary className="text-xl font-bold cursor-pointer">Header</summary>
        <div className="flex flex-col">
          <input
            type="text"
            value={siteTitle}
            onChange={(e) => setSiteTitle(e.target.value)}
            className="border p-2"
            placeholder="Site Title"
          />
          <textarea
            value={siteDescription}
            onChange={(e) => setSiteDescription(e.target.value)}
            className="border p-2"
            placeholder="Site Description"
          />
          {/* Button Text Editor */}
          <label className="block mt-4 font-medium">Button Text</label>
          <input
            type="text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            className="w-full p-2 border rounded"
          />

          {/* Background Image Upload */}
          <label className="block mt-4 font-medium">
            Header Background Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setBgImage(reader.result); // Base64 string
                };
                reader.readAsDataURL(file);
              }
            }}
            className="w-full mt-1"
          />
        </div>
      </details>
      <details open>
        <summary className="text-xl font-bold cursor-pointer">
          Components
        </summary>

        {/*      <div className="flex items-center gap-2">
  <select
    className="border rounded p-2 "
    onChange={(e) => {
      const type = e.target.value;
      if (!type) return;

      let newComponent;
      if (type === "card") {
        newComponent = { type: "card", title: "", description: "", image: "" };
      } else if (type === "form") {
        newComponent = { type: "form", fields: [] };
      } else if (type === "block") {
        newComponent = {
          type: "block",
          content: { text: "", buttonText: "" },
        };
      }

      setComponents([...components, newComponent]);
      e.target.value = ""; // Reset dropdown
    }}
  >
    <option value="">Add Component</option>
    <option value="card">Card</option>
    <option value="form">Form</option>
    <option value="block">Block</option>
  </select>
</div>*/}
        <button
          onClick={() =>
            setComponents([
              ...components,
              {
                type: "card",
                content: {
                  text: "Editable headline",
                  buttonText: "Click Me",
                  imageUrl: null,
                },
              },
            ])
          }
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Add Card
        </button>

        <button
          onClick={() => {
            setComponents([
              ...components,
              {
                type: "form",
                fields: [],
              },
            ]);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Add Form
        </button>

        <button
          onClick={() =>
            setComponents([
              ...components,
              {
                type: "block",
                content: {
                  text: "Editable headline",
                  buttonText: "Click Me",
                  imageUrl: null,
                },
              },
            ])
          }
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Add Block
        </button>

        {components.map((comp, idx) => {
          let ComponentUI = null;

          if (comp.type === "card") {
            ComponentUI = (
              <Card
                data={comp}
                onUpdate={(updatedCard) => {
                  const updated = [...components];
                  updated[idx] = { ...updated[idx], ...updatedCard };
                  setComponents(updated);
                }}
              />
            );
          } else if (comp.type === "form") {
            ComponentUI = (
              <Form
                fields={comp.fields}
                setFields={(updateFn) => {
                  setComponents((prevComponents) =>
                    prevComponents.map((c, i) => {
                      if (i === idx && c.type === "form") {
                        const prevFields = Array.isArray(c.fields)
                          ? c.fields
                          : [];
                        const updatedFields =
                          typeof updateFn === "function"
                            ? updateFn(prevFields)
                            : updateFn;
                        return { ...c, fields: updatedFields };
                      }
                      return c;
                    })
                  );
                }}
              />
            );
          } else if (comp.type === "block") {
            ComponentUI = (
              <Block
                content={comp.content}
                onUpdate={(updatedContent) => {
                  const updated = [...components];
                  updated[idx] = {
                    ...updated[idx],
                    content: {
                      ...updated[idx].content,
                      ...updatedContent,
                    },
                  };
                  setComponents(updated);
                }}
              />
            );
          }

          return (
            <div key={idx} className="mt-4">
              {ComponentUI}

              {/* Universal Buttons */}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => {
                    const updated = [...components];
                    updated.splice(idx, 1);
                    setComponents(updated);
                  }}
                  className="text-red-600"
                >
                  ✕ Remove
                </button>
                <button
                  onClick={() => moveComponent(idx, "up")}
                  disabled={idx === 0}
                  className="text-sm px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveComponent(idx, "down")}
                  disabled={idx === components.length - 1}
                  className="text-sm px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                >
                  ↓
                </button>
              </div>
            </div>
          );
        })}
      </details>
    </div>
  );
}

export default Library;
