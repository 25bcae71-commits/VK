// Scroll to contact
function scrollToContact() {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

// Theme toggle
const themeToggleBtn = document.getElementById('themeToggle');
function setTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('theme-dark');
    themeToggleBtn.textContent = 'Switch to Light Theme';
  } else {
    document.body.classList.remove('theme-dark');
    themeToggleBtn.textContent = 'Switch to Dark Theme';
  }
  localStorage.setItem('siteTheme', theme);
}

function initTheme() {
  const savedTheme = localStorage.getItem('siteTheme') || 'light';
  setTheme(savedTheme);
}

themeToggleBtn.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('theme-dark') ? 'light' : 'dark';
  setTheme(nextTheme);
});

initTheme();

// Instagram open fix
const instagram = document.querySelector('.instagram-link');
if (instagram) {
  instagram.addEventListener('click', function(e) {
    e.preventDefault();
    window.open('https://www.instagram.com/vishalkumaran_07', '_blank', 'noopener');
  });
}

// Guide actions
const skillsBtn = document.getElementById('gotoSkills');
const certsBtn = document.getElementById('gotoCerts');
if (skillsBtn) {
  skillsBtn.addEventListener('click', () => {
    document.querySelector('.skills').scrollIntoView({ behavior: 'smooth' });
  });
}
if (certsBtn) {
  certsBtn.addEventListener('click', () => {
    document.querySelector('.certifications').scrollIntoView({ behavior: 'smooth' });
  });
}

// Form submit
document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  try {
    const res = await fetch("http://localhost:5000/contact", {
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