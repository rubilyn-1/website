document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("registrationModal");
    const registerButton = document.querySelector(".register-button");
    const closeButton = document.getElementById("closeButton");
    const form = document.getElementById("registrationForm");
    const confirmationMessage = document.getElementById("confirmationMessage");
    const videos = document.querySelectorAll(".slider-video");
    const texts = document.querySelectorAll(".slider-text");
    const nextButton = document.getElementById("nextVideo");
    let currentIndex = 0;

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
});
