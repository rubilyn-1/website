document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("registrationModal");
    const registerButton = document.querySelector(".register-button");
    const closeButton = document.getElementById("closeButton");
    const form = document.getElementById("registrationForm");
    const confirmationMessage = document.getElementById("confirmationMessage");
    const videos = document.querySelectorAll(".slider-video");
    const texts = document.querySelectorAll(".slider-text");
    const nextButton = document.getElementById("nextVideo");
    const slider = document.querySelector('.slider');
    const nextButton2 = document.querySelector('.slider-next');
    const prevButton = document.querySelector('.slider-prev');
    const imageCards = document.querySelectorAll('.image-grid .card');
    const cards = document.querySelectorAll('.card'); 
    const totalCards = cards.length; 
    let currentIndex = 0;

    const loginModal = document.getElementById("loginModal");
    const openLoginButton = document.getElementById("openLoginButton");
    const closeLoginButton = document.getElementById("closeLoginButton");
    const loginForm = document.getElementById("loginForm");
    const loginMessage = document.getElementById("loginMessage");
    const userDetails = document.getElementById("userDetails");
    const userInfo = document.getElementById("userInfo");

    // Show login modal
    openLoginButton.addEventListener("click", () => {
        loginModal.style.display = "block";
    });

    // Close login modal
    closeLoginButton.addEventListener("click", () => {
        loginModal.style.display = "none";
        loginMessage.innerHTML = ''; // Clear message
        loginForm.reset(); // Reset form
    });

    // Handle login form submission
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent page refresh
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Simulate a login check (you'd typically check against a database)
        if (username === "admin" && password === "password") { // Example credentials
            loginMessage.innerHTML = "<p>Login Successful!</p>";
            loginModal.style.display = "none";
            userDetails.style.display = "block";
            userInfo.innerHTML = `Welcome, ${username}! Here are your details: [User details here]`;
        } else {
            loginMessage.innerHTML = "<p>Invalid username or password. Please try again.</p>";
        }
    });

    // Show modal on register button click
    registerButton.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Close modal
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
        confirmationMessage.innerHTML = ''; // Clear message
        form.reset(); // Reset form
    });

    // Close modal on outside click
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            confirmationMessage.innerHTML = ''; // Clear message
            form.reset(); // Reset form
        }
    });

    // Handle form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent page refresh
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Simulate saving to a text file (in practice, you would send this to a server)
        console.log("Student Data:", data);

        // Show confirmation
        confirmationMessage.innerHTML = `<p>Registration Successful!</p><pre>${JSON.stringify(data, null, 2)}</pre>`;
    });

    // Show the first video
    videos[currentIndex].classList.add("active");
    texts[1].classList.add("active-text");

    // Function to switch video and text
    const switchVideo = (index) => {
        videos.forEach((video, i) => {
            if (i === index) {
                video.classList.add("active");
                texts[i].classList.add("active-text");
                video.play();
                // Set a timeout to fade out the text after the video ends
                setTimeout(() => {
                    texts[i].classList.remove("active-text"); // Fade out text after video duration
                }, video.duration * 1000 - 1000); // Fade out 1 second before the video ends
            } else {
                video.classList.remove("active");
                video.pause();
                video.currentTime = 0;
            }
        });
    };

    // Automatically switch to the next video when one ends
    videos.forEach((video, index) => {
        video.addEventListener("ended", () => {
            texts[currentIndex].classList.remove("active-text"); // Fade out text
            currentIndex = (currentIndex + 1) % videos.length; // Move to next video
            switchVideo(currentIndex);
        });
    });

    // Manually switch video using the button
    nextButton.addEventListener("click", () => {
        texts[currentIndex].classList.remove("active-text"); // Fade out text
        currentIndex = (currentIndex + 1) % videos.length;
        switchVideo(currentIndex);
    });

    // Initially play the first video
    switchVideo(currentIndex);

    nextButton2.addEventListener('click', () => {
        imageCards[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % imageCards.length;
        imageCards[currentIndex].classList.add('active');
    });
    
    prevButton.addEventListener('click', () => {
        imageCards[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + imageCards.length) % imageCards.length;
        imageCards[currentIndex].classList.add('active');
    });

// Create the intersection observer for fade-in effect
const sections = document.querySelectorAll(".section");

// Create the intersection observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Add the fade-in class if scrolling into the section
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
        } else {
            // Remove the fade-in class when scrolling out
            entry.target.classList.remove("fade-in");
        }
    });
}, {
    threshold: 0.2, // 20% of the section must be visible for the fade-in effect to trigger
});

// Observe each section
sections.forEach(section => {
    observer.observe(section);
});
});
