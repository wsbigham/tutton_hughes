"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Vehicle } from "@/hooks/useVehicles";
import Link from "next/link";
import Image from "next/image";

export default function VehicleDetailPage() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchVehicle() {
      if (!id) return;
      try {
        setLoading(true);
        const docRef = doc(db, 'vehicles', id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const v = { id: docSnap.id, ...docSnap.data() } as Vehicle;
          setVehicle(v);
          if (v.images && v.images.length > 0) {
            setMainImage(v.images[0]);
          }
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

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (vehicle && vehicle.images) {
      setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % vehicle.images!.length));
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (vehicle && vehicle.images) {
      setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + vehicle.images!.length) % vehicle.images!.length));
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") {
        if (vehicle && vehicle.images) {
          setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % vehicle.images!.length));
        }
      }
      if (e.key === "ArrowLeft") {
        if (vehicle && vehicle.images) {
          setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + vehicle.images!.length) % vehicle.images!.length));
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, vehicle]);

  // Prevent background scrolling when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [lightboxIndex]);

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

  const currentImageIndex = vehicle.images?.indexOf(mainImage) || 0;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-8">
          <Link href="/inventory" className="text-midnight-blue hover:text-yellow-gold font-bold flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Inventory
          </Link>
        </nav>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Side: Images */}
          <div className="bg-gray-200">
             <div 
               className="h-96 sm:h-[500px] relative cursor-pointer group"
               onClick={() => openLightbox(currentImageIndex === -1 ? 0 : currentImageIndex)}
             >
               <div className="absolute inset-0 bg-cover bg-center transition-all duration-300" style={{ backgroundImage: `url(${mainImage || vehicle.images[0]})` }}></div>
               <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                 <div className="bg-midnight-blue bg-opacity-80 text-white rounded-full px-6 py-3 opacity-0 group-hover:opacity-100 transition-opacity transform scale-90 group-hover:scale-100 flex items-center gap-2 shadow-lg">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
                   <span className="font-bold tracking-wide">View Gallery</span>
                 </div>
               </div>
             </div>
             {vehicle.images && vehicle.images.length > 1 && (
               <div className="p-4 flex gap-4 overflow-x-auto">
                  {vehicle.images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setMainImage(img)}
                      className={`w-24 h-20 flex-shrink-0 bg-gray-300 rounded overflow-hidden shadow-sm border-2 transition-all ${mainImage === img ? 'border-midnight-blue opacity-100 scale-105' : 'border-transparent opacity-70 hover:opacity-100'}`}
                    >
                      <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${img})` }}></div>
                    </button>
                  ))}
               </div>
             )}
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
                href="tel:7068080110"
                className="flex-grow bg-midnight-blue text-white text-center font-black py-4 rounded-lg hover:bg-opacity-90 transition-all shadow-lg"
              >                Call for Price / Test Drive
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

      {/* Lightbox Modal */}
      {lightboxIndex !== null && vehicle.images && (
        <div 
          className="fixed inset-0 z-[100] bg-black bg-opacity-95 flex items-center justify-center backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-yellow-gold transition-colors z-[110] bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full p-2"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          
          {vehicle.images.length > 1 && (
            <button 
              className="absolute left-4 sm:left-8 top-1/2 transform -translate-y-1/2 text-white hover:text-yellow-gold transition-colors z-[110] bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full p-3 sm:p-4"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
            </button>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={vehicle.images[lightboxIndex]} 
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} - Image ${lightboxIndex + 1}`} 
            className="max-h-[85vh] max-w-[90vw] object-contain select-none shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />

          {vehicle.images.length > 1 && (
            <button 
              className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 text-white hover:text-yellow-gold transition-colors z-[110] bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full p-3 sm:p-4"
              onClick={nextImage}
              aria-label="Next image"
            >
              <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
            </button>
          )}

          {vehicle.images.length > 1 && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm sm:text-base font-semibold bg-black bg-opacity-60 px-6 py-2 rounded-full tracking-widest backdrop-blur-md z-[110]">
              {lightboxIndex + 1} / {vehicle.images.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
