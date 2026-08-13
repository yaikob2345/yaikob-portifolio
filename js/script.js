/* =====================================================
   MOBILE MENU TOGGLE
===================================================== */
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.querySelector(".navbar");

if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("show");
        const icon = menuToggle.querySelector("i");
        if (navbar.classList.contains("show")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });
}

document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
        if (navbar) navbar.classList.remove("show");
    });
});

/* =====================================================
   DARK / LIGHT MODE TOGGLE
===================================================== */
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const isDark = document.body.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
}

/* =====================================================
   TYPING EFFECT
===================================================== */
const typingElement = document.getElementById("typing");

if (typingElement) {
    const words = [
        "Computer Science Student",
        "Banking IT Specialist",
        "Full-Stack Web Developer",
        "Python & ML Developer",
        "Network Support Technician"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (!deleting) {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentWord.length) {
                deleting = true;
                setTimeout(typeEffect, 1500);
                return;
            }
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }
        setTimeout(typeEffect, deleting ? 50 : 100);
    }
    typeEffect();
}

/* =====================================================
   NUMBER COUNTERS
===================================================== */
const counters = document.querySelectorAll(".counter");
let countersStarted = false;

function startCounters() {
    if (countersStarted) return;
    countersStarted = true;

    counters.forEach(counter => {
        const target = Number(counter.dataset.target);
        let current = 0;
        const increment = Math.max(1, Math.ceil(target / 40));

        const update = () => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + "+";
            } else {
                counter.textContent = current;
                requestAnimationFrame(update);
            }
        };
        update();
    });
}

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) startCounters();
});

/* =====================================================
   PROJECT FILTERING
===================================================== */
const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-item");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        projects.forEach(project => {
            const category = project.dataset.category;
            if (filter === "all" || category.includes(filter)) {
                project.style.display = "block";
            } else {
                project.style.display = "none";
            }
        });
    });
});

/* =====================================================
   BACK TO TOP BUTTON
===================================================== */
const backToTop = document.getElementById("back-to-top");

if (backToTop) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* =====================================================
   CONTACT FORM SUBMISSION
===================================================== */
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {
            formMessage.textContent = "Please complete all required fields.";
            formMessage.style.color = "#ef4444";
            return;
        }

        formMessage.textContent = "Thank you! Your message has been submitted successfully.";
        formMessage.style.color = "#22c55e";
        contactForm.reset();
    });
}

/* =====================================================
   DYNAMIC COPYRIGHT YEAR & PRELOADER
===================================================== */
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
        preloader.style.opacity = "0";
        preloader.style.pointerEvents = "none";
        setTimeout(() => preloader.remove(), 500);
    }
});