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

rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if false; // users cannot read files
      allow write: if request.auth == null || request.auth != null; // public write
    }
  }
}
