"use client";

import { useState, useMemo, useEffect } from "react";
import { Filter, Star, ShieldCheck, MapPin } from "lucide-react";
import { bikes as staticBikes } from "@/data/bikes";

export default function Buy() {
  const [dbBikes, setDbBikes] = useState<any[]>([]);
  const [selectedBike, setSelectedBike] = useState<any>(null);
  
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const res = await fetch('/api/vehicles?status=approved');
        const data = await res.json();
        if (Array.isArray(data)) {
          setDbBikes(data);
        }
      } catch (err) {
        console.error("Failed to fetch vehicles from DB", err);
      }
    };
    fetchBikes();
  }, []);

  const [filters, setFilters] = useState({
    city: "All",
    ownership: "All",
    year: "All",
    type: "All",
  });
  const [sort, setSort] = useState("newest");
  const [priceRange, setPriceRange] = useState(300000);

  const filteredAndSortedBikes = useMemo(() => {
    const allBikes = [...staticBikes, ...dbBikes.map(b => ({ ...b, id: b._id }))];
    const result = allBikes.filter((bike) => {
      if (filters.city !== "All" && bike.city !== filters.city) return false;
      if (filters.ownership !== "All" && bike.ownership !== filters.ownership) return false;
      if (filters.year !== "All" && bike.year.toString() !== filters.year) return false;
      if (filters.type !== "All" && bike.type !== filters.type) return false;
      if (bike.price > priceRange) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
      default:
        result.sort((a, b) => b.year - a.year);
        break;
    }

    return result;
  }, [filters, sort, priceRange, dbBikes]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#f4f5f7]">
      {/* Header */}
      <div className="relative bg-[#051b3d] py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#051b3d]/70 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#051b3d] via-[#051b3d]/80 to-transparent z-10" />
          <img 
            src="/executive_customer_handshake.png" 
            alt="Happy Customer" 
            className="w-full h-full object-cover grayscale"
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
          <h1 className="text-5xl md:text-7xl font-light text-white mb-6 uppercase tracking-tight drop-shadow-lg">OUR WIDE RANGES FOR YOU</h1>
          <p className="text-[#eef2f6] text-base uppercase tracking-widest font-medium">Browse through our verified collection of two-wheelers.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0 animate-fade-in-up delay-100">
          <div className="bg-white p-8 shadow-sm sticky top-24">
            <h2 className="text-base font-medium text-[#051b3d] mb-8 flex items-center uppercase tracking-widest">
              <Filter className="w-5 h-5 mr-3 text-[#ef6a22]" /> Filters
            </h2>

            <div className="space-y-8">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Max Price: ₹{priceRange.toLocaleString()}</label>
                <input 
                  type="range" 
                  min="10000" 
                  max="300000" 
                  step="10000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#ef6a22]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">City</label>
                <select name="city" onChange={handleFilterChange} className="w-full bg-transparent border-b border-gray-300 rounded-none px-0 py-2.5 text-[#051b3d] focus:outline-none focus:border-[#ef6a22] text-sm transition-all uppercase tracking-wider font-medium">
                  <option value="All">All Cities</option>
                  <option value="Nagpur">Nagpur</option>
                  <option value="Pune">Pune</option>
                  <option value="Raipur">Raipur</option>
                  <option value="Indore">Indore</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Ownership</label>
                <select name="ownership" onChange={handleFilterChange} className="w-full bg-transparent border-b border-gray-300 rounded-none px-0 py-2.5 text-[#051b3d] focus:outline-none focus:border-[#ef6a22] text-sm transition-all uppercase tracking-wider font-medium">
                  <option value="All">Any Ownership</option>
                  <option value="First">First Owner</option>
                  <option value="Second">Second Owner</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Year</label>
                <select name="year" onChange={handleFilterChange} className="w-full bg-transparent border-b border-gray-300 rounded-none px-0 py-2.5 text-[#051b3d] focus:outline-none focus:border-[#ef6a22] text-sm transition-all uppercase tracking-wider font-medium">
                  <option value="All">Any Year</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Type</label>
                <select name="type" onChange={handleFilterChange} className="w-full bg-transparent border-b border-gray-300 rounded-none px-0 py-2.5 text-[#051b3d] focus:outline-none focus:border-[#ef6a22] text-sm transition-all uppercase tracking-wider font-medium">
                  <option value="All">All Types</option>
                  <option value="Bike">Bike</option>
                  <option value="Scooter">Scooter</option>
                  <option value="EV">EV</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 animate-fade-in-up delay-200">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
            <p className="text-gray-500 font-semibold uppercase tracking-widest text-sm"><span className="text-[#ef6a22] font-bold">{filteredAndSortedBikes.length}</span> VEHICLES</p>
            <div className="flex items-center">
              <span className="text-sm font-semibold text-gray-500 mr-3 uppercase tracking-widest">Sort:</span>
              <select 
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-transparent border-b border-gray-300 rounded-none px-2 py-2 text-[#051b3d] focus:outline-none focus:border-[#ef6a22] text-sm uppercase tracking-widest font-semibold transition-all"
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price Low-High</option>
                <option value="price-desc">Price High-Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredAndSortedBikes.map(bike => (
              <div key={bike.id} className="bg-white shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col border border-transparent hover:border-gray-200">
                <div className="relative h-56 overflow-hidden">
                  <img src={bike.image} alt={bike.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {bike.verified !== false && <span className="bg-white text-[#051b3d] text-[10px] flex items-center gap-1 uppercase tracking-widest font-bold px-3 py-1 shadow-sm"><ShieldCheck size={12}/> Verified</span>}
                    {bike.year >= 2022 && <span className="bg-[#ef6a22] text-white flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold px-3 py-1 shadow-sm"><Star size={12}/> Best Deal</span>}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-medium text-[#051b3d] mb-2 line-clamp-1 uppercase tracking-wide">{bike.name}</h3>
                  <p className="text-3xl font-light text-[#ef6a22] mb-6">₹{bike.price.toLocaleString()}</p>
                  
                  <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-xs text-gray-500 mb-8 flex-1 font-medium uppercase tracking-widest">
                    <div className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2"></span>{bike.year} Model</div>
                    <div className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2"></span>{bike.driven.toLocaleString()} km</div>
                    <div className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2"></span>{bike.ownership} Owner</div>
                    <div className="flex items-center"><MapPin size={12} className="mr-1 text-gray-400" />{bike.city}</div>
                    <div className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2"></span>{bike.type}</div>
                    {bike.emission && <div className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2"></span>{bike.emission}</div>}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-auto">
                    <button onClick={() => setSelectedBike(bike)} className="py-3 px-4 border border-gray-300 hover:border-[#051b3d] text-[#051b3d] font-semibold text-xs uppercase tracking-widest transition-colors text-center">View</button>
                    <a href={`https://wa.me/?text=${encodeURIComponent("Hey! I'm interested to buy your Two Wheeler")}`} target="_blank" rel="noopener noreferrer" className="py-3 px-4 bg-[#ef6a22] hover:bg-[#d95714] text-white font-semibold text-xs uppercase tracking-widest transition-colors text-center block">Contact</a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAndSortedBikes.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <h3 className="text-xl font-medium text-[#051b3d] mb-2">No bikes found</h3>
              <p className="text-gray-500">Try adjusting your filters to see more results.</p>
              <button 
                onClick={() => {setFilters({city:"All", ownership:"All", year:"All", type:"All"}); setPriceRange(300000);}}
                className="mt-6 px-8 py-3 bg-[#ef6a22] text-white font-semibold uppercase tracking-widest text-xs transition-colors hover:bg-[#d95714]"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Bike Details */}
      {selectedBike && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setSelectedBike(null)}>
          <button 
            onClick={() => setSelectedBike(null)}
            className="fixed top-4 right-4 md:top-8 md:right-8 bg-[#ef6a22] text-white rounded-full p-3 hover:bg-[#d95714] transition-all z-[110] shadow-2xl hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative rounded-xl mt-12 md:mt-0" onClick={e => e.stopPropagation()}>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 relative bg-gray-100 min-h-[300px] md:min-h-full">
                <img src={selectedBike.image} alt={selectedBike.name} className="w-full h-full object-cover absolute inset-0" />
              </div>
              <div className="md:w-1/2 p-8">
                <h2 className="text-3xl font-light text-[#051b3d] mb-2 uppercase tracking-wider">{selectedBike.name}</h2>
                <p className="text-4xl font-light text-[#ef6a22] mb-6">₹{selectedBike.price.toLocaleString()}</p>
                
                <div className="space-y-4 text-sm font-medium text-gray-600 uppercase tracking-widest">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-400">Brand</span>
                    <span className="text-[#051b3d]">{selectedBike.brand || selectedBike.name.split(' ')[0]}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-400">Year</span>
                    <span className="text-[#051b3d]">{selectedBike.year}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-400">Driven</span>
                    <span className="text-[#051b3d]">{selectedBike.driven?.toLocaleString() || 0} km</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-400">Ownership</span>
                    <span className="text-[#051b3d]">{selectedBike.ownership} Owner</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-400">Location</span>
                    <span className="text-[#051b3d]">{selectedBike.city}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-400">Type</span>
                    <span className="text-[#051b3d]">{selectedBike.type}</span>
                  </div>
                  {selectedBike.emission && (
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-400">Emission</span>
                      <span className="text-[#051b3d]">{selectedBike.emission}</span>
                    </div>
                  )}
                  {selectedBike.variant && (
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-400">Variant</span>
                      <span className="text-[#051b3d]">{selectedBike.variant}</span>
                    </div>
                  )}
                </div>
                
                <a href={`https://wa.me/?text=${encodeURIComponent(`Hey! I'm interested to buy your ${selectedBike.name}`)}`} target="_blank" rel="noopener noreferrer" className="mt-8 py-4 bg-[#ef6a22] hover:bg-[#d95714] text-white font-semibold text-sm uppercase tracking-widest transition-colors text-center block w-full shadow-md">
                  Contact Seller
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
