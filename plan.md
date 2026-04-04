# Refactoring Plan

The following tasks remain to complete the architectural refactoring of the application:

## 1. Create `src/services/vehicleService.ts`
Move the Firestore database fetching logic into a dedicated service layer to decouple the UI from the database.

```typescript
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
```

## 2. Fix Broken Imports
Some files need their `Vehicle` type import updated to point to the newly created `src/types/vehicle.ts`.
* **`src/app/page.tsx`**: Update the `Vehicle` import.
* **`src/app/admin/page.tsx`**: Update the `Vehicle` import.
* **`src/app/inventory/[id]/page.tsx`**: Update the `Vehicle` import.
* **`src/hooks/useVehicles.ts`**: Update the `getVehicles` and `Vehicle` imports.

## 3. Secure Firebase Configuration
Create a `.env.local` file at the root of the project to store Firebase credentials securely instead of hardcoding them in `src/lib/firebase.ts`.

```env
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyCMlU6f67d_UUaqkkxE37x6WX4oCXjCBfA"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="tutton-hughes-auto-sales-1234.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="tutton-hughes-auto-sales-1234"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="tutton-hughes-auto-sales-1234.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="155311913812"
NEXT_PUBLIC_FIREBASE_APP_ID="1:155311913812:web:34c13b31396267b46fe6c1"
```
