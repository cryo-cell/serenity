import React from "react";
import { Link } from "react-router-dom";
import Editor from "./Editor";
import BookingForm from "./BookingForm";
import HomePage from "./HomePage";
import PricingTable from "./ui/PricingTable";
import editorDemo1 from "../assets/editor_demo_3.gif";
import ConsultationMap from "./ConsultationMap";
import { useState } from "react";
function Home() {
  const [locationData, setLocationData] = useState({
    eligible: null,
    address: "",
    lat: null,
    lon: null,
  });
  <Link to="/Editor">Editor</Link>;

  return (
    <div className="bg-wb mx-auto text-center">

      <header className=" text-blk">
        <div className="container mx-auto text-center bg-wb">
          <h1 className="text-3xl font-bold text-bb">Website Plan Overview</h1>
           
        </div>
        
      </header>

      <main className="container mx-auto bg-wb">
        <div className="bg-wb rounded-lg shadow-md p-6 mb-6 mt-3">
                        <PricingTable/>
                      </div>
        <div className="bg-wb rounded-lg shadow-md p-6 mb-6 mt-6">
                      
          
          <section className=" flex flex-col md:flex-row gap-6 min-h-[500px]">
            
          <div className="flex-1 px-4 bg-wb">
            <h1 className="text-2xl font-bold mb-4 text-center text-bb ">
              Request Consultation
            </h1>
            <p className="text-center text-sm text-bb mb-2">
              $25/HR. Available within a 20-mile radius. Book below:
            </p>
            <ConsultationMap onLocationSelected={setLocationData} />

            {/* Dynamic messages */}
            {locationData.eligible === null && (
              <p className="text-wb text-center mt-4">
                📍 Please enter your address to check service availability.
              </p>
            )}
            {locationData.eligible === false && (
              <p className="text-red-600 text-center mt-4">
                ❌ You're outside the consultation area.
              </p>
            )}
            
          </div>
            
          <div className="flex-1 px-4 my-auto ">
            {locationData.eligible && (
              <BookingForm
                address={locationData.address}
                lat={locationData.lat}
                lon={locationData.lon}
              />
            )}
          </div>
        </section>
          
        </div>{" "}
        <div className="bg-gradient-to-b from-bbm via-bbm to-bb p-4 rounded-lg shadow-md rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-wb text-center">
            Visual Editor & Live Demo
          </h2>

          <p className="mt-4 text-wb text-center">
            Our editor allows you to customize your site easily without touching
            code. See how it works below and try the{" "}
            <Link to="/editor" className="text-wb underline">
              live demo
            </Link>
            .
          </p>

          {/* Demo GIFs (replace src with real gifs later) */}
          <div className="flex flex-wrap justify-center mt-6 gap-4 bg-wb">
            <img
              src={editorDemo1}
              alt="Editor Demo 1"
              className="w-full sm:w-1/2 rounded-md shadow-md"
            />
            {/*<img
              src="/demo2.gif"
              alt="Editor Demo 2"
              className="w-full sm:w-1/2 rounded-md shadow-md"
            />*/}
          </div>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Pages Card */}
          <div className="bg-gradient-to-b from-bbm via-bbm to-bb p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-wb">Up to 5 Pages</h2>
            <p className="mt-2 text-sm text-wb">
              You can include up to 5 pages, perfect for small businesses or
              personal projects.
            </p>
          </div>

          {/* Components Card */}
          <div className="bg-gradient-to-b from-bbm via-bbm to-bb p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-wb">
              6-10 Reusable Components
            </h2>
            <p className="mt-2 text-sm text-wb">
              Choose from various reusable components to build your pages:
              headers, footers, etc.
            </p>
          </div>

          {/* Forms Card */}
          <div className="bg-gradient-to-b from-bbm via-bbm to-bb p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-wb">Basic Form</h2>
            <p className="mt-2 text-sm text-wb">
              1 simple form (Contact or Inquiry), with restrictions on form
              complexity to keep things efficient.
            </p>
          </div>

          {/* Image Uploads Card */}
          <div className="bg-gradient-to-b from-bbm via-bbm to-bb p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-wb">Image Uploads</h2>
            <p className="mt-2 text-sm text-wb">
              You can upload images up to 2MB each, ensuring quick load times
              and proper performance.
            </p>
          </div>

          {/* Hosting Cost Considerations Card */}
          <div className="bg-gradient-to-b from-bbm via-bbm to-bb p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-wb">Hosting Options</h2>
            <p className="mt-2 text-sm text-wb">
              Optional VPS upgrades available based on need.
            </p>
          </div>

          {/* Feature Limits Card */}
          <div className="bg-gradient-to-b from-bbm via-bbm to-bb p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-wb">Feature Limits</h2>
            <p className="mt-2 text-sm text-wb">
              Light animations and basic SEO/analytics are included. More
              advanced features can be added for a small fee.
            </p>
          </div>
        </section>
        {/* Editor Demo + Booking Section */}
        
              <HomePage />

      </main>

      <footer className="bg-wb text-bb p-4 text-center">
        <p>&copy; 2025 Website Plans | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default Home;
