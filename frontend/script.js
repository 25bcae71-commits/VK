function scrollToContact() {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

// Theme toggle
const themeToggleBtn = document.getElementById("themeToggle");

function setTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("theme-dark");
    themeToggleBtn.textContent = "Switch to Light Theme";
  } else {
    document.body.classList.remove("theme-dark");
    themeToggleBtn.textContent = "Switch to Dark Theme";
  }
  localStorage.setItem("siteTheme", theme);
}

function initTheme() {
  const savedTheme = localStorage.getItem("siteTheme") || "light";
  setTheme(savedTheme);
}

themeToggleBtn.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("theme-dark") ? "light" : "dark";
  setTheme(nextTheme);
});

initTheme();

// Contact Form Submit
document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  try {
    const res = await fetch("https://vk-fjwu.onrender.com/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.text();
    alert(result);

    document.getElementById("contactForm").reset();
  } catch (error) {
    alert("Error connecting to server");
  }
});