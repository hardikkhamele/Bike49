"use client";

import { useState } from "react";
import { FileText } from 'lucide-react';

export default function ChallanForm() {
  const [challanNo, setChallanNo] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [dlNo, setDlNo] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaValue] = useState<string>(() => String(Math.floor(1000 + Math.random() * 9000)));
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ type: string; title: string; details: string } | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (captcha !== captchaValue) {
      setError("❌ Captcha is incorrect. Please try again.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/challan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challanNo, vehicleNo, dlNo }),
      });

      const data = await response.json();

      if (data.success) {
        setResult({
          type: "success",
          title: "✅ Challan Verified",
          details: `Amount: ₹${data.fineAmount} | Penalty: ${data.penaltyName} | Due: ${data.dueDate}`,
        });
        // Reset form
        setChallanNo("");
        setVehicleNo("");
        setDlNo("");
        setCaptcha("");
      } else {
        setError(`❌ ${data.message}`);
      }
    } catch (err) {
      console.log(err);
      setError("❌ Failed to verify challan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 bg-[#f0f4f8] rounded-md flex items-center justify-center text-[#ef6a22]">
          <FileText size={28} />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-[#051b3d]">Pay Challan</h4>
          <p className="text-sm text-gray-500">Fast and secure fine settlements</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
          {error}
        </div>
      )}

      {result?.type === "success" && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
          <div className="font-semibold">{result.title}</div>
          <div className="text-xs mt-1">{result.details}</div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        <label className="flex flex-col">
          <span className="text-xs uppercase tracking-widest text-gray-500">Challan Number</span>
          <input value={challanNo} onChange={(e) => setChallanNo(e.target.value)} placeholder="Enter Challan Number" disabled={isLoading} className="mt-2 p-3 border border-gray-200 rounded-md focus:outline-none disabled:bg-gray-100" />
        </label>

        <label className="flex flex-col">
          <span className="text-xs uppercase tracking-widest text-gray-500">Vehicle Number</span>
          <input value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} placeholder="MH12AB1234" disabled={isLoading} className="mt-2 p-3 border border-gray-200 rounded-md focus:outline-none disabled:bg-gray-100" />
        </label>

        <label className="flex flex-col">
          <span className="text-xs uppercase tracking-widest text-gray-500">DL Number</span>
          <input value={dlNo} onChange={(e) => setDlNo(e.target.value)} placeholder="DL-XXXXXXXX" disabled={isLoading} className="mt-2 p-3 border border-gray-200 rounded-md focus:outline-none disabled:bg-gray-100" />
        </label>

        <label className="flex flex-col">
          <span className="text-xs uppercase tracking-widest text-gray-500">Captcha</span>
          <div className="mt-2 flex items-center gap-3">
            <div className="bg-gray-100 px-4 py-2 rounded-md tracking-widest font-mono text-lg font-bold">{captchaValue}</div>
            <input value={captcha} onChange={(e) => setCaptcha(e.target.value)} placeholder="Enter Captcha" disabled={isLoading} className="flex-1 p-3 border border-gray-200 rounded-md focus:outline-none disabled:bg-gray-100" />
          </div>
        </label>

        <div className="mt-2">
          <button type="submit" disabled={isLoading} className="w-full py-4 bg-[#ef6a22] text-white font-semibold rounded-md flex items-center justify-center gap-3 hover:bg-[#d95714] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4l3 9 4-18 3 9h4" /></svg>
            <span className="flex items-center gap-2">{isLoading ? "Processing..." : "Pay Challan"} <span aria-hidden>🚦</span></span>
          </button>
        </div>
      </div>
    </form>
  );
}
