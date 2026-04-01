// Scroll to contact
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

// Navigation buttons
const skillsBtn = document.getElementById("gotoSkills");
const certsBtn = document.getElementById("gotoCerts");
const contactBtn = document.getElementById("gotoContact");

if (skillsBtn) {
  skillsBtn.addEventListener("click", () => {
    document.querySelector(".skills").scrollIntoView({ behavior: "smooth" });
  });
}

if (certsBtn) {
  certsBtn.addEventListener("click", () => {
    document.querySelector(".certifications").scrollIntoView({ behavior: "smooth" });
  });
}

if (contactBtn) {
  contactBtn.addEventListener("click", () => {
    document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
  });
}

// Instagram open fix
const instagram = document.querySelector(".instagram-link");
if (instagram) {
  instagram.addEventListener("click", function (e) {
    e.preventDefault();
    window.open("https://www.instagram.com/vishalkumaran_07", "_blank");
  });
}

// CONTACT FORM SUBMIT + VALIDATION
document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name === "" || email === "" || message === "") {
    alert("All fields are required");
    return;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    alert("Enter valid email");
    return;
  }

  if (message.length < 10) {
    alert("Message must be at least 10 characters");
    return;
  }

  const data = { name, email, message };

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
    alert("Server error. Try again later.");
  }
});