export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-950 pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We&apos;re here to help. Reach out to us for any queries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-8">
            <div className="bg-slate-900 rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Our Office</h2>
              <div className="flex items-start text-gray-300">
                <svg className="w-6 h-6 text-yellow-500 mr-4 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <p className="text-lg">
                  N.H. No. 06, Bhandara Road,<br />
                  Near Audi Showroom, Kapsi,<br />
                  Nagpur
                </p>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Phone & WhatsApp</h2>
              <div className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <svg className="w-6 h-6 text-blue-400 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <p className="text-lg">Call: 9823019260</p>
                </div>
                <div className="flex items-center text-gray-300">
                  <svg className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
                  <p className="text-lg">WhatsApp: 9371155111</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Email</h2>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-purple-400 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <a href="mailto:Khamele.Khamele@s.amity.edu" className="text-lg hover:text-white transition-colors">Khamele.Khamele@s.amity.edu</a>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-purple-400 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <a href="mailto:Hardikkhamele@gmail.com" className="text-lg hover:text-white transition-colors">Hardikkhamele@gmail.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-slate-900 rounded-2xl p-4 border border-white/10 h-[600px] lg:h-auto overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.52982230402!2d79.0881546!3d21.1610859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0a5a31faf13%3A0x19b37d06d0bb3e2b!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: "0.75rem" }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-slate-900 rounded-2xl p-8 border border-white/10 text-center text-gray-300">
          <p>This project is made by <strong>Hardik Khamele</strong></p>
          <div className="mt-3 flex justify-center gap-4">
            <a href="https://www.linkedin.com/in/hardik-khamele" className="text-blue-400">LinkedIn</a>
            <a href="https://github.com/hardikkhamele" className="text-gray-300">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  );
}
