import { db } from "@/lib/firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { Vehicle } from "@/types/vehicle";

export async function getVehicles(): Promise<Vehicle[]> {
  const vehiclesCol = collection(db, 'vehicles');
  const q = query(vehiclesCol, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Vehicle[];
}