"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export interface SiteSettings {
  featuredStatuses: string[];
}

const defaultSettings: SiteSettings = {
  featuredStatuses: ["available", "pending"],
};

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const docRef = doc(db, 'settings', 'site');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings({ ...defaultSettings, ...docSnap.data() } as SiteSettings);
        }
      } catch (err) {
        console.error("Error fetching settings:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    const previousSettings = settings;
    const updated = { ...settings, ...newSettings };
    setSettings(updated); // Optimistic update
    try {
      const docRef = doc(db, 'settings', 'site');
      await setDoc(docRef, updated, { merge: true });
    } catch (err) {
      console.error("Error updating settings:", err);
      setSettings(previousSettings); // Revert optimistic update on failure
      throw err;
    }
  };

  return { settings, loading, updateSettings };
}
