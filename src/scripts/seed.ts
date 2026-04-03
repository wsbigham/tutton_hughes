import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCMlU6f67d_UUaqkkxE37x6WX4oCXjCBfA",
  authDomain: "tutton-hughes-auto-sales-1234.firebaseapp.com",
  projectId: "tutton-hughes-auto-sales-1234",
  storageBucket: "tutton-hughes-auto-sales-1234.firebasestorage.app",
  messagingSenderId: "155311913812",
  appId: "1:155311913812:web:34c13b31396267b46fe6c1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const mockVehicles = [
  {
    make: "Ford",
    model: "F-150 XLT",
    year: 2021,
    price: 34500,
    mileage: 42000,
    vin: "1FTEX1CP8MKE*****",
    description: "Well-maintained Ford F-150 with low mileage and excellent towing capabilities. Includes premium sound and navigation.",
    features: ["4WD", "Towing Package", "Apple CarPlay", "Heated Seats"],
    images: ["https://placehold.co/800x600?text=2021+Ford+F-150"],
    status: "available",
    featured: true,
    createdAt: serverTimestamp()
  },
  {
    make: "Toyota",
    model: "Camry SE",
    year: 2019,
    price: 18900,
    mileage: 65000,
    vin: "4T1B11HK5KU*****",
    description: "Reliable and fuel-efficient Toyota Camry. Perfect for daily commuting or long-distance travel.",
    features: ["FWD", "Back-up Camera", "Bluetooth", "Lane Departure Warning"],
    images: ["https://placehold.co/800x600?text=2019+Toyota+Camry"],
    status: "available",
    featured: true,
    createdAt: serverTimestamp()
  },
  {
    make: "Honda",
    model: "CR-V EX",
    year: 2020,
    price: 23400,
    mileage: 38000,
    vin: "5J8RW1H22LL*****",
    description: "Spacious and versatile compact SUV. Great for families and outdoor adventures.",
    features: ["AWD", "Blind Spot Monitor", "Sunroof", "Remote Start"],
    images: ["https://placehold.co/800x600?text=2020+Honda+CR-V"],
    status: "available",
    featured: true,
    createdAt: serverTimestamp()
  }
];

async function seed() {
  console.log("Seeding Firestore with mock data...");
  try {
    const vehiclesCol = collection(db, 'vehicles');
    for (const vehicle of mockVehicles) {
      await addDoc(vehiclesCol, vehicle);
      console.log(`Added: ${vehicle.make} ${vehicle.model}`);
    }
    console.log("Seeding complete!");
  } catch (error) {
    console.error("Error seeding Firestore:", error);
  }
}

seed();
