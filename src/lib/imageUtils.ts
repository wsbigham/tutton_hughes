import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

/**
 * Converts a File object (e.g. from an input type="file") into a WebP Blob using the browser's Canvas API.
 * @param file The original image File.
 * @param quality Quality of the WebP output (0 to 1).
 * @returns A Promise that resolves to a Blob containing the WebP image.
 */
export const convertToWebP = (file: File, quality: number = 0.8): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Canvas toBlob returned null"));
            }
          },
          "image/webp",
          quality
        );
      };
      img.onerror = (err) => reject(err);
      if (typeof event.target?.result === "string") {
        img.src = event.target.result;
      } else {
        reject(new Error("FileReader result is not a string"));
      }
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

/**
 * Uploads a file (or Blob) to Firebase Storage and returns the download URL.
 * @param blob The File or Blob to upload.
 * @param path The path in Firebase Storage where the file should be stored.
 * @returns A Promise that resolves to the download URL string.
 */
export const uploadImageToStorage = async (blob: Blob, path: string): Promise<string> => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, blob);
  const downloadUrl = await getDownloadURL(storageRef);
  return downloadUrl;
};
