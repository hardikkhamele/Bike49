import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-white/10 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black italic tracking-tighter">
                <span className="text-white">BIKE</span>
                <span className="text-yellow-500">49</span>
              </span>
            </Link>
            <p className="mt-2 text-sm text-gray-400">Buy and Sell your bike hassle free.</p>
          </div>
          
          <div className="flex space-x-6">
            <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
            <Link href="/buy" className="text-gray-400 hover:text-white transition-colors">Browse Bikes</Link>
          </div>
        </div>
        
        <div className="mt-8 border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Bike49. All rights reserved. — Built by Hardik Khamele
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400 font-semibold">Follow Us:</span>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:bg-slate-700 hover:text-white transition-all" title="X">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.694-5.829 6.694h-3.308l7.725-8.835L.424 2.25h6.679l4.882 6.268 5.259-6.268zM17.15 20.005h1.646L5.657 3.916H3.933l13.217 16.089z"/></svg>
              </a>
              <a href="https://truthsocial.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:bg-slate-700 hover:text-white transition-all" title="Truth Social">
                <span className="text-lg">T</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:bg-slate-700 hover:text-white transition-all" title="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 7.313c.057.86.057 5.514 0 6.374-.171 2.542-1.599 3.97-4.141 4.141-.86.057-5.514.057-6.374 0-2.542-.171-3.97-1.599-4.141-4.141-.057-.86-.057-5.514 0-6.374.171-2.542 1.599-3.97 4.141-4.141.86-.057 5.514-.057 6.374 0 2.542.171 3.97 1.599 4.141 4.141z"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:bg-slate-700 hover:text-white transition-all" title="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:bg-slate-700 hover:text-white transition-all" title="YouTube">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}