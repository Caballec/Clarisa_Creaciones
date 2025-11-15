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
const statusDiv = document.createElement('div'); // or use existing #status div
statusDiv.id = 'status';
form.after(statusDiv); // make sure the status div exists

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const file = form.photo.files[0];
  const name = form.name.value;
  const email = form.email.value;

  if (!file) return alert("Please select a photo");

  // Optional: include metadata with the upload
  const metadata = {
    customMetadata: {
      name,
      email
    }
  };

  const storageRef = storage.ref(`orders/${Date.now()}_${file.name}`);

  try {
    const snapshot = await storageRef.put(file, metadata);
    const downloadURL = await snapshot.ref.getDownloadURL();
    statusDiv.innerHTML = `Upload successful! <a href="${downloadURL}" target="_blank">View file</a>`;
    console.log("Uploaded file URL:", downloadURL);
  } catch (err) {
    console.error("Upload failed:", err);
    statusDiv.innerText = "Upload failed: " + err.message;
  }
});

