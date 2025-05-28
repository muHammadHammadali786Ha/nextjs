const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="ml-2 text-2xl font-bold text-white">CareerConnect</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Bridging the gap between talent and opportunity with cutting-edge job matching technology.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: 'facebook', color: 'text-blue-500' },
                { icon: 'twitter', color: 'text-sky-400' },
                { icon: 'instagram', color: 'text-pink-500' },
                { icon: 'linkedin', color: 'text-blue-600' },
                { icon: 'github', color: 'text-gray-300' }
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`${social.color} hover:text-white transition-colors duration-200`}
                  aria-label={social.icon}
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d={`M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z`}
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {['Home', 'Browse Jobs', 'Companies', 'Career Resources', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 inline-block py-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2">
              {['Resume Builder', 'Interview Tips', 'Career Guide', 'Salary Calculator', 'Blog', 'FAQ'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 inline-block py-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white tracking-wider">Stay Updated</h3>
            <p className="mt-4 text-gray-400">
              Get the latest job opportunities and career advice delivered to your inbox.
            </p>
            <form className="mt-4 space-y-3">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-blue-500 text-white placeholder-gray-500"
                  placeholder="Your email address"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Subscribe
                <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="md:flex md:items-center md:justify-between">
            <p className="text-center md:text-left text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} CareerConnect. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex justify-center md:justify-end space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;