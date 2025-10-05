console.log("Modal JS Loaded ✅");

// Handle existing site JS plus contact form
document.addEventListener('click', function(e) {
    if (e.target.classList && e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// Search basic
const searchBtn = document.getElementById('searchBtn');
if (searchBtn) {
    searchBtn.addEventListener('click', function() {
        const q = document.getElementById('searchInput').value.trim();
        if (!q) return alert('Enter search term');
        alert('Search for: ' + q);
    });
}

// Login/Signup buttons (can be expanded)
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
if (loginBtn) loginBtn.addEventListener('click', ()=> alert('Login clicked — integrate your auth flow here'));
if (signupBtn) signupBtn.addEventListener('click', ()=> alert('Signup clicked — integrate your auth flow here'));

// Contact form submission via fetch to /send-email
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e){
        e.preventDefault();
        const name = document.getElementById('cf-name').value.trim();
        const email = document.getElementById('cf-email').value.trim();
        const phone = document.getElementById('cf-phone').value.trim();
        const message = document.getElementById('cf-message').value.trim();
        const status = document.getElementById('formStatus');
        status.textContent = 'Sending...';
        try {
            const res = await fetch('/send-email', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({name,email,phone,message})
            });
            const data = await res.json();
            if (data && data.success) {
                // show popup
                const pop = document.getElementById('successPopup');
                pop.classList.remove('hidden');
                setTimeout(()=> pop.classList.add('hidden'), 3500);
                status.textContent = 'Message sent successfully!';
                contactForm.reset();
            } else {
                status.textContent = 'Failed to send message. Try again later.';
            }
        } catch (err) {
            console.error(err);
            status.textContent = 'Network error. Try again later.';
        }
    });
}



// Modal Logic
const contactModal = document.getElementById("contactModal");
const aboutModal = document.getElementById("aboutModal");

const footerPhone = document.getElementById("footerPhone");
const footerEmail = document.getElementById("footerEmail");
const footerAbout = document.getElementById("footerAbout");

const closeButtons = document.querySelectorAll(".close");

footerPhone.onclick = footerEmail.onclick = function() {
  contactModal.style.display = "flex";
};

footerAbout.onclick = function() {
  aboutModal.style.display = "flex";
};

closeButtons.forEach(btn => {
  btn.onclick = function() {
    contactModal.style.display = "none";
    aboutModal.style.display = "none";
  }
});

window.onclick = function(event) {
  if (event.target === contactModal) {
    contactModal.style.display = "none";
  }
  if (event.target === aboutModal) {
    aboutModal.style.display = "none";
  }
};
