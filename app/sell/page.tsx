"use client";

import { useState } from "react";
import { User, ShieldCheck, ChevronRight, Calculator, FileText, ChevronLeft, CheckCircle2 } from "lucide-react";

export default function Sell() {
  const [step, setStep] = useState(1);
  const [isPredicting, setIsPredicting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1
    fullName: "",
    mobile: "",
    email: "",
    state: "",
    city: "",
    // Step 2
    vehicleType: "Bike",
    vehicleNumber: "",
    brand: "",
    model: "",
    variant: "",
    year: "",
    emission: "BSVI",
    kmDriven: "",
    rcFile: null as File | null,
    insuranceFile: null as File | null,
    vehicleImageBase64: "",
    price: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  
  // Add handler for vehicle image upload
  const handleVehicleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, vehicleImageBase64: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0]
      });
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePredictPrice = () => {
    if (!formData.brand || !formData.year) {
      alert("Please fill Brand and Year of Purchase first.");
      return;
    }
    
    setIsPredicting(true);
    setTimeout(() => {
      const base = parseInt(formData.year) > 2020 ? 80000 : 40000;
      const deduction = formData.kmDriven ? parseInt(formData.kmDriven) * 0.5 : 5000;
      const predictedPrice = Math.max(15000, base - deduction);
      
      setFormData(prev => ({ ...prev, price: Math.floor(predictedPrice).toString() }));
      setIsPredicting(false);
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      name: `${formData.brand} ${formData.model} ${formData.variant}`.trim(),
      variant: formData.variant,
      price: Number(formData.price),
      year: Number(formData.year),
      driven: Number(formData.kmDriven),
      rc: formData.vehicleNumber,
      ownership: "First",
      rto: formData.vehicleNumber.substring(0, 4) || "Unknown",
      city: formData.city,
      image: formData.vehicleImageBase64 || "https://placehold.co/800x600/051b3d/ef6a22?text=Pending+Approval",
      type: formData.vehicleType,
      emission: formData.emission,
      userName: formData.fullName,
      userEmail: formData.email,
      userMobile: formData.mobile
    };

    try {
      const res = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setStep(1);
          setFormData({
            fullName: "", mobile: "", email: "", state: "", city: "",
            vehicleType: "Bike", vehicleNumber: "", brand: "", model: "", variant: "", year: "", emission: "BSVI", kmDriven: "", rcFile: null, insuranceFile: null, vehicleImageBase64: "", price: "",
          });
        }, 4000);
      } else {
        alert("Failed to submit details.");
      }
    } catch(err) {
      console.error(err);
      alert("Error submitting details.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f5f7] flex flex-col items-center">
      
      {/* Header with Background */}
      <div className="relative w-full bg-[#051b3d] py-32 mb-12 overflow-hidden shadow-sm">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#051b3d]/70 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#051b3d] via-[#051b3d]/60 to-transparent z-10" />
          <img 
            src="/executive_customer_handshake.png" 
            alt="Executive Handshake" 
            className="w-full h-full object-cover grayscale"
          />
        </div>
        <div className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
          <h1 className="text-4xl md:text-7xl font-light text-white mb-6 uppercase tracking-widest drop-shadow-lg">Sell Your Ride</h1>
          <p className="text-sm text-[#eef2f6] uppercase tracking-widest font-medium">
            Get the best price for your vehicle in minutes
          </p>
        </div>
      </div>

      <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 pb-32">
        <div className="bg-white shadow-sm overflow-hidden">
          {submitted ? (
            <div className="p-12 text-center animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-[#f0f4f8] text-[#ef6a22] rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-4xl font-light text-[#051b3d] mb-4">Details Submitted Successfully!</h2>
              <p className="text-lg text-gray-600">Our evaluation team will contact you on {formData.mobile} shortly.</p>
            </div>
          ) : (
            <>
              {/* Step 1: Personal Details */}
              <div className={`transition-all duration-500 ${step === 1 ? "block" : "hidden"}`}>
                <div className="bg-[#f4f5f7] border-b border-gray-100 px-10 py-8 flex items-center gap-6">
                  <div className="w-10 h-10 bg-[#ef6a22] text-white flex items-center justify-center font-medium text-base">1</div>
                  <h2 className="text-lg font-medium text-[#051b3d] uppercase tracking-widest flex items-center gap-3"><User size={20} className="text-[#ef6a22]" /> Personal Details</h2>
                </div>
                
                <form onSubmit={handleNextStep} className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">Full Name</label>
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="ENTER YOUR FULL NAME" className="w-full bg-transparent border-b border-gray-300 px-0 py-4 text-[#051b3d] focus:border-[#ef6a22] outline-none transition-all uppercase text-base tracking-widest font-light placeholder-gray-300" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="YOU@EXAMPLE.COM" className="w-full bg-transparent border-b border-gray-300 px-0 py-4 text-[#051b3d] focus:border-[#ef6a22] outline-none transition-all uppercase text-base tracking-widest font-light placeholder-gray-300" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">Phone Number</label>
                      <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required placeholder="98XXXXXXXX" pattern="[0-9]{10}" className="w-full bg-transparent border-b border-gray-300 px-0 py-4 text-[#051b3d] focus:border-[#ef6a22] outline-none transition-all uppercase text-base tracking-widest font-light placeholder-gray-300" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">State</label>
                      <select name="state" value={formData.state} onChange={handleChange} required className="w-full bg-transparent border-b border-gray-300 px-0 py-4 text-[#051b3d] focus:border-[#ef6a22] outline-none transition-all uppercase text-base tracking-widest appearance-none font-light">
                        <option value="">SELECT STATE</option>
                        <option value="Maharashtra">MAHARASHTRA</option>
                        <option value="Madhya Pradesh">MADHYA PRADESH</option>
                        <option value="Chhattisgarh">CHHATTISGARH</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">City</label>
                      <select name="city" value={formData.city} onChange={handleChange} required className="w-full bg-transparent border-b border-gray-300 px-0 py-4 text-[#051b3d] focus:border-[#ef6a22] outline-none transition-all uppercase text-base tracking-widest appearance-none font-light">
                        <option value="">SELECT CITY</option>
                        <option value="Nagpur">NAGPUR</option>
                        <option value="Pune">PUNE</option>
                        <option value="Raipur">RAIPUR</option>
                        <option value="Indore">INDORE</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="pt-10 flex justify-end">
                    <button type="submit" className="px-12 py-5 bg-[#ef6a22] text-white font-semibold text-sm uppercase tracking-widest hover:bg-[#d95714] transition-all flex items-center gap-3">
                      Next Step <ChevronRight size={18} />
                    </button>
                  </div>
                </form>
              </div>

              {/* Step 2: Vehicle Details */}
              <div className={`transition-all duration-500 ${step === 2 ? "block" : "hidden"}`}>
                <div className="bg-[#f4f5f7] border-b border-gray-100 px-10 py-8 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-10 h-10 bg-[#ef6a22] text-white flex items-center justify-center font-medium text-base">2</div>
                    <h2 className="text-lg font-medium text-[#051b3d] uppercase tracking-widest flex items-center gap-3"><ShieldCheck size={20} className="text-[#ef6a22]" /> Vehicle Details</h2>
                  </div>
                  <button type="button" onClick={() => setStep(1)} className="text-gray-400 hover:text-[#051b3d] text-sm font-semibold uppercase tracking-widest transition-colors flex items-center gap-1">
                    <ChevronLeft size={16} /> Back
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Select Vehicle Type</label>
                    <div className="flex flex-wrap gap-4">
                      {["Bike", "EV", "Scooter"].map((type) => (
                        <label key={type} className={`cursor-pointer px-10 py-4 text-sm font-semibold uppercase tracking-widest ${formData.vehicleType === type ? "bg-[#ef6a22] border-[#ef6a22] text-white shadow-sm" : "bg-transparent border border-gray-300 text-gray-500 hover:border-[#051b3d] hover:text-[#051b3d]"} transition-all`}>
                          <input type="radio" name="vehicleType" value={type} checked={formData.vehicleType === type} onChange={handleChange} className="hidden" />
                          {type}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                    <div>
                      <label className="block text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">Vehicle Registration Number</label>
                      <input type="text" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} required placeholder="MH-31-AB-1234" className="w-full bg-transparent border-b border-gray-300 px-0 py-4 text-[#051b3d] focus:border-[#ef6a22] outline-none uppercase text-base tracking-widest transition-all font-light" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">Brand</label>
                      <select name="brand" value={formData.brand} onChange={handleChange} required className="w-full bg-transparent border-b border-gray-300 px-0 py-4 text-[#051b3d] focus:border-[#ef6a22] outline-none transition-all uppercase text-base tracking-widest appearance-none font-light">
                        <option value="">SELECT BRAND</option>
                        <option value="Honda">HONDA</option>
                        <option value="Hero">HERO</option>
                        <option value="Bajaj">BAJAJ</option>
                        <option value="Royal Enfield">ROYAL ENFIELD</option>
                        <option value="TVS">TVS</option>
                        <option value="Yamaha">YAMAHA</option>
                        <option value="Suzuki">SUZUKI</option>
                        <option value="KTM">KTM</option>
                        <option value="Jawa">JAWA</option>
                        <option value="Yezdi">YEZDI</option>
                        <option value="Triumph">TRIUMPH</option>
                        <option value="Harley-Davidson">HARLEY-DAVIDSON</option>
                        <option value="BMW">BMW</option>
                        <option value="Ducati">DUCATI</option>
                        <option value="Kawasaki">KAWASAKI</option>
                        <option value="Husqvarna">HUSQVARNA</option>
                        <option value="Aprilia">APRILIA</option>
                        <option value="Vespa">VESPA</option>
                        <option value="Ather">ATHER</option>
                        <option value="Ola">OLA</option>
                        <option value="Chetak">CHETAK</option>
                        <option value="Vida">VIDA</option>
                        <option value="Ampere">AMPERE</option>
                        <option value="Revolt">REVOLT</option>
                        <option value="Hero Electric">HERO ELECTRIC</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">Model</label>
                      <input type="text" name="model" value={formData.model} onChange={handleChange} required placeholder="e.g. CLASSIC 350" className="w-full bg-transparent border-b border-gray-300 px-0 py-4 text-[#051b3d] focus:border-[#ef6a22] outline-none uppercase text-base tracking-widest transition-all font-light" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">Variant</label>
                      <input type="text" name="variant" value={formData.variant} onChange={handleChange} placeholder="DISC / DRUM" className="w-full bg-transparent border-b border-gray-300 px-0 py-4 text-[#051b3d] focus:border-[#ef6a22] outline-none uppercase text-base tracking-widest transition-all font-light" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">Year of Purchase</label>
                      <select name="year" value={formData.year} onChange={handleChange} required className="w-full bg-transparent border-b border-gray-300 px-0 py-4 text-[#051b3d] focus:border-[#ef6a22] outline-none transition-all uppercase text-base tracking-widest appearance-none font-light">
                        <option value="">SELECT YEAR</option>
                        {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">Emission Standard</label>
                      <select name="emission" value={formData.emission} onChange={handleChange} required className="w-full bg-transparent border-b border-gray-300 px-0 py-4 text-[#051b3d] focus:border-[#ef6a22] outline-none transition-all uppercase text-base tracking-widest appearance-none font-light">
                        <option value="BSVI">BSVI</option>
                        <option value="BSIV">BSIV</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">KM Driven</label>
                      <input type="number" name="kmDriven" value={formData.kmDriven} onChange={handleChange} required placeholder="25000" className="w-full bg-transparent border-b border-gray-300 px-0 py-4 text-[#051b3d] focus:border-[#ef6a22] outline-none text-base tracking-widest transition-all font-light" />
                    </div>
                    
                    {/* File Uploads */}
                    <div className="bg-transparent p-6 border border-gray-200">
                      <label className="block text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Upload Registration Certificate (RC)</label>
                      <div className="flex items-center gap-4">
                        <label className="cursor-pointer px-6 py-3 border border-gray-300 hover:border-[#051b3d] hover:text-[#051b3d] text-gray-600 font-semibold text-sm uppercase tracking-widest transition-colors flex items-center gap-2">
                          <FileText size={16} /> Choose File
                          <input type="file" name="rcFile" onChange={handleFileChange} className="hidden" accept=".jpg,.png,.pdf" />
                        </label>
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-widest truncate max-w-[200px]">
                          {formData.rcFile ? formData.rcFile.name : "NO FILE"}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-transparent p-6 border border-gray-200">
                      <label className="block text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Upload Insurance</label>
                      <div className="flex items-center gap-4">
                        <label className="cursor-pointer px-6 py-3 border border-gray-300 hover:border-[#051b3d] hover:text-[#051b3d] text-gray-600 font-semibold text-sm uppercase tracking-widest transition-colors flex items-center gap-2">
                          <FileText size={16} /> Choose File
                          <input type="file" name="insuranceFile" onChange={handleFileChange} className="hidden" accept=".jpg,.png,.pdf" />
                        </label>
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-widest truncate max-w-[200px]">
                          {formData.insuranceFile ? formData.insuranceFile.name : "NO FILE"}
                        </span>
                      </div>
                    </div>

                    <div className="bg-transparent p-6 border border-gray-200">
                      <label className="block text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Upload Vehicle Image</label>
                      <div className="flex items-center gap-4">
                        <label className="cursor-pointer px-6 py-3 border border-gray-300 hover:border-[#051b3d] hover:text-[#051b3d] text-gray-600 font-semibold text-sm uppercase tracking-widest transition-colors flex items-center gap-2">
                          <FileText size={16} /> Choose File
                          <input type="file" accept="image/*" onChange={handleVehicleImageChange} className="hidden" />
                        </label>
                        {formData.vehicleImageBase64 && (
                          <img src={formData.vehicleImageBase64} alt="Preview" className="h-20 w-20 object-cover rounded" />
                        )}
                      </div>
                    </div>

                    {/* AI Price Predictor & Expected Price */}
                    <div className="md:col-span-2 bg-[#f0f4f8] p-10 relative overflow-hidden mt-6">
                      {isPredicting && (
                        <div className="absolute inset-0 bg-white/90 z-10 flex flex-col items-center justify-center">
                          <div className="w-8 h-8 border-2 border-[#ef6a22] border-t-transparent animate-spin mb-4"></div>
                          <p className="text-[#ef6a22] text-xs font-semibold uppercase tracking-widest animate-pulse">CALCULATING...</p>
                        </div>
                      )}
                      
                      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="flex-1">
                          <label className="block text-xs font-semibold text-[#051b3d] uppercase tracking-widest mb-4">Expected Price (₹)</label>
                          <div className="relative">
                            <span className="absolute left-0 top-3 text-[#051b3d] font-bold text-lg">₹</span>
                            <input 
                              type="number" 
                              name="price" 
                              value={formData.price} 
                              onChange={handleChange} 
                              required 
                              placeholder="50000" 
                              className="w-full bg-transparent border-b border-gray-300 pl-6 pr-4 py-2 text-[#051b3d] text-3xl font-light focus:outline-none focus:border-[#ef6a22] transition-all" 
                            />
                          </div>
                        </div>
                        
                        <button 
                          type="button" 
                          onClick={handlePredictPrice}
                          className="px-10 py-5 bg-white text-[#ef6a22] hover:bg-[#ef6a22] hover:text-white font-semibold text-sm uppercase tracking-widest transition-all flex items-center gap-3 shadow-sm"
                        >
                          <Calculator size={18} />
                          AI PREDICT
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-10 border-t border-gray-200">
                    <button type="submit" className="w-full py-5 bg-[#ef6a22] text-white font-semibold text-sm uppercase tracking-widest hover:bg-[#d95714] transition-all shadow-sm">
                      Submit Details
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

