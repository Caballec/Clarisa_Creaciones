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

const form = document.getElementById('customOrderForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const fileInput = form.querySelector('input[name="photo"]');
  const file = fileInput.files[0];  // get the file object
  if (!file) return alert("Please select a photo");

  const storageRef = storage.ref(`orders/${Date.now()}_${file.name}`);

  try {
    const snapshot = await storageRef.put(file);
    const downloadURL = await snapshot.ref.getDownloadURL();
    console.log("File uploaded! URL:", downloadURL);
  } catch (err) {
    console.error("Upload failed:", err);
  }
});

