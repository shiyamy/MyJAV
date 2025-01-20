document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".button-container");
    const dialogBox = document.getElementById("dialogBox");
    const chatMessage = document.getElementById("chatMessage");

    // Chat messages stored in the JS file


    // Generate buttons dynamically (7x10 matrix = 70 buttons)
    for (let i = 1; i <= 7; i++) {
        const button = document.createElement("button");
        if (i < 8) { button.className = "button"; }
        else{ button.className = "buttonn"; }

        const buttonText = document.createElement("span");
        buttonText.innerText = `${i}`;
        button.appendChild(buttonText);

        // Attach click event to navigate
        button.addEventListener("click", () => {
            localStorage.setItem("clickedButton", `${i}`);
            window.location.href = "rateInside.html";
        });

        container.appendChild(button);
    }

    const chatData = `1*: All
                        2*: Little good
                        3*: Watchable
                        4*: Between and Confuse
                        5*: Good and maybe I
                        6*: What I want
                        7*: Extraordinary`;
    // Open dialog with chat message on clicking homeBtn
    document.getElementById("homeBtn").addEventListener("click", () => {
        window.location.href = "index.html";
    });
    document.getElementById("dialogBtn").addEventListener("click", () => {
        chatMessage.textContent = chatData;
        dialogBox.classList.remove("hidden");
    });
    closeBtn.addEventListener("click", () => {
        dialogBox.classList.add("hidden");
    });
});
