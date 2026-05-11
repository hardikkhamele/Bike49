import Link from 'next/link';
import Image from 'next/image';
import EMICalculator from '@/components/EMICalculator';
import ChallanForm from '@/components/ChallanForm';
import TrafficPoliceAnimation from '@/components/TrafficPoliceAnimation';
import CarUmbrellaAnimation from '@/components/CarUmbrellaAnimation';
import { Calculator, Lightbulb, MessageSquare, ShieldCheck, FileText, ArrowRight, Car, Key, Bike, IndianRupee } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0 bg-[#051b3d]">
          <div className="absolute inset-0 bg-[#051b3d]/50 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#051b3d] via-[#051b3d]/60 to-transparent z-10" />
          <Image 
            src="/hero_bikes_variety.png" 
            alt="Variety of Bikes"
            fill
            className="w-full h-full object-cover"
            priority
          />
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-8xl font-light text-white mb-6 tracking-tight drop-shadow-lg animate-fade-in-up leading-tight">
            SELL YOUR BIKE. <br/><span className="text-[#eef2f6]">INSTANTLY.</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#eef2f6] mb-12 drop-shadow-md font-light tracking-wide animate-fade-in-up delay-100 max-w-4xl mx-auto uppercase">
            Find Your Perfect Ride. Buy & Sell Bikes Without the Hassle — with Instant Payments.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-200">
            <Link href="/buy" className="group flex items-center justify-center gap-3 px-14 py-5 bg-[#ef6a22] text-white font-semibold uppercase tracking-widest text-sm md:text-base hover:bg-[#d95714] hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="flex items-center gap-2 group-hover:animate-bounce">
                <Bike size={22} />
                <Key size={14} className="text-white/80" />
              </div>
              Buy Now
            </Link>
            <Link href="/sell" className="group flex items-center justify-center gap-3 px-14 py-5 bg-transparent text-white font-semibold uppercase tracking-widest text-sm md:text-base border border-white hover:bg-white hover:text-[#051b3d] hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="flex items-center gap-1 group-hover:rotate-12 transition-transform">
                <Bike size={20} />
                <Key size={14} className="text-current opacity-80" />
                <IndianRupee size={18} className="text-current" />
              </div>
              Sell Now
            </Link>
          </div>
        </div>
      </section>

      {/* Motto Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 text-center animate-fade-in-up">
          <h2 className="text-base font-semibold text-gray-400 mb-8 uppercase tracking-widest">Our Philosophy</h2>
          <p className="text-3xl md:text-7xl text-[#051b3d] font-light leading-tight">
            Uncompromising quality. <br/> Direct transactions. <br/>
            <span className="font-medium text-[#ef6a22]">The future of mobility.</span>
          </p>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-32 bg-[#f4f5f7] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24 animate-fade-in-up">
            <h2 className="text-base font-semibold text-gray-400 mb-4 uppercase tracking-widest">Innovation</h2>
            <p className="text-4xl md:text-6xl font-light text-[#051b3d] max-w-2xl mx-auto tracking-tight">Driven by Intelligence.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* AI Price Estimator */}
            <div className="bg-white p-8 md:p-16 shadow-sm hover:shadow-md transition-all duration-500 group animate-fade-in-up delay-100">
              <div className="w-20 h-20 bg-[#f0f4f8] flex items-center justify-center mb-10 text-[#ef6a22]">
                <Calculator size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-medium text-[#051b3d] mb-6 uppercase tracking-widest">Price Estimator</h3>
              <p className="text-gray-500 mb-12 font-light text-xl leading-relaxed">Precision valuation driven by real-time market analytics.</p>
              <button className="text-[#ef6a22] font-semibold flex items-center text-base uppercase tracking-widest hover:text-[#d95714] transition-colors">
                Discover Value <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

            {/* AI Recommendation */}
            <div className="bg-white p-8 md:p-16 shadow-sm hover:shadow-md transition-all duration-500 group animate-fade-in-up delay-200">
              <div className="w-20 h-20 bg-[#f0f4f8] flex items-center justify-center mb-10 text-[#ef6a22]">
                <Lightbulb size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-medium text-[#051b3d] mb-6 uppercase tracking-widest">Smart Suggest</h3>
              <p className="text-gray-500 mb-12 font-light text-xl leading-relaxed">Tailored recommendations that match your exact specifications.</p>
              <button className="text-[#ef6a22] font-semibold flex items-center text-base uppercase tracking-widest hover:text-[#d95714] transition-colors">
                Find Yours <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

            {/* AI Chatbot */}
            <div className="bg-white p-8 md:p-16 shadow-sm hover:shadow-md transition-all duration-500 group animate-fade-in-up delay-300">
              <div className="w-20 h-20 bg-[#f0f4f8] flex items-center justify-center mb-10 text-[#ef6a22]">
                <MessageSquare size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-medium text-[#051b3d] mb-6 uppercase tracking-widest">24/7 Concierge</h3>
              <p className="text-gray-500 mb-12 font-light text-xl leading-relaxed">Always-on intelligence to guide you through every step.</p>
              <button className="text-[#ef6a22] font-semibold flex items-center text-base uppercase tracking-widest hover:text-[#d95714] transition-colors">
                Connect <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Utility Features Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24 animate-fade-in-up">
            <h2 className="text-base font-semibold text-gray-400 mb-4 uppercase tracking-widest">Services</h2>
            <p className="text-4xl md:text-6xl font-light text-[#051b3d] max-w-2xl mx-auto tracking-tight">Complete utility solutions.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-[#f4f5f7] p-6 md:p-14 animate-fade-in-up delay-100 flex flex-col shadow-sm">
              <h3 className="text-3xl font-medium text-[#051b3d] mb-6 flex items-center uppercase tracking-widest">
                <Calculator className="w-8 h-8 mr-4 text-[#ef6a22]" strokeWidth={1.5} />
                EMI Calculator
              </h3>
              <div className="flex-grow">
                <EMICalculator />
                <p className="text-sm text-gray-500 mt-4">Note: EMI estimates are indicative. Insurance starts from <strong>₹350 annually</strong>. Calculator includes calendar and currency icons.</p>
              </div>
            </div>

            {/* Insurance & Challan */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8 animate-fade-in-up delay-200">
              {/* Buy Insurance */}
              <div className="bg-[#051b3d] p-6 md:p-14 text-white flex flex-col justify-between overflow-hidden relative group shadow-sm">
                <div className="relative z-10 flex flex-col h-full">
                  <div>
                    <div className="w-20 h-20 border border-white/20 flex items-center justify-center mb-10 bg-white/5 group-hover:bg-[#ef6a22] transition-colors duration-500">
                      <ShieldCheck size={40} className="text-white" strokeWidth={1} />
                    </div>
                    <h3 className="text-4xl font-light mb-6 uppercase tracking-widest">Buy Insurance</h3>
                    <div className="mb-8 p-4 bg-[#ef6a22]/20 rounded-lg border border-[#ef6a22]/40">
                      <p className="text-blue-100 font-light text-lg leading-relaxed">Protect your ride with premium comprehensive plans.</p>
                      <p className="text-[#ef6a22] font-bold text-2xl mt-3">Starting from ₹350/year</p>
                    </div>
                    <p className="text-blue-100 mb-12 font-light text-base leading-relaxed">Also: <strong>Instant Loans</strong> available with <strong>Zero Processing Fees</strong>.</p>
                  </div>
                  <button className="w-full py-6 bg-[#ef6a22] text-white uppercase tracking-widest text-base font-semibold hover:bg-[#d95714] transition-colors mt-auto">
                    View Coverage
                  </button>
                </div>
                <CarUmbrellaAnimation />
              </div>

              {/* Pay Challan */}
              <div className="bg-[#f0f4f8] p-6 md:p-14 text-[#051b3d] flex flex-col justify-between overflow-hidden relative group shadow-sm">
                <div className="relative z-10 flex flex-col h-full">
                  <div>
                    <div className="w-20 h-20 border border-[#051b3d]/10 flex items-center justify-center mb-10 bg-white group-hover:border-[#ef6a22] transition-colors duration-500">
                      <FileText size={40} className="text-[#051b3d] group-hover:text-[#ef6a22] transition-colors duration-500" strokeWidth={1} />
                    </div>
                    <h3 className="text-4xl font-light mb-6 uppercase tracking-widest">Check Challan</h3>
                    <p className="text-gray-600 mb-6 font-light text-xl leading-relaxed">Secure and instant traffic fine settlements. Enter details below to verify and pay.</p>
                    <p className="text-sm text-gray-500 mb-6">We support A.Vehicle History Check and B.RTO Check.</p>
                  </div>
                  <div className="mt-auto">
                    <ChallanForm />
                  </div>
                </div>
                <TrafficPoliceAnimation />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
