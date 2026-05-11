"use client";

import { useState, useEffect } from 'react';
import { Check, X, Trash2, Edit } from 'lucide-react';

export default function AdminPanel() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [pin, setPin] = useState('');

  useEffect(() => {
    if (localStorage.getItem('adminAuthBike49') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginId === 'admin@bike49' && pin === '7004') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthBike49', 'true');
    } else {
      alert('Invalid Username or PIN');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthBike49');
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/vehicles');
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setVehicles(data);
      } else {
        setError(data.error || "Failed to connect to the database. Make sure MongoDB is running.");
        setVehicles([]);
      }
    } catch (err) {
      console.error("Failed to fetch vehicles", err);
      setError("Network error. Could not connect to the API.");
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/vehicles/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchVehicles();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const deleteVehicle = async (id: string) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;
    try {
      await fetch(`/api/vehicles/${id}`, { method: 'DELETE' });
      fetchVehicles();
    } catch (err) {
      console.error("Failed to delete vehicle", err);
    }
  };

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '', price: '', type: 'Bike', year: '2023', driven: '', ownership: 'First', city: '', imageBase64: '',
    rc: '', variant: '', emission: 'BSVI', brand: '', model: ''
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageBase64: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditVehicle = (vehicle: any) => {
    setFormData({
      name: vehicle.name || '',
      price: vehicle.price?.toString() || '',
      type: vehicle.type || 'Bike',
      year: vehicle.year?.toString() || '2023',
      driven: vehicle.driven?.toString() || '',
      ownership: vehicle.ownership || 'First',
      city: vehicle.city || '',
      imageBase64: vehicle.image || '',
      rc: vehicle.rc || '',
      variant: vehicle.variant || '',
      emission: vehicle.emission || 'BSVI',
      brand: vehicle.brand || '',
      model: vehicle.model || ''
    });
    setEditId(vehicle._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload: any = {
        name: formData.name,
        price: Number(formData.price),
        type: formData.type,
        year: Number(formData.year),
        driven: Number(formData.driven),
        ownership: formData.ownership,
        city: formData.city,
        rc: formData.rc,
        variant: formData.variant,
        emission: formData.emission,
        brand: formData.brand,
        model: formData.model
      };

      // Only send image if it's base64 or a new one, else keep old URL if editing
      if (formData.imageBase64 && formData.imageBase64.startsWith('data:image')) {
        payload.image = formData.imageBase64;
      } else if (!editId) {
        payload.image = formData.imageBase64;
      }
      
      if (!editId) {
        payload.status = 'approved';
      }

      if (editId) {
        await fetch(`/api/vehicles/${editId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch('/api/vehicles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      
      setShowForm(false);
      setEditId(null);
      setFormData({ name: '', price: '', type: 'Bike', year: '2023', driven: '', ownership: 'First', city: '', imageBase64: '', rc: '', variant: '', emission: 'BSVI', brand: '', model: '' });
      fetchVehicles();
    } catch (err) {
      console.error("Failed to save vehicle", err);
      setLoading(false);
    }
  };
  
  const openModal = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setSelectedVehicle(null);
  };
  const buySectionVehicles = vehicles.filter(v => v.status === 'approved');
  
  const stats = {
    total: buySectionVehicles.length,
    types: {
      Bike: buySectionVehicles.filter(v => v.type === 'Bike').length,
      Scooter: buySectionVehicles.filter(v => v.type === 'Scooter').length,
      EV: buySectionVehicles.filter(v => v.type === 'EV' || v.type === 'Ev Bike').length,
    },
    cities: buySectionVehicles.reduce((acc, v) => {
      if (!v.city) return acc;
      acc[v.city] = (acc[v.city] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
          <div>
            <h2 className="mt-2 text-center text-3xl font-bold text-[#051b3d] uppercase tracking-widest">Admin Login</h2>
            <p className="mt-2 text-center text-sm text-gray-600">Please enter your credentials to access the dashboard</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 uppercase tracking-widest text-xs">Username</label>
                <input
                  type="text"
                  required
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#ef6a22] focus:border-[#ef6a22] sm:text-sm"
                  placeholder="Enter Username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 uppercase tracking-widest text-xs">PIN</label>
                <input
                  type="password"
                  required
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#ef6a22] focus:border-[#ef6a22] sm:text-sm"
                  placeholder="****"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded text-white bg-[#051b3d] hover:bg-[#0a2a5c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#051b3d] uppercase tracking-widest transition-colors"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <button onClick={handleLogout} className="text-xs text-red-600 hover:text-red-800 font-bold border border-red-200 px-3 py-1.5 rounded bg-red-50 uppercase tracking-widest transition-colors">Logout</button>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-[#ef6a22] text-white rounded font-medium hover:bg-[#d95714] transition"
          >
            {showForm ? "View Vehicles" : "Add Vehicle Manually"}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-lg text-center font-medium mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* Statistics Section */}
        {!showForm && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-wider">Live Vehicles by Type</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{stats.types.Bike}</p>
                  <p className="text-sm text-gray-500 font-medium uppercase mt-1">Bikes</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{stats.types.Scooter}</p>
                  <p className="text-sm text-gray-500 font-medium uppercase mt-1">Scooters</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{stats.types.EV}</p>
                  <p className="text-sm text-gray-500 font-medium uppercase mt-1">EVs</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-wider">Live Vehicles by City</h3>
              <div className="flex flex-wrap gap-3">
                {Object.entries(stats.cities).map(([city, count]) => (
                  <div key={city} className="bg-gray-50 border border-gray-100 px-4 py-2 rounded-full flex items-center gap-2">
                    <span className="font-medium text-gray-700">{city}</span>
                    <span className="bg-[#ef6a22] text-white text-xs font-bold px-2 py-0.5 rounded-full">{String(count)}</span>
                  </div>
                ))}
                {Object.keys(stats.cities).length === 0 && <p className="text-gray-500 text-sm">No live vehicles available.</p>}
              </div>
            </div>
          </div>
        )}

        {showForm ? (
          <div className="bg-white shadow-sm overflow-hidden border border-gray-200 p-8 rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{editId ? "Edit Vehicle" : "Add New Vehicle"}</h2>
              <button type="button" onClick={() => {setShowForm(false); setEditId(null); setFormData({ name: '', price: '', type: 'Bike', year: '2023', driven: '', ownership: 'First', city: '', imageBase64: '', rc: '', variant: '', emission: 'BSVI', brand: '', model: '' });}} className="text-gray-500 hover:text-gray-800">Cancel</button>
            </div>
            <form onSubmit={handleAddVehicle} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-[#ef6a22]" placeholder="e.g. Royal Enfield Classic 350" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                  <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-[#ef6a22]" placeholder="150000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-[#ef6a22]">
                    <option>Bike</option>
                    <option>Scooter</option>
                    <option>EV</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                  <input type="text" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-[#ef6a22]" placeholder="Honda" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                  <input type="text" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-[#ef6a22]" placeholder="Activa 6G" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Variant</label>
                  <input type="text" value={formData.variant} onChange={e => setFormData({...formData, variant: e.target.value})} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-[#ef6a22]" placeholder="Disc" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <input type="number" required value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-[#ef6a22]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">KM Driven</label>
                  <input type="number" required value={formData.driven} onChange={e => setFormData({...formData, driven: e.target.value})} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-[#ef6a22]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ownership</label>
                  <select value={formData.ownership} onChange={e => setFormData({...formData, ownership: e.target.value})} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-[#ef6a22]">
                    <option>First</option>
                    <option>Second</option>
                    <option>Third</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number (RC)</label>
                  <input type="text" value={formData.rc} onChange={e => setFormData({...formData, rc: e.target.value})} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-[#ef6a22]" placeholder="MH-31-AB-1234" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Emission</label>
                  <select value={formData.emission} onChange={e => setFormData({...formData, emission: e.target.value})} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-[#ef6a22]">
                    <option>BSVI</option>
                    <option>BSIV</option>
                    <option>BSIII</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input type="text" required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-[#ef6a22]" placeholder="e.g. Mumbai" />
                </div>
                <div className="lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Photo</label>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:border-[#ef6a22]" />
                  {formData.imageBase64 && <img src={formData.imageBase64} alt="Preview" className="mt-3 h-20 w-32 object-cover rounded" />}
                </div>
              </div>
              <button type="submit" disabled={loading} className="px-8 py-3 bg-[#051b3d] text-white rounded font-medium hover:bg-[#0a2a5c] transition disabled:opacity-50">
                {loading ? "Saving..." : (editId ? "Update Vehicle" : "Save Vehicle")}
              </button>
            </form>
          </div>
        ) : loading ? (
          <div className="text-center py-20">Loading vehicles...</div>
        ) : (
          <div className="bg-white shadow-sm overflow-hidden border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vehicles.map((v) => (
                  <tr key={v._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full object-cover" src={v.image} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{v.name}</div>
                          <div className="text-sm text-gray-500">{v.variant || "Standard"} • ₹{v.price}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{v.year} Model • {v.type}</div>
                      <div className="text-sm text-gray-500">{v.driven} km • {v.ownership} Owner</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        v.status === 'approved' ? 'bg-green-100 text-green-800' :
                        v.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {v.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        {v.status === 'pending' && (
                          <>
                            <button onClick={() => updateStatus(v._id, 'approved')} className="text-green-600 hover:text-green-900 p-1" title="Approve"><Check size={18} /></button>
                            <button onClick={() => updateStatus(v._id, 'rejected')} className="text-red-600 hover:text-red-900 p-1" title="Reject"><X size={18} /></button>
                          </>
                        )}
                        <button onClick={() => deleteVehicle(v._id)} className="text-gray-400 hover:text-red-600 p-1 ml-2" title="Delete"><Trash2 size={18} /></button>
                        <button onClick={() => handleEditVehicle(v)} className="text-blue-600 hover:text-blue-900 p-1 ml-2" title="Edit"><Edit size={18} /></button>
                        <button onClick={() => openModal(v)} className="text-[#ef6a22] hover:text-[#d95714] p-1 ml-2 font-medium" title="View Details">View</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {vehicles.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-gray-500">No vehicles found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
{showModal && selectedVehicle && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
      <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-gray-100 rounded-full p-2" onClick={closeModal}><X size={20}/></button>
      <h2 className="text-2xl font-bold mb-6 text-[#051b3d]">{selectedVehicle.name}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={selectedVehicle.image} alt="Vehicle" className="w-full h-64 object-cover rounded-lg shadow-sm mb-4" />
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-3 border-b pb-2 uppercase text-xs tracking-wider">Seller Information</h3>
            <p className="text-gray-700 mb-2"><span className="font-medium text-gray-500 mr-2">Name:</span> {selectedVehicle.userName || 'N/A'}</p>
            <p className="text-gray-700 mb-2"><span className="font-medium text-gray-500 mr-2">Phone:</span> {selectedVehicle.userMobile || 'N/A'}</p>
            <p className="text-gray-700 mb-2"><span className="font-medium text-gray-500 mr-2">Email:</span> {selectedVehicle.userEmail || 'N/A'}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <p className="text-blue-800 text-sm font-semibold uppercase tracking-wider mb-1">Expected Price</p>
            <p className="text-3xl font-bold text-blue-900">₹{selectedVehicle.price?.toLocaleString()}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded border border-gray-100">
              <span className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Type</span>
              <span className="font-medium text-gray-900">{selectedVehicle.type}</span>
            </div>
            <div className="bg-gray-50 p-3 rounded border border-gray-100">
              <span className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Year</span>
              <span className="font-medium text-gray-900">{selectedVehicle.year}</span>
            </div>
            <div className="bg-gray-50 p-3 rounded border border-gray-100">
              <span className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">KM Driven</span>
              <span className="font-medium text-gray-900">{selectedVehicle.driven} km</span>
            </div>
            <div className="bg-gray-50 p-3 rounded border border-gray-100">
              <span className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Ownership</span>
              <span className="font-medium text-gray-900">{selectedVehicle.ownership}</span>
            </div>
            <div className="bg-gray-50 p-3 rounded border border-gray-100">
              <span className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">City</span>
              <span className="font-medium text-gray-900">{selectedVehicle.city}</span>
            </div>
            <div className="bg-gray-50 p-3 rounded border border-gray-100">
              <span className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Status</span>
              <span className={`inline-block px-2 py-1 text-xs rounded-full font-bold uppercase tracking-wider ${
                selectedVehicle.status === 'approved' ? 'bg-green-200 text-green-800' : 
                selectedVehicle.status === 'rejected' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'
              }`}>{selectedVehicle.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
}
