// Reference to the container div
const container = document.getElementById("container");

// Loop through each key-value pair in the titleMap object
for (const key in titleMap) {
    if (titleMap.hasOwnProperty(key)) {
        const button = document.createElement("div");
        button.className = "box";
        button.textContent = `${key}: ${titleMap[key]}`;
        container.appendChild(button);

        // Add click event listener
        button.addEventListener("click", (event) => {
            // Prevent triggering the click if text is selected
            if (window.getSelection().toString()) {
                return; // Exit if there is a text selection
            }
            // Only navigate if the click is directly on the .box
            window.location.href = `index.html?id=${encodeURIComponent(key)}`;
        });
    }
}

document.getElementById("homeBtn").addEventListener("click", () => {
    window.location.href = "index.html";
});
