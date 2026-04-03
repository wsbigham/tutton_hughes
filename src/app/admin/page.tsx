"use client";

import { useAuth } from "@/hooks/useAuth";
import { useVehicles, Vehicle } from "@/hooks/useVehicles";
import { useSettings } from "@/hooks/useSettings";
import { db, auth } from "@/lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const { vehicles, loading: vehiclesLoading, error } = useVehicles();
  const { settings, loading: settingsLoading, updateSettings } = useSettings();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;
    setIsDeleting(id);
    try {
      await deleteDoc(doc(db, "vehicles", id));
      window.location.reload(); 
    } catch (err) {
      console.error("Error deleting vehicle:", err);
      alert("Failed to delete vehicle.");
    } finally {
      setIsDeleting(null);
    }
  };

  if (authLoading || vehiclesLoading || settingsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-midnight-blue"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-gold">
          <div>
            <h1 className="text-2xl font-black text-midnight-blue uppercase">Inventory Management</h1>
            <p className="text-gray-500">Logged in as {user?.email}</p>
          </div>
          <div className="flex gap-4">
            <Link 
              href="/admin/add" 
              className="bg-midnight-blue text-white px-6 py-2 rounded font-bold hover:bg-opacity-90 transition-all uppercase text-sm tracking-widest"
            >
              Add Vehicle
            </Link>
            <button 
              onClick={handleLogout}
              className="border-2 border-gray-200 text-gray-500 px-6 py-2 rounded font-bold hover:bg-gray-50 transition-all uppercase text-sm tracking-widest"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Global Settings Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border-t-4 border-midnight-blue">
          <h2 className="text-xl font-bold text-midnight-blue mb-4 uppercase tracking-widest">Storefront Settings</h2>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-3">Allowed Statuses for Homepage Featured Section</label>
            <div className="flex gap-6">
              {["available", "pending", "sold"].map((status) => (
                <label key={status} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.featuredStatuses.includes(status)}
                    onChange={async (e) => {
                      const isChecked = e.target.checked;
                      let newStatuses = [...settings.featuredStatuses];
                      if (isChecked) {
                        newStatuses.push(status);
                      } else {
                        newStatuses = newStatuses.filter(s => s !== status);
                      }
                      await updateSettings({ featuredStatuses: newStatuses });
                    }}
                    className="w-5 h-5 accent-midnight-blue cursor-pointer"
                  />
                  <span className="capitalize font-medium text-gray-700">{status}</span>
                </label>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-2">Check the boxes to include vehicles with these statuses in the Featured Vehicles section on the home page.</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
            <p className="text-red-700 font-medium">Error loading inventory: {error}</p>
          </div>
        )}

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Vehicle</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-16 bg-gray-200 rounded overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={vehicle.images[0]} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-midnight-blue">{vehicle.year} {vehicle.make} {vehicle.model}</div>
                        <div className="text-xs text-gray-500">VIN: {vehicle.vin}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-black text-midnight-blue">${vehicle.price.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-bold rounded-full ${vehicle.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/admin/edit/${vehicle.id}`} className="text-midnight-blue hover:text-yellow-gold mr-4 font-bold transition-colors">Edit</Link>
                    <button 
                      onClick={() => handleDelete(vehicle.id)}
                      disabled={isDeleting === vehicle.id}
                      className="text-red-600 hover:text-red-900 font-bold transition-colors disabled:opacity-50"
                    >
                      {isDeleting === vehicle.id ? "..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
              {vehicles.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-500">No vehicles found in inventory.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
