import React, { useState } from "react";
import Library from "./Library";
import Preview from "./Preview";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaDesktop,
  FaTabletAlt,
  FaMobileAlt,
} from "react-icons/fa";
function Editor() {
    const platformIcons = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  twitter: FaTwitter,
};


  const [siteTitle, setSiteTitle] = useState("Your Site Title");
  const [siteDescription, setSiteDescription] = useState(
    "A short site description."
  );
  const [buttonText, setButtonText] = useState("Click Me");
  const [bgImage, setBgImage] = useState(null);
  const [logo, setLogo] = useState("YourLogo");
  const [menuItems, setMenuItems] = useState([
    "Home",
    "About",
    "Services",
    "Contact",
  ]);
const [components, setComponents] = useState([]); // Start with no components

  const [fields, setFields] = useState([]);

  return (
    <div className="flex h-screen">
      {/* Sidebar Library */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-gray-100 p-4 overflow-y-auto">
        <Library
          siteTitle={siteTitle}
          setSiteTitle={setSiteTitle}
          siteDescription={siteDescription}
          setSiteDescription={setSiteDescription}
          buttonText={buttonText}
          setButtonText={setButtonText}
          bgImage={bgImage}
          setBgImage={setBgImage}
          logo={logo}
          setLogo={setLogo}
          menuItems={menuItems}
          setMenuItems={setMenuItems}
          components={components}
          setComponents={setComponents}
          fields={fields}
          setFields={setFields}
  
        />
      </div>

      {/* Preview Panel */}
      <div className="flex-1 overflow-y-auto bg-white">
        <Preview
  siteTitle={siteTitle}
  setSiteTitle={setSiteTitle}
  siteDescription={siteDescription}
  setSiteDescription={setSiteDescription}
  buttonText={buttonText}
  setButtonText={setButtonText}
  bgImage={bgImage}
  setBgImage={setBgImage}
  components={components}
  setComponents={setComponents}
  logo={logo}
  setLogo={setLogo}
  menuItems={menuItems}
  setMenuItems={setMenuItems}
  fields={fields}
  setFields={setFields}
/>
      </div>
    </div>
  );
}

export default Editor;