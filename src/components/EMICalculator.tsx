"use client";

import { useState } from "react";
import { Calculator, IndianRupee, Calendar } from 'lucide-react';

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(10);
  const [tenure, setTenure] = useState(3);

  const monthlyRate = interestRate / 12 / 100;
  const numberOfMonths = tenure * 12;
  const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) / (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
  const totalAmount = emi * numberOfMonths;
  const totalInterest = totalAmount - loanAmount;

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-md mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-orange-500 p-3 rounded-2xl shadow-lg shadow-orange-200">
          <Calculator className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black text-gray-800 leading-tight">EMI Calculator</h3>
          <p className="text-xs text-gray-400 font-medium">Quick loan payment estimation</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-gray-400 tracking-widest mb-2 uppercase">LOAN AMOUNT (₹)</label>
            <input 
              type="number" 
              className="border-b-2 border-gray-100 py-2 outline-none focus:border-orange-500 text-lg font-bold text-gray-700 transition-colors"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-gray-400 tracking-widest mb-2 uppercase">INTEREST RATE (%)</label>
            <input 
              type="number" 
              className="border-b-2 border-gray-100 py-2 outline-none focus:border-orange-500 text-lg font-bold text-gray-700 transition-colors"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-gray-400 tracking-widest mb-2 uppercase">TENURE (YEARS)</label>
            <div className="flex items-center gap-2 border-b-2 border-gray-100 py-2">
              <Calendar size={16} className="text-blue-400" />
              <input 
                type="number" 
                className="w-full outline-none text-lg font-bold text-gray-700 bg-transparent"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-gray-400 tracking-widest mb-2 uppercase">START MONTH</label>
            <input 
              type="text" 
              readOnly
              className="border-b-2 border-gray-100 py-2 outline-none text-lg font-bold text-gray-700 bg-transparent"
              value="May, 2026"
            />
          </div>
        </div>

        <div className="bg-[#0a0f1e] rounded-2xl p-6 mt-8 shadow-xl shadow-blue-900/10 text-white">
          <div className="flex flex-col gap-4">
            <div className="border-b border-white/10 pb-4">
              <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">MONTHLY EMI</p>
              <div className="flex items-center text-orange-500">
                <IndianRupee size={22} strokeWidth={3} />
                <span className="text-3xl font-black tracking-tight">
                  {Math.round(emi).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <p className="text-[9px] font-bold text-gray-500 tracking-widest uppercase mb-1">TOTAL PAYABLE</p>
                <p className="text-blue-300 font-bold text-sm">₹{Math.round(totalAmount).toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-gray-500 tracking-widest uppercase mb-1">INTEREST PAID</p>
                <p className="text-yellow-400 font-bold text-sm">₹{Math.round(totalInterest).toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-[9px] text-gray-400 leading-relaxed italic">
          Note: EMI estimates are indicative. Insurance starts from ₹350 annually.
        </p>
      </div>
    </div>
  );
}