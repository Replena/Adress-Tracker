import React, { useState } from "react";
import axios from "axios";

export default function Form({ data, setData }) {
  const [input, setInput] = useState("");

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const isValidDomain = (str) => {
    const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    return domainRegex.test(str);
  };

  const isValidIP = (str) => {
    const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){2}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(str);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiKey = import.meta.env.VITE_API_KEY;

    let url;
    if (isValidDomain(input)) {
      url = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${apiKey}&domain=${input}`;
    } else if (isValidIP(input)) {
      url = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${apiKey}&ipAddress=${input}`;
    } else {
      console.log("Invalid input. Please enter a valid IP address or domain.");
      return;
    }

    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error.response?.data?.messages);
      });

    setInput("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label
          htmlFor="ipAddress"
          className="text-2xl font-bold mb-4 text-center"
        >
          IP Address Tracker
        </label>
        <div className="flex items-center w-full">
          <input
            value={input}
            type="text"
            id="ipAddress"
            name="ipAddress"
            placeholder="Search for any IP address or domain"
            onChange={onChange}
            required
            className="p-2 border border-gray-300 rounded-lg w-full mr-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            ➤
          </button>
        </div>
      </form>
      {data && (
        <section className="mt-8 text-center">
          <div className="info-part">
            <p className="small-text text-gray-500">IP ADDRESS</p>
            <div className="bold-text text-xl font-semibold">{data.ip}</div>
          </div>
          <div className="info-part mt-4">
            <p className="small-text text-gray-500">LOCATION</p>
            <div className="bold-text text-xl font-semibold">
              {data.location?.city}, {data.location?.country}
            </div>
          </div>
          <div className="info-part mt-4">
            <p className="small-text text-gray-500">TIME ZONE</p>
            <div className="bold-text text-xl font-semibold">
              UTC {data.location?.timezone}
            </div>
          </div>
          <div className="info-part mt-4">
            <p className="small-text text-gray-500">ISP</p>
            <div className="bold-text text-xl font-semibold">{data.isp}</div>
          </div>
        </section>
      )}
    </div>
  );
}
