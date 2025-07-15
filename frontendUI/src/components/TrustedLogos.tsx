import React from 'react';
import { Shield } from 'lucide-react';

// Import logos
import AyushmanLogo from '../assets/logos/ayushman-bharat.png';
import DigitalIndiaLogo from '../assets/logos/digital-india.png';
import IntelLogo from '../assets/logos/intel.jpg';

export default function TrustedLogos() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center justify-center gap-8 flex-wrap">
        {/* Ayushman Bharat */}
        <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-lg shadow-md">
          <img
            src={AyushmanLogo}
            alt="Ayushman Bharat"
            className="w-12 h-12 object-contain"
          />
          <span className="font-semibold text-blue-800 text-lg">Ayushman Bharat</span>
        </div>

        {/* Digital India */}
        <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-lg shadow-md">
          <img
            src={DigitalIndiaLogo}
            alt="Digital India"
            className="w-12 h-12 object-contain"
          />
          <span className="font-semibold text-green-800 text-lg">Digital India</span>
        </div>

        {/* Intel Inside */}
        <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-lg shadow-md">
          <img
            src={IntelLogo}
            alt="Intel Inside"
            className="w-12 h-12 object-contain"
          />
          <span className="font-semibold text-blue-800 text-lg">Intel Inside</span>
        </div>
      </div>

      {/* Powered by AI tagline — icon unchanged */}
      <div className="flex items-center gap-3 text-gray-600 mt-4">
        <Shield className="w-6 h-6 text-green-600" />
        <span className="text-lg font-medium">Powered by AI – Your Data Is Safe</span>
      </div>
    </div>
  );
}
