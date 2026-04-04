import { Timestamp } from "firebase/firestore";

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