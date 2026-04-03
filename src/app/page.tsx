"use client";

import Link from "next/link";
import { useVehicles } from "@/hooks/useVehicles";

export default function Home() {
  const { vehicles, loading } = useVehicles();
  const featuredVehicles = vehicles.filter(v => v.featured).slice(0, 3);
  const displayVehicles = featuredVehicles.length > 0 ? featuredVehicles : vehicles.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-midnight-blue text-white overflow-hidden">
        {/* Abstract background shape for visual appeal */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-yellow-gold transform skew-x-12"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Find Your Perfect <span className="text-yellow-gold">Pre-Owned Vehicle</span> Today
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl">
              Quality cars, transparent pricing, and exceptional customer service right here in Summerville, GA. Explore our latest inventory and drive home happy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/inventory" 
                className="bg-yellow-gold text-midnight-blue hover:bg-gold-hover px-8 py-4 rounded-md font-bold text-lg text-center transition-colors shadow-lg"
              >
                Browse Inventory
              </Link>
              <Link 
                href="/financing" 
                className="bg-transparent border-2 border-white hover:border-yellow-gold hover:text-yellow-gold px-8 py-4 rounded-md font-bold text-lg text-center transition-colors"
              >
                Get Prequalified
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Vehicles</h2>
              <p className="text-gray-600">Check out our top picks for the week.</p>
            </div>
            <Link href="/inventory" className="text-midnight-blue hover:text-yellow-gold font-semibold hidden sm:block">
              View All Inventory &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-midnight-blue"></div>
              </div>
            ) : displayVehicles.length === 0 ? (
              <p className="text-gray-500 text-center col-span-full py-12">No featured vehicles at the moment.</p>
            ) : (
              displayVehicles.map((vehicle) => (
                <div key={vehicle.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl">
                  <div className="h-48 bg-gray-300 relative group overflow-hidden">
                     <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${vehicle.images[0]})` }}></div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{vehicle.year} {vehicle.make} {vehicle.model}</h3>
                      <span className="bg-midnight-blue text-white text-sm font-bold px-2 py-1 rounded">${vehicle.price.toLocaleString()}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{vehicle.mileage.toLocaleString()} miles &bull; {vehicle.status}</p>
                    <Link href={`/inventory/${vehicle.id}`} className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-midnight-blue font-semibold py-2 rounded transition-colors">
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link href="/inventory" className="text-midnight-blue hover:text-yellow-gold font-semibold">
              View All Inventory &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Tutton Hughes?</h2>
            <div className="w-24 h-1 bg-yellow-gold mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="bg-midnight-blue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-gold">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Assured</h3>
              <p className="text-gray-600">Every vehicle undergoes a rigorous inspection to ensure it meets our high standards before it reaches our lot.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-midnight-blue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-gold">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Fair Pricing</h3>
              <p className="text-gray-600">We offer transparent, competitive pricing on all our vehicles, with no hidden fees or surprise charges.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-midnight-blue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-gold">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Local & Trusted</h3>
              <p className="text-gray-600">Proudly serving Summerville and surrounding communities with honesty, integrity, and exceptional service.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
