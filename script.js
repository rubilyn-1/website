document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("registrationModal");
    const registerButton = document.querySelector(".register-button");
    const closeButton = document.getElementById("closeButton");
    const form = document.getElementById("registrationForm");
    const confirmationMessage = document.getElementById("confirmationMessage");

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
});
