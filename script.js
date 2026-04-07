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



// This has been commented becaue still need to store input user data and create an entire form.
