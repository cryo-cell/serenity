import { useState } from "react";
import Form from "./Form";
import Card from "./Card";
import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";

import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaDesktop,
  FaTabletAlt,
  FaMobileAlt,
} from "react-icons/fa";
import Block from "./Block";

function Preview({
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
  fields,
  setFields,
}) {
  const [socialLinks, setSocialLinks] = useState([]);
  const [viewMode, setViewMode] = useState("desktop");
  const [showNavSettings, setShowNavSettings] = useState(true);
  const [showHeaderSettings, setShowHeaderSettings] = useState(true);
  const [showComponentSettings, setShowComponentSettings] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [columns, setColumns] = useState(3); // default 3 per line
  const [savedBlocks, setSavedBlocks] = useState([]);

  const saveBlockToLibrary = (block) => {
  setSavedBlocks((prev) => [...prev, block]);
  // Optional: Send to backend
  fetch("/api/save-block", {
    method: "POST",
    body: JSON.stringify({ block, userId }),
  });
};
  const getColumnClass = () => {
    switch (columns) {
      case 1:
        return "w-full";
      case 2:
        return "w-1/2";
      case 3:
      default:
        return "w-1/3";
    }
  };

  const platformIcons = {
    facebook: FaFacebook,
    instagram: FaInstagram,
    twitter: FaTwitter,
  };
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

  return (
    <section className="relative p-4 text-black">
      <div className="flex gap-4 mb-4">
        <button onClick={() => setViewMode("desktop")}>
          <FaDesktop />
        </button>
        <button onClick={() => setViewMode("tablet")}>
          <FaTabletAlt />
        </button>
        <button onClick={() => setViewMode("mobile")}>
          <FaMobileAlt />
        </button>
      </div>

      {/* Preview Container with View Modes */}
      <div
        className={`transition-all duration-300 border mx-auto rounded overflow-hidden ${
          viewMode === "mobile"
            ? "w-[375px]"
            : viewMode === "tablet"
            ? "w-[768px]"
            : " w-full"
        }`}
      >
        <header className="bg-blue-700 p-4 text-white ">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-2xl font-bold">{logo}</div>

            <nav className="flex gap-4 items-center">
              <div className="flex gap-2">
                {socialLinks.map((link, idx) => {
                  const Icon = {
                    facebook: FaFacebook,
                    instagram: FaInstagram,
                    twitter: FaTwitter,
                  }[link.platform];
                  return (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="text-white hover:text-blue-300" />
                    </a>
                  );
                })}
              </div>
            </nav>

            {/* Desktop Nav */}
            {viewMode === "desktop" && (
              <nav className="flex gap-4 ml-4">
                {menuItems.map((item, idx) => (
                  <a key={idx} href="#" className="hover:underline">
                    {item}
                  </a>
                ))}
              </nav>
            )}

            {/* Mobile Menu Button and Items */}
            {viewMode !== "desktop" && (
              <div className="ml-4 relative">
                <button onClick={() => setMobileMenuOpen((prev) => !prev)}>
                  <Menu className="w-6 h-6 text-white" />
                </button>

                {mobileMenuOpen && (
                  <div className="top-full left-0 right-0 bg-blue-700 text-white flex flex-col items-start p-4 z-50 shadow">
                    {menuItems.map((item, idx) => (
                      <a key={idx} href="#" className="py-2 hover:underline">
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        <div
          className="relative w-full bg-black/60 p-8 text-white flex flex-col items-center justify-center min-h-[300px]"
          style={{
            backgroundImage: bgImage ? `url(${bgImage})` : "none",
            backgroundSize: "cover", // or "cover"
            backgroundRepeat: "no-repeat", // prevents tiling
            backgroundPosition: "center",
          }}
        >
          <input
            type="text"
            value={siteTitle}
            onChange={(e) => setSiteTitle(e.target.value)}
            className="text-4xl font-bold bg-transparent outline-none w-full mb-2"
          />
          <textarea
            value={siteDescription}
            onChange={(e) => setSiteDescription(e.target.value)}
            className="w-full bg-transparent text-lg outline-none mb-4 resize-none"
          />
          <input
            type="text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md cursor-pointer text-white outline-none text-center"
          />
        </div>

        <div
          className={`mt-6 grid gap-4 ${
            viewMode === "mobile"
              ? "grid-cols-1"
              : viewMode === "tablet"
              ? "grid-cols-2"
              : "grid-cols-3"
          }`}
        >
          {" "}
          {components.map((component, index) => {
            if (component.type === "block") {
              return (
                <div
                  key={index}
                  className={` w-full ${
                    viewMode === "mobile"
                      ? "col-span-1"
                      : viewMode === "tablet"
                      ? "col-span-2"
                      : "col-span-3"
                  }`}
                >
                  <div className="p-4 border rounded-lg shadow-sm bg-white">
                      <Block
                        key={index}
                        content={component.content}
                        onUpdate={(newContent) => {
                          const updated = [...components];
                          updated[index].content = newContent;
                          setComponents(updated);
                        }}
                      />
                    </div>
                    <div className="flex justify-between gap-2 mt-2">
                      <button
                        onClick={() => {
                          const updated = [...components];
                          updated.splice(index, 1);
                          setComponents(updated);
                        }}
                        className="text-red-500"
                      >
                        ✕ Remove Block
                      </button>
                      <div>
                        <button
                          onClick={() => moveComponent(index, "up")}
                          className="text-sm px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => moveComponent(index, "down")}
                          className="text-sm px-3 py-1 bg-gray-300 rounded hover:bg-gray-400  "
                        >
                          ↓
                        </button>
                      </div>
                      
                  </div>
                </div>
              );
            }
            if (component.type === "form") {
              return (
                <div key={index} className="h-auto">
                  <div className="border p-4 bg-white rounded shadow text-black h-auto">
                    <h3 className="text-lg font-bold">
                      Custom Form {index + 1}
                    </h3>
                    <Form
                      fields={component.fields || []}
                      setFields={(updateFn) => {
                        setComponents((prev) =>
                          prev.map((c, i) =>
                            i === index && c.type === "form"
                              ? {
                                  ...c,
                                  fields:
                                    typeof updateFn === "function"
                                      ? updateFn(c.fields || [])
                                      : updateFn,
                                }
                              : c
                          )
                        );
                      }}
                      formIndex={index}
                    />
                    <div className="flex justify-between gap-2 mt-2">
                      <button
                        onClick={() => {
                          const updated = [...components];
                          updated.splice(index, 1);
                          setComponents(updated);
                        }}
                        className="text-red-500"
                      >
                        ✕ Remove Form
                      </button>
                      <div>
                        <button
                          onClick={() => moveComponent(index, "up")}
                          className="text-sm px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                        >
                          {" "}
                          &#x2190;
                        </button>
                        <button
                          onClick={() => moveComponent(index, "down")}
                          className="text-sm px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                        >
                          {" "}
                          &#x2192;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            if (component.type === "card") {
              return (
                <div key={index} className="">
                  <Card
                    data={component}
                    onUpdate={(updates) => {
                      const updated = [...components];
                      updated[index] = { ...updated[index], ...updates };
                      setComponents(updated);
                    }}
                  />
                    <div className="flex justify-between gap-2 mt-2">
                  <button
                    onClick={() => {
                      const updated = [...components];
                      updated.splice(index, 1);
                      setComponents(updated);
                    }}
                    className="text-red-500"
                  >
                    ✕ Remove Card
                  </button>
                  <div>
                  <button
                    className="text-sm px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={() => moveComponent(index, "up")}
                  >
                          &#x2190;
                  </button>
                  <button
                    className="text-sm px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={() => moveComponent(index, "down")}
                  >
                                              &#x2192;

                  </button>
                  </div>
                </div>
                </div>
              );
            }
            return null;
          })}
        </div>
        <button onClick={() => saveBlockToLibrary(component)}>
  💾 Save to Library
</button>
      </div>
    </section>
  );
}

export default Preview;
