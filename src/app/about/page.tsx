export default function About() {
  return (
    <div className="min-h-screen bg-[#f4f5f7] flex flex-col items-center">
      {/* Header with Collage Background */}
      <div className="relative w-full bg-[#051b3d] py-40 overflow-hidden shadow-sm">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#051b3d]/70 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#051b3d] to-transparent z-10" />
          <img 
            src="/about_collage_riders.png" 
            alt="Diverse riders collage" 
            className="w-full h-full object-cover grayscale opacity-80"
          />
        </div>
        <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up pt-12">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-white mb-10 drop-shadow-lg leading-tight uppercase tracking-tight">
            From First Bikes to Dream Rides — <br />
            <span className="text-[#eef2f6]">Bike49 is for Everyone.</span>
          </h1>
          <div className="text-xl md:text-2xl text-[#eef2f6] font-light drop-shadow-md leading-relaxed max-w-3xl mx-auto tracking-wide">
            <p>From city streets to open highways, every ride has a story.</p>
            <p>At Bike49, we connect people with the bikes that fit their journey.</p>
            <p>Simple, transparent, and built on trust —</p>
            <p>because the right ride should be for everyone.</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-24 w-full">
        {/* Why we started */}
        <section className="bg-white shadow-sm p-12 md:p-16 relative overflow-hidden animate-fade-in-up delay-100 border border-transparent">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#ef6a22]" />
          <h2 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-widest">Our Story</h2>
          <h3 className="text-4xl font-light text-[#051b3d] mb-8">Why we started?</h3>
          <p className="text-xl text-gray-600 leading-relaxed font-light">
            We started Bike49 to solve the biggest problem in Nagpur, Pune, and Raipur: <span className="font-medium text-[#051b3d]">Trust</span>. 
            Buying a used bike usually means dealing with shady middlemen or hidden defects. We wanted to build a platform where students, gig workers, professionals, and locals can buy and sell vehicles transparently, without the hassle and anxiety of being cheated.
          </p>
        </section>

        {/* How it benefits you */}
        <section className="animate-fade-in-up delay-200">
          <h2 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-widest text-center">Benefits</h2>
          <h3 className="text-4xl font-light text-[#051b3d] mb-12 text-center">How it benefits you?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-sm p-10 border border-transparent hover:border-gray-200 transition-all duration-300 group">
              <div className="w-14 h-14 bg-[#f0f4f8] flex items-center justify-center mb-8 text-[#ef6a22]">
                <svg className="w-6 h-6 text-[#ef6a22]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-lg font-semibold text-[#051b3d] mb-4 uppercase tracking-widest">Zero Commission</h3>
              <p className="text-gray-500 font-light leading-relaxed">Direct connection between buyer and seller. Keep 100% of your money.</p>
            </div>

            <div className="bg-white shadow-sm p-10 border border-transparent hover:border-gray-200 transition-all duration-300 group">
              <div className="w-14 h-14 bg-[#f0f4f8] flex items-center justify-center mb-8 text-[#ef6a22]">
                <svg className="w-6 h-6 text-[#ef6a22]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-lg font-semibold text-[#051b3d] mb-4 uppercase tracking-widest">Verified Listings</h3>
              <p className="text-gray-500 font-light leading-relaxed">We check the details so you don&apos;t have to. Every vehicle is legally verified.</p>
            </div>

            <div className="bg-white shadow-sm p-10 border border-transparent hover:border-gray-200 transition-all duration-300 group">
              <div className="w-14 h-14 bg-[#f0f4f8] flex items-center justify-center mb-8 text-[#ef6a22]">
                <svg className="w-6 h-6 text-[#ef6a22]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-lg font-semibold text-[#051b3d] mb-4 uppercase tracking-widest">Instant Quotes</h3>
              <p className="text-gray-500 font-light leading-relaxed">Know the fair market value of your bike in seconds with our AI tools.</p>
            </div>
          </div>
        </section>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200">
        <div className="bg-gradient-to-r from-[#051b3d] to-[#0d2849] text-white p-10 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-center">Built by</h3>
          <p className="text-center text-lg font-semibold mb-6">Hardik Khamele</p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <a href="https://www.linkedin.com/in/hardik-khamele" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.833 0-9.749h3.554v1.381c.432-.666 1.204-1.615 2.923-1.615 2.135 0 3.735 1.395 3.735 4.393l-.001 5.59zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.71 0-.956.768-1.71 1.959-1.71 1.188 0 1.914.754 1.939 1.71 0 .952-.751 1.71-1.983 1.71zm1.581 11.597H3.757V9.354h3.161v11.098zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/hardikkhamele" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              <span>GitHub</span>
            </a>
            <a href="https://reddit.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.385 4.859-7.181 4.859-3.796 0-7.182-2.165-7.182-4.859a3.5 3.5 0 0 1 .476-1.843 1.749 1.749 0 0 1-1.032-1.587c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.53l.748-3.518 2.149.483c.041-.122.088-.231.151-.343.053-.106.087-.21.087-.314 0 .026 0 .051 0 .076.522-1.199 1.96-2.014 3.554-2.014.968 0 1.754.786 1.754 1.754s-.786 1.754-1.754 1.754c-.65 0-1.21-.366-1.508-.904-.218.028-.434.045-.651.045-1.792 0-3.456-.351-4.804-1.002-.714 1.095-1.853 1.943-3.224 1.943-.468 0-.91-.087-1.334-.258l-.412 1.769c1.219.383 2.501.577 3.832.577 1.046 0 2.063-.154 3.034-.424.commonMultiplicand 1.118.907 2.565.907 4.104 0 .674-.12 1.322-.353 1.926-2.023-.987-3.519-2.957-3.519-5.195 0-.828.15-1.62.43-2.345-.573 1.228-.914 2.586-.914 3.996 0 3.741 3.03 6.779 6.779 6.779s6.779-3.038 6.779-6.779c0-3.741-3.038-6.779-6.779-6.779zm-7.181 12.816c0 .596-.492 1.084-1.084 1.084-.596 0-1.084-.488-1.084-1.084 0-.596.488-1.084 1.084-1.084.592 0 1.084.488 1.084 1.084zm6.779 0c0 .596-.492 1.084-1.084 1.084-.596 0-1.084-.488-1.084-1.084 0-.596.488-1.084 1.084-1.084.592 0 1.084.488 1.084 1.084z"/></svg>
              <span>Reddit</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
