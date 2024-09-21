import React, { useState } from "react";
import Form from "./assets/components/Form.jsx";
import Map from "./assets/components/Map.jsx";

function App() {
  const [data, setData] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Form data={data} setData={setData} />
      {data && (
        <div className="w-full max-w-md mx-auto mt-8">
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

export default App;
