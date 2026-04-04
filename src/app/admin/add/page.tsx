"use client";

import { useAuth } from "@/hooks/useAuth";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { convertToWebP, uploadImageToStorage } from "@/lib/imageUtils";

export default function AddVehiclePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    vin: "",
    description: "",
    features: "",
    status: "available",
    featured: false
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...files]);
      
      // Create preview URLs
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviews]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => {
      const urls = [...prev];
      URL.revokeObjectURL(urls[index]);
      return urls.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const uploadedImageUrls: string[] = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        // Convert to WebP
        const webpBlob = await convertToWebP(file, 0.8);
        // Upload to Storage
        const path = `vehicles/${Date.now()}_${i}.webp`;
        const url = await uploadImageToStorage(webpBlob, path);
        uploadedImageUrls.push(url);
      }

      const imagesToSave = uploadedImageUrls.length > 0 
        ? uploadedImageUrls 
        : ["https://placehold.co/800x600?text=Vehicle+Image"];

      await addDoc(collection(db, "vehicles"), {
        ...formData,
        year: Number(formData.year),
        price: Number(formData.price),
        mileage: Number(formData.mileage),
        features: formData.features.split(",").map(f => f.trim()).filter(f => f !== ""),
        images: imagesToSave,
        createdAt: serverTimestamp()
      });
      router.push("/admin");
    } catch (err) {
      console.error("Error adding vehicle:", err);
      alert("Error adding vehicle.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  if (authLoading || !user) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-black text-midnight-blue uppercase">Add New Vehicle</h1>
          <Link href="/admin" className="text-gray-500 font-bold hover:text-midnight-blue transition-colors">Cancel</Link>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-xl overflow-hidden border-t-8 border-yellow-gold">
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black text-midnight-blue uppercase tracking-widest mb-2">Make</label>
                <input type="text" name="make" required value={formData.make} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-100 rounded-lg focus:border-yellow-gold outline-none transition-colors text-black" placeholder="e.g. Ford" />
              </div>
              <div>
                <label className="block text-xs font-black text-midnight-blue uppercase tracking-widest mb-2">Model</label>
                <input type="text" name="model" required value={formData.model} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-100 rounded-lg focus:border-yellow-gold outline-none transition-colors text-black" placeholder="e.g. F-150" />
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
              <label className="block text-xs font-black text-midnight-blue uppercase tracking-widest mb-2">Images</label>
              <input 
                type="file" 
                accept="image/*" 
                multiple 
                onChange={handleFileChange} 
                className="w-full px-4 py-3 border-2 border-gray-100 rounded-lg focus:border-yellow-gold outline-none transition-colors text-black bg-gray-50"
              />
              {previewUrls.length > 0 && (
                <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
                  {previewUrls.map((url, idx) => (
                    <div key={idx} className="relative w-24 h-24 flex-shrink-0 rounded overflow-hidden border border-gray-200">
                      <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${url})` }}></div>
                      <button 
                        type="button" 
                        onClick={() => removeFile(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-black text-midnight-blue uppercase tracking-widest mb-2">Description</label>
              <textarea name="description" rows={4} value={formData.description} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-100 rounded-lg focus:border-yellow-gold outline-none transition-colors resize-none text-black" placeholder="Describe the vehicle condition, history, etc."></textarea>
            </div>

            <div>
              <label className="block text-xs font-black text-midnight-blue uppercase tracking-widest mb-2">Features (comma separated)</label>
              <input type="text" name="features" value={formData.features} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-100 rounded-lg focus:border-yellow-gold outline-none transition-colors text-black" placeholder="4WD, Sunroof, Leather Seats..." />
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
              disabled={loading}
              className="w-full bg-midnight-blue text-white font-black py-4 rounded-lg text-lg uppercase tracking-widest shadow-xl transition-all hover:bg-opacity-90 disabled:opacity-50"
            >
              {loading ? "Adding to Inventory..." : "Add Vehicle to Inventory"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
