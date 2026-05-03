"use client";

import { useState, useEffect } from "react";
import { IndianRupee, FileText } from 'lucide-react';

export default function ChallanForm() {
  const [vehicleNo, setVehicleNo] = useState("");
  const [challanNo, setChallanNo] = useState("");
  const [dlNo, setDlNo] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");

  useEffect(() => {
    setCaptchaValue(String(Math.floor(1000 + Math.random() * 9000)));
  }, []);

  return (
    <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 max-w-lg mx-auto text-gray-800">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col">
          <label className="text-[11px] font-bold text-gray-500 tracking-widest mb-3 uppercase">VEHICLE NUMBER</label>
          <input type="text" placeholder="MH12AB1234" className="border-b border-gray-200 py-3 outline-none focus:border-orange-500 transition-colors" value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} />
        </div>
        <div className="flex flex-col">
          <label className="text-[11px] font-bold text-gray-500 tracking-widest mb-3 uppercase">CHALLAN NUMBER</label>
          <input type="text" placeholder="Enter Challan Number" className="border-b border-gray-200 py-3 outline-none focus:border-orange-500 transition-colors" value={challanNo} onChange={(e) => setChallanNo(e.target.value)} />
        </div>
        <div className="flex flex-col">
          <label className="text-[11px] font-bold text-gray-500 tracking-widest mb-3 uppercase">DL NUMBER</label>
          <input type="text" placeholder="DL-XXXXXXXXXX" className="border-b border-gray-200 py-3 outline-none focus:border-orange-500 transition-colors" value={dlNo} onChange={(e) => setDlNo(e.target.value)} />
        </div>
        <div className="flex flex-col">
          <label className="text-[11px] font-bold text-gray-500 tracking-widest mb-3 uppercase">CAPTCHA</label>
          <div className="flex items-center gap-8">
            <span className="text-2xl font-black italic tracking-[0.2em] text-gray-800">{captchaValue || "...."}</span>
            <input type="text" placeholder="Enter Captcha" className="flex-grow border-b border-gray-200 py-2 outline-none focus:border-orange-500 transition-colors" value={captcha} onChange={(e) => setCaptcha(e.target.value)} />
          </div>
        </div>
        <button className="w-full bg-[#ef6a22] text-white py-5 rounded-xl font-bold flex items-center justify-between px-8 hover:bg-[#d45a1d] transition-all shadow-lg mt-4">
          <div className="flex items-center gap-3"><IndianRupee size={20} /><span className="text-lg">Pay Challan</span></div>
          <div className="flex gap-1 bg-black/20 p-1.5 rounded-md">
            <div className="h-2 w-2 rounded-full bg-red-900/40"></div>
            <div className="h-2 w-2 rounded-full bg-yellow-900/40"></div>
            <div className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]"></div>
          </div>
        </button>
      </div>
    </div>
  );
}