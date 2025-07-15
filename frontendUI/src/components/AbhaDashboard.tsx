import React from "react";
import { useNavigate } from "react-router-dom";

export default function AbhaDashboard() {
  const navigate = useNavigate();

  const mockData = {
    name: "Ravi Kumar",
    abhaId: "ABHA1234XXXX",
    age: 42,
    gender: "Male",
    lastCheckup: "20 June 2024",
    healthHistory: [
      "20 Jan 2024 - BP: 150/90",
      "11 Dec 2023 - Fever: 101°F",
      "06 Oct 2023 - Normal"
    ],
    schemes: [
      "✅ PM-JAY Eligible",
      "⚠️ State Scheme Pending",
      "❌ Local CSR Scheme Not Available"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-2">Welcome, {mockData.name}</h1>
      <p className="text-lg text-gray-700 mb-6">
        ABHA ID: <strong>{mockData.abhaId}</strong> | Age: {mockData.age} | Gender: {mockData.gender}
      </p>

      {/* Checkup Summary */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">📊 Last Health Checkup</h2>
        <p className="text-gray-600 mb-4">Date: {mockData.lastCheckup}</p>
        <button
          onClick={() => alert("Checkup flow coming soon...")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Start New Checkup
        </button>
      </div>

      {/* Health History */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <h2 className="text-xl font-semibold text-green-700 mb-2">🗂️ Health History</h2>
        <ul className="list-disc pl-6 text-gray-700">
          {mockData.healthHistory.map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
        </ul>
      </div>

      {/* Government Schemes */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <h2 className="text-xl font-semibold text-purple-700 mb-2">🏥 Eligible Government Schemes</h2>
        <ul className="list-disc pl-6 text-gray-700">
          {mockData.schemes.map((scheme, i) => (
            <li key={i}>{scheme}</li>
          ))}
        </ul>
        <button
          onClick={() => navigate("/schemes")}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Apply for Scheme
        </button>
      </div>

      {/* ABHA Actions */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">⚙️ Other ABHA Actions</h2>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <button className="bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-800">🔗 Link Records</button>
          <button className="bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700">📄 View Reports</button>
        </div>
      </div>
    </div>
  );
}
