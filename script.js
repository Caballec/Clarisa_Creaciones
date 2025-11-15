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

// 'file' is the File object selected by the user from an <input type="file">
const storageRef = storage.ref(`orders/${gs://clarisa-creaciones.firebasestorage.app}`); // path inside your bucket
await storageRef.put(file); // upload the file

