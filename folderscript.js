document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".button-container");

    // Generate buttons dynamically (7x10 matrix = 70 buttons)
    for (let i = 1; i <= 70; i++) {
        const button = document.createElement("button");
        button.innerText = `Slat${i}`;
        button.className = "button";

        // Attach click event to navigate
        button.addEventListener("click", () => {
            localStorage.setItem("clickedButton", `Slat${i}`);
            window.location.href = "insideFolder.html";
        });

        container.appendChild(button);
    }
    document.getElementById("homeBtn").addEventListener("click", () => {
        window.location.href = "index.html";
    });
});
