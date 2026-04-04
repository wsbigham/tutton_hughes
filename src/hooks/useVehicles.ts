"use client";

import { useEffect, useState } from "react";
import { Vehicle } from "@/types/vehicle";
import { getVehicles } from "@/services/vehicleService";

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        setLoading(true);
        const data = await getVehicles();
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