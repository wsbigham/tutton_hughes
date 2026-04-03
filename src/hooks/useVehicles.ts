"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, orderBy, Timestamp } from "firebase/firestore";

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  vin: string;
  description: string;
  features: string[];
  images: string[];
  status: string;
  featured: boolean;
  createdAt: Timestamp;
}

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        setLoading(true);
        const vehiclesCol = collection(db, 'vehicles');
        const q = query(vehiclesCol, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Vehicle[];
        setVehicles(data);
      } catch (err: unknown) {
        console.error("Error fetching vehicles:", err);
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }

    fetchVehicles();
  }, []);

  return { vehicles, loading, error };
}
