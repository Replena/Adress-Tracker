import React, { useState } from "react";
import axios from "axios";

export default function Form({ data, setData }) {
  const [input, setInput] = useState("");

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const includesLetters = (str) => {
    return /[a-zA-Z]/.test(str);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = includesLetters(input)
      ? `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${apiKey}&domain=${input}`
      : `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${apiKey}&ipAddress=${input}`;

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
    <>
      <div>Form</div>
    </>
  );
}
