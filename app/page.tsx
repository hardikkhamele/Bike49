export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900 p-6">
      <h1 className="text-5xl font-extrabold text-blue-600 mb-4">🚀 Bike49</h1>
      <p className="text-xl text-gray-600 mb-8">Buy & Sell Pre-owned Bikes Easily</p>

      <div className="flex gap-4">
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
          Buy a Bike
        </button>
        <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition">
          Sell Your Bike
        </button>
      </div>
    </main>
  );
}
