"use client";

import { useState, useMemo } from "react";
import { Calculator, Calendar, IndianRupee, Plus } from 'lucide-react';

export default function EMICalculator() {
  const [amount, setAmount] = useState<number>(100000);
  const [interest, setInterest] = useState<number>(10);
  const [tenureYears, setTenureYears] = useState<number>(3);
  const [startMonth, setStartMonth] = useState<string>(new Date().toISOString().slice(0,7));

  const monthlyEMI = useMemo(() => {
    const principal = Number(amount) || 0;
    const monthlyRate = (Number(interest) || 0) / 100 / 12;
    const months = (Number(tenureYears) || 0) * 12;
    if (monthlyRate === 0 || months === 0) return 0;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  }, [amount, interest, tenureYears]);

  const totalPayable = useMemo(() => {
    return monthlyEMI * (Number(tenureYears) || 0) * 12;
  }, [monthlyEMI, tenureYears]);

  return (
    <div className="bg-gradient-to-br from-white to-[#f8fafc] p-10 rounded-2xl shadow-xl w-full border border-[#ef6a22]/10 hover:shadow-2xl transition-shadow duration-300">
      {/* Header with Icons */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-16 h-16 bg-gradient-to-br from-[#ef6a22] to-[#d95714] rounded-lg flex items-center justify-center text-white shadow-lg">
              <Calculator size={32} />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-[#051b3d]">EMI Calculator</h4>
              <p className="text-sm text-gray-500">Quick loan payment estimation</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-2xl">
          <span className="text-[#ef6a22]"><IndianRupee size={24} className="inline" /></span>
          <span className="text-blue-400"><Calendar size={24} className="inline" /></span>
          <span className="text-gray-400 animate-bounce"><Plus size={24} className="inline" /></span>
        </div>
      </div>

      {/* Input Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <label className="flex flex-col">
          <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">Loan Amount (₹)</span>
          <div className="flex items-center border-2 border-gray-200 rounded-lg focus-within:border-[#ef6a22] transition-colors">
            <IndianRupee size={18} className="text-[#ef6a22] ml-3" />
            <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="flex-1 p-3 bg-transparent text-xl font-semibold text-[#051b3d] focus:outline-none" />
          </div>
        </label>

        <label className="flex flex-col">
          <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">Interest Rate (%)</span>
          <div className="flex items-center border-2 border-gray-200 rounded-lg focus-within:border-[#ef6a22] transition-colors">
            <span className="text-gray-400 ml-3">%</span>
            <input type="number" value={interest} onChange={(e) => setInterest(Number(e.target.value))} className="flex-1 p-3 bg-transparent text-xl font-semibold text-[#051b3d] focus:outline-none" />
          </div>
        </label>

        <label className="flex flex-col">
          <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">Tenure (Years)</span>
          <div className="flex items-center border-2 border-gray-200 rounded-lg focus-within:border-[#ef6a22] transition-colors">
            <span className="text-gray-400 ml-3">📅</span>
            <input type="number" value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value))} className="flex-1 p-3 bg-transparent text-xl font-semibold text-[#051b3d] focus:outline-none" />
          </div>
        </label>

        <label className="flex flex-col">
          <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">Start Month</span>
          <input type="month" value={startMonth} onChange={(e) => setStartMonth(e.target.value)} className="p-3 border-2 border-gray-200 rounded-lg text-base font-semibold focus:outline-none focus:border-[#ef6a22] transition-colors" />
        </label>
      </div>

      {/* Results Section */}
      <div className="bg-gradient-to-r from-[#051b3d] to-[#0d2849] rounded-xl p-8 text-white">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="border-r border-white/20 pr-6">
            <div className="text-xs uppercase tracking-widest text-blue-200 mb-2 font-semibold">Monthly EMI</div>
            <div className="flex items-center gap-2">
              <IndianRupee size={20} className="text-[#ef6a22]" />
              <div className="text-4xl font-bold text-[#ef6a22] animate-pulse-slow">{monthlyEMI.toLocaleString()}</div>
            </div>
          </div>
          <div className="border-r border-white/20 pr-6">
            <div className="text-xs uppercase tracking-widest text-blue-200 mb-2 font-semibold">Total Amount</div>
            <div className="flex items-center gap-2">
              <IndianRupee size={20} className="text-blue-300" />
              <div className="text-3xl font-semibold text-blue-300">{totalPayable.toLocaleString('en-IN')}</div>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-blue-200 mb-2 font-semibold">Interest Paid</div>
            <div className="flex items-center gap-2">
              <IndianRupee size={20} className="text-yellow-300" />
              <div className="text-3xl font-semibold text-yellow-300">{(totalPayable - Number(amount)).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
