import { getVehicles } from "@/services/vehicleService";
import VehicleCard from "@/components/VehicleCard";

export default async function InventoryPage() {
  let vehicles = [];
  let error = null;

  try {
    vehicles = await getVehicles();
  } catch (err: unknown) {
    error = err instanceof Error ? err.message : String(err);
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600 font-bold text-xl">Error loading inventory: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-midnight-blue mb-4 uppercase">Current Inventory</h1>
          <div className="w-24 h-1 bg-yellow-gold mb-8"></div>
          <p className="text-gray-600 text-lg max-w-3xl">
            Explore our wide selection of quality pre-owned vehicles. Each vehicle is thoroughly inspected and ready for a test drive.
          </p>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.length === 0 ? (
            <p className="text-gray-500 text-xl col-span-full text-center py-20">No vehicles available at the moment. Please check back soon!</p>
          ) : (
            vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}