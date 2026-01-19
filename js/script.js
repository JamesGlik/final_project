const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar_menu')

menu.addEventListener('click', function(){
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
})

document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.querySelector('input[placeholder="Your full name"]');
    const emailInput = document.querySelector('input[placeholder="Your email address"]');
    const messageInput = document.querySelector('textarea[placeholder="Write a note about your request"]');

    const inputs = [nameInput, emailInput, messageInput];

    function validateInput(input) {
        const value = input.value.trim();
        let error = "";

        if (input === nameInput) {
            if (!value) error = "Name is required.";
            else if (/\d/.test(value)) error = "Name cannot contain numbers.";
        }

        if (input === emailInput) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) error = "Email is required.";
            else if (!emailRegex.test(value)) error = "Email is invalid.";
        }

        if (input === messageInput) {
            if (!value) error = "Message cannot be empty.";
        }

        const wrapper = input.parentElement;
        const oldError = wrapper.querySelector(".contact-error-message");
        if (oldError) oldError.remove();

        if (error) {
            input.classList.add("error");
            const errorEl = document.createElement("div");
            errorEl.className = "contact-error-message";
            errorEl.innerText = error;
            wrapper.appendChild(errorEl);
        } else {
            input.classList.remove("error");
        }
    }

    inputs.forEach(input => {
        input.addEventListener("input", () => validateInput(input));
        input.addEventListener("blur", () => validateInput(input));
    });
});



const updateBtn = document.getElementById("updateTestimonialsBtn");

const testimonialCards = document.querySelectorAll(".testimonial-card");

async function fetchUsers(count = 3) {
  try {
    const response = await fetch(`https://randomuser.me/api/?results=${count}`);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
}

function updateTestimonials(users) {
  if (!users) return;

  testimonialCards.forEach((card, index) => {
    const user = users[index];
    if (!user) return;

    const avatar = card.querySelector(".testimonial-avatar");
    avatar.src = user.picture.medium;

    const name = card.querySelector(".testimonial-name");
    name.textContent = `${user.name.first} ${user.name.last}`;

    const country = card.querySelector(".testimonial-country");
    country.textContent = user.location.country;

    const text = card.querySelector(".testimonial-text");
    text.textContent = "This service really helped me improve my relationship!";
  });
}

updateBtn.addEventListener("click", async () => {
  const users = await fetchUsers(testimonialCards.length);
  updateTestimonials(users);
});


const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = "flex";
    } else {
        scrollToTopBtn.style.display = "none";
    }
});

scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


const cookiesBanner = document.getElementById("cookiesBanner");
const acceptCookiesBtn = document.getElementById("acceptCookiesBtn");

if (localStorage.getItem("cookiesAccepted")) {
    cookiesBanner.style.display = "none";
}

acceptCookiesBtn.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    cookiesBanner.style.display = "none";
});