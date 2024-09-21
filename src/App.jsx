import React, { useState } from "react";
import Form from "./assets/components/Form.jsx";
import Map from "./assets/components/Map.jsx";

export default function App() {
  const [data, setData] = useState({
    ip: "Your IP",
    location: {
      lat: 41.0082,
      lng: 28.9784,
      city: "Istanbul",
      country: "Turkey",
      timezone: "+03:00",
    },
    isp: "Your ISP",
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-5">
      <Form data={data} setData={setData} />
      {data && (
        <div className="w-full md:w-4/5 mt-8">
          <Map
            lat={data.location?.lat}
            lng={data.location?.lng}
            city={data.location?.city}
            country={data.location?.country}
            isp={data.isp}
          />
        </div>
      )}
    </div>
  );
}
