"use client";

import { useAuth } from "@/hooks/useAuth";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function EditVehiclePage() {
  const { loading: authLoading } = useAuth();
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    vin: "",
    description: "",
    features: "",
    imageUrl: "",
    status: "available",
    featured: false
  });

  useEffect(() => {
    async function fetchVehicle() {
      if (!id) return;
      try {
        const docSnap = await getDoc(doc(db, "vehicles", id as string));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            ...data,
            make: data.make || "",
            model: data.model || "",
            year: data.year || new Date().getFullYear(),
            price: data.price || 0,
            mileage: data.mileage || 0,
            vin: data.vin || "",
            description: data.description || "",
            features: data.features ? data.features.join(", ") : "",
            imageUrl: data.images ? data.images[0] : "",
            status: data.status || "available",
            featured: data.featured || false
          });
        }
      } catch (err) {
        console.error("Error fetching vehicle:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchVehicle();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateDoc(doc(db, "vehicles", id as string), {
        ...formData,
        year: Number(formData.year),
        price: Number(formData.price),
        mileage: Number(formData.mileage),
        features: formData.features.split(",").map(f => f.trim()).filter(f => f !== ""),
        images: [formData.imageUrl || "https://placehold.co/800x600?text=Vehicle+Image"]
      });
      router.push("/admin");
    } catch (err) {
      console.error("Error updating vehicle:", err);
      alert("Error updating vehicle.");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  if (authLoading || loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-midnight-blue"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-black text-midnight-blue uppercase">Edit Vehicle</h1>
          <Link href="/admin" className="text-gray-500 font-bold hover:text-midnight-blue transition-colors">Cancel</Link>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-xl overflow-hidden border-t-8 border-yellow-gold">
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black text-midnight-blue uppercase tracking-widest mb-2">Make</label>
                <input type="text" name="make" required value={formData.make} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-100 rounded-lg focus:border-yellow-gold outline-none transition-colors text-black" />
              </div>
              <div>
                <label className="block text-xs font-black text-midnight-blue uppercase tracking-widest mb-2">Model</label>
                <input type="text" name="model" required value={formData.model} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-100 rounded-lg focus:border-yellow-gold outline-none transition-colors text-black" />
              </div>
              <div>
                <label className="block text-xs font-black text-midnight-blue uppercase tracking-widest mb-2">Year</label>
                <input type="number" name="year" required value={formData.year} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-100 rounded-lg focus:border-yellow-gold outline-none transition-colors text-black" />
              </div>
              <div>
                <label className="block text-xs font-black text-midnight-blue uppercase tracking-widest mb-2">Price ($)</label>
                <input type="number" name="price" required value={formData.price} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-100 rounded-lg focus:border-yellow-gold outline-none transition-colors text-black" />
              </div>
              <div>
                <label className="block text-xs font-black text-midnight-blue uppercase tracking-widest mb-2">Mileage</label>
                <input type="number" name="mileage" required value={formData.mileage} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-100 rounded-lg focus:border-yellow-gold outline-none transition-colors text-black" />
              </div>
              <div>
                <label className="block text-xs font-black text-midnight-blue uppercase tracking-widest mb-2">VIN</label>
                <input type="text" name="vin" required value={formData.vin} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-100 rounded-lg focus:border-yellow-gold outline-none transition-colors text-black" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-midnight-blue uppercase tracking-widest mb-2">Image URL</label>
              <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-100 rounded-lg focus:border-yellow-gold outline-none transition-colors text-black" />
            </div>

            <div>
              <label className="block text-xs font-black text-midnight-blue uppercase tracking-widest mb-2">Description</label>
              <textarea name="description" rows={4} value={formData.description} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-100 rounded-lg focus:border-yellow-gold outline-none transition-colors resize-none text-black"></textarea>
            </div>

            <div>
              <label className="block text-xs font-black text-midnight-blue uppercase tracking-widest mb-2">Features (comma separated)</label>
              <input type="text" name="features" value={formData.features} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-100 rounded-lg focus:border-yellow-gold outline-none transition-colors text-black" />
            </div>

            <div className="flex items-center gap-6 py-4">
               <div className="flex items-center gap-2">
                 <input type="checkbox" name="featured" id="featured" checked={formData.featured} onChange={handleChange} className="w-5 h-5 accent-midnight-blue" />
                 <label htmlFor="featured" className="text-sm font-bold text-gray-700">Featured Vehicle</label>
               </div>
               <div className="flex-grow">
                 <label className="block text-xs font-black text-midnight-blue uppercase tracking-widest mb-2">Status</label>
                 <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-100 rounded-lg focus:border-yellow-gold outline-none transition-colors text-black font-bold">
                    <option value="available">Available</option>
                    <option value="pending">Sale Pending</option>
                    <option value="sold">Sold</option>
                 </select>
               </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-midnight-blue text-white font-black py-4 rounded-lg text-lg uppercase tracking-widest shadow-xl transition-all hover:bg-opacity-90 disabled:opacity-50"
            >
              {saving ? "Saving Changes..." : "Save Vehicle Updates"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
