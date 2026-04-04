import Link from "next/link";
import Image from "next/image";
import { Vehicle } from "@/types/vehicle";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/inventory/${vehicle.id}`} className="h-56 bg-gray-300 relative group overflow-hidden block">
        <Image 
          src={vehicle.images[0] || '/placeholder.jpg'} 
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute top-4 right-4 bg-midnight-blue text-white font-bold px-3 py-1 rounded shadow-md z-10">
          ${vehicle.price.toLocaleString()}
        </div>
        {vehicle.featured && (
          <div className="absolute top-4 left-4 bg-yellow-gold text-midnight-blue font-bold px-3 py-1 rounded shadow-md z-10">
            Featured
          </div>
        )}
      </Link>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-midnight-blue mb-2">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6 text-gray-600 font-medium">
          <span className="flex items-center gap-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            {vehicle.mileage.toLocaleString()} mi
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            {vehicle.status}
          </span>
        </div>
        <Link 
          href={`/inventory/${vehicle.id}`}
          className="block w-full text-center bg-midnight-blue hover:bg-opacity-90 text-white font-bold py-3 rounded-md transition-all shadow-md"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}