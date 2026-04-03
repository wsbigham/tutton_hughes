import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-midnight-blue text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Dealership Info */}
        <div>
          <h3 className="text-xl font-bold text-yellow-gold mb-4 uppercase">Tutton Hughes Auto Sales</h3>
          <p className="mb-2 text-gray-300">12940 US-27<br/>Summerville, GA 30747</p>
          <p className="mb-4 text-gray-300">
            <a href="tel:7068080110" className="hover:text-yellow-gold transition-colors">(706) 808-0110</a>
          </p>
          <p className="text-sm text-gray-400">
            Providing quality pre-owned vehicles and excellent service to Summerville and the surrounding communities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-yellow-gold mb-4 uppercase">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="text-gray-300 hover:text-yellow-gold transition-colors">Home</Link></li>
            <li><Link href="/inventory" className="text-gray-300 hover:text-yellow-gold transition-colors">Search Inventory</Link></li>
            <li><Link href="/financing" className="text-gray-300 hover:text-yellow-gold transition-colors">Financing Options</Link></li>
            <li><Link href="/contact" className="text-gray-300 hover:text-yellow-gold transition-colors">Contact Us & Location</Link></li>
          </ul>
        </div>

        {/* Business Hours */}
        <div>
          <h3 className="text-xl font-bold text-yellow-gold mb-4 uppercase">Business Hours</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex justify-between"><span>Mon - Fri:</span> <span>9:00 AM - 7:00 PM</span></li>
            <li className="flex justify-between"><span>Saturday:</span> <span>9:00 AM - 6:00 PM</span></li>
            <li className="flex justify-between"><span>Sunday:</span> <span>Closed</span></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Tutton Hughes Auto Sales LLC. All rights reserved.</p>
      </div>
    </footer>
  );
}
