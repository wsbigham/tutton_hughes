import Link from "next/link";

export default function FinancingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-midnight-blue uppercase mb-4">Financing Options</h1>
          <div className="w-24 h-1 bg-yellow-gold mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            At Tutton Hughes Auto Sales, we believe everyone deserves a reliable vehicle. We offer flexible financing solutions tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-midnight-blue mb-6">Easy Approval Process</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Our financing department is dedicated to getting you behind the wheel of your next vehicle. Whether you have excellent credit, are a first-time buyer, or are working to rebuild your credit, we have options for you.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 font-semibold text-midnight-blue">
                <div className="bg-yellow-gold p-1 rounded-full">
                  <svg className="w-5 h-5 text-midnight-blue" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                </div>
                Competitive Interest Rates
              </li>
              <li className="flex items-center gap-3 font-semibold text-midnight-blue">
                <div className="bg-yellow-gold p-1 rounded-full">
                  <svg className="w-5 h-5 text-midnight-blue" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                </div>
                Flexible Down Payment Options
              </li>
              <li className="flex items-center gap-3 font-semibold text-midnight-blue">
                <div className="bg-yellow-gold p-1 rounded-full">
                  <svg className="w-5 h-5 text-midnight-blue" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                </div>
                Fast Approval Decisions
              </li>
            </ul>
            <Link 
              href="/contact" 
              className="inline-block bg-midnight-blue text-white font-black px-10 py-4 rounded-lg shadow-lg hover:bg-opacity-90 transition-all uppercase tracking-widest"
            >
              Start Your Application
            </Link>
          </div>
          <div className="bg-midnight-blue p-12 rounded-2xl shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-gold opacity-10 transform translate-x-16 -translate-y-16 rotate-45"></div>
             <h3 className="text-2xl font-bold text-yellow-gold mb-6 uppercase">Documents Needed</h3>
             <p className="text-gray-300 mb-8">To speed up your approval, please have the following ready:</p>
             <ul className="space-y-4 text-white">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-yellow-gold rounded-full"></span>
                  Valid Driver&apos;s License
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-yellow-gold rounded-full"></span>
                  Recent Proof of Income (Pay Stubs)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-yellow-gold rounded-full"></span>
                  Proof of Residence (Utility Bill)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-yellow-gold rounded-full"></span>
                  Personal References
                </li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
