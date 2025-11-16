// Example: Show a friendly alert when someone opens your site
window.addEventListener("load", () => {
  console.log("Welcome to Clarisa Creaciones!");
});

// Example: Add dynamic behavior — like changing the header color on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.style.backgroundColor = "#8c2b2b";
  } else {
    header.style.backgroundColor = "#6e1b1b";
  }
});

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-storage.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIqa45svbHeOKq4TQbXR3XV1nI14umrgA",
  authDomain: "clarisa-creaciones.firebaseapp.com",
  projectId: "clarisa-creaciones",
  storageBucket: "clarisa-creaciones.firebasestorage.app",
  messagingSenderId: "1019220536786",
  appId: "1:1019220536786:web:81ff22b8d8f1eff6812c0b",
  measurementId: "G-TE3V03WL1X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Wait until the DOM is fully loaded
window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('customOrderForm');
  const fileInput = document.getElementById("photoInput");
  const statusDiv = document.getElementById('status');

  form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = form.name.value;
  const email = form.email.value;
  const file = form.photo.files[0];

  if (!file) return alert("Please select a file");

  // Create unique file reference
  const storageRef = ref(storage, `orders/${Date.now()}_${file.name}`);

  // Add metadata
  const metadata = {
    customMetadata: {
      name: name,
      email: email
    }
  };

    

  try {
    const snapshot = await uploadBytes(storageRef, file, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);

    statusDiv.innerHTML = `Upload successful! <a href="${downloadURL}" target="_blank">View file</a>`;
    console.log("File uploaded:", downloadURL);
      // Retrieve metadata from uploaded file
    // const meta = await getMetadata(snapshot.ref);

  } catch (err) {
    console.error("Upload failed:", err);
    statusDiv.innerText = "Upload failed: " + err.message;
  }
});


  // form.addEventListener('submit', async (e) => {
  //   e.preventDefault();
  //   const file = fileInput.files[0];
  //   if (!file) return alert("Please select a file.");

  //   // Create a unique reference in Firebase Storage
  //   const storageRef = ref(storage, `orders/${Date.now()}_${file.name}`);

  //   try {
  //     // Upload file
  //     const snapshot = await uploadBytes(storageRef, file);
  //     const downloadURL = await getDownloadURL(snapshot.ref);

  //     statusDiv.innerHTML = `Upload successful! <a href="${downloadURL}" target="_blank">View file</a>`;
  //     console.log("Uploaded file URL:", downloadURL);
  //   } catch (err) {
      
  //     statusDiv.innerText = "Upload failed: " + err.message;
  //     console.error("Upload failed:", err);
  //   }
  // });
});
