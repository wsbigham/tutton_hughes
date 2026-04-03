"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Vehicle } from "@/hooks/useVehicles";
import Link from "next/link";

export default function VehicleDetailPage() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVehicle() {
      if (!id) return;
      try {
        setLoading(true);
        const docRef = doc(db, 'vehicles', id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setVehicle({ id: docSnap.id, ...docSnap.data() } as Vehicle);
        } else {
          setError("Vehicle not found");
        }
      } catch (err: unknown) {
        console.error("Error fetching vehicle:", err);
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }

    fetchVehicle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-midnight-blue"></div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col">
        <p className="text-red-600 font-bold text-xl mb-4">{error || "Vehicle not found"}</p>
        <Link href="/inventory" className="text-midnight-blue hover:text-yellow-gold font-bold underline">
          Back to Inventory
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-8">
          <Link href="/inventory" className="text-midnight-blue hover:text-yellow-gold font-bold flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Inventory
          </Link>
        </nav>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Side: Images */}
          <div className="bg-gray-200">
             <div className="h-96 sm:h-[500px] relative">
               <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${vehicle.images[0]})` }}></div>
             </div>
             {/* Simple Gallery Placeholder */}
             <div className="p-4 flex gap-4 overflow-x-auto">
                {vehicle.images.map((img, idx) => (
                  <div key={idx} className="w-24 h-20 flex-shrink-0 bg-gray-300 rounded overflow-hidden shadow-sm">
                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${img})` }}></div>
                  </div>
                ))}
             </div>
          </div>

          {/* Right Side: Info */}
          <div className="p-8 lg:p-12 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl md:text-4xl font-extrabold text-midnight-blue">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              <span className="bg-yellow-gold text-midnight-blue font-black text-2xl px-4 py-2 rounded-lg">
                ${vehicle.price.toLocaleString()}
              </span>
            </div>

            <p className="text-gray-500 font-medium mb-8">
              VIN: <span className="text-midnight-blue">{vehicle.vin}</span> &bull; {vehicle.mileage.toLocaleString()} Miles
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10 border-y border-gray-100 py-8">
               <div>
                 <p className="text-gray-400 text-sm uppercase font-bold tracking-widest mb-1">Make</p>
                 <p className="text-midnight-blue font-bold text-lg">{vehicle.make}</p>
               </div>
               <div>
                 <p className="text-gray-400 text-sm uppercase font-bold tracking-widest mb-1">Model</p>
                 <p className="text-midnight-blue font-bold text-lg">{vehicle.model}</p>
               </div>
               <div>
                 <p className="text-gray-400 text-sm uppercase font-bold tracking-widest mb-1">Year</p>
                 <p className="text-midnight-blue font-bold text-lg">{vehicle.year}</p>
               </div>
               <div>
                 <p className="text-gray-400 text-sm uppercase font-bold tracking-widest mb-1">Status</p>
                 <p className="text-midnight-blue font-bold text-lg capitalize">{vehicle.status}</p>
               </div>
            </div>

            <div className="mb-10">
              <h2 className="text-xl font-bold text-midnight-blue mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed">
                {vehicle.description}
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-xl font-bold text-midnight-blue mb-4">Key Features</h2>
              <div className="flex flex-wrap gap-2">
                {vehicle.features.map((feature, idx) => (
                  <span key={idx} className="bg-gray-100 text-midnight-blue px-3 py-1 rounded-full text-sm font-semibold">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto flex flex-col sm:flex-row gap-4">
              <a 
                href="tel:7062532277" 
                className="flex-grow bg-midnight-blue text-white text-center font-black py-4 rounded-lg hover:bg-opacity-90 transition-all shadow-lg"
              >
                Call for Price / Test Drive
              </a>
              <Link 
                href="/contact"
                className="flex-grow bg-yellow-gold text-midnight-blue text-center font-black py-4 rounded-lg hover:bg-gold-hover transition-all shadow-lg"
              >
                Inquire Online
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
