document.addEventListener("DOMContentLoaded", () => {
    const boxContainer = document.querySelector(".box-container");
    const backBtn = document.getElementById("backBtn");
    const ratingTitle = document.getElementById("ratingTitle");

    // Navigate back to the main page
    backBtn.addEventListener("click", () => {
        window.location.href = "rate.html";
    });

    // Retrieve the clicked rating from localStorage
    const selectedRating = localStorage.getItem("clickedButton");
    if (!selectedRating) {
        alert("No rating selected. Redirecting to the main page.");
        window.location.href = "rate.html";
        return;
    }

    // Dynamically set the page title and the heading text
    try {
        // Set both the document title and the h1 element
        document.title = `${selectedRating} Star`;
        ratingTitle.textContent = `${selectedRating}💗 JAV`; // Update the h1 text
    } catch (error) {
        console.error("Error setting page title:", error);
    }

    try {
        // Collect all IDs with the selected rating into an array
        const matchedIDs = [];
        for (const [id, rating] of Object.entries(ratingMap)) {
            if (rating === parseInt(selectedRating)) {
                matchedIDs.push(id);
            }
        }

        if (matchedIDs.length === 0) {
            boxContainer.innerHTML = `<p>No items found for rating ${selectedRating}.</p>`;
            return;
        }

        // Dynamically create boxes for matching IDs
        matchedIDs.forEach(id => {
            const button = document.createElement("div");
            button.className = "box";

            // Upper part: Image
            const imagePart = document.createElement("div");
            imagePart.className = "image-part";

            const img = document.createElement("img");
            img.src = `Mv/${id}.jpg`; // Default to .jpg
            img.alt = id;
            img.onerror = () => {
                img.src = `Mv/${id}.png`; // Fallback to .png if .jpg is not found
            };

            imagePart.appendChild(img);

            // Lower part: Title
            const titlePart = document.createElement("div");
            titlePart.className = "title-part";
            titlePart.textContent = id;

            button.appendChild(imagePart);
            button.appendChild(titlePart);

            // Add click functionality to open a blank page
            button.addEventListener("click", () => {
                window.location.href = `index.html?id=${encodeURIComponent(id)}`;
            });

            boxContainer.appendChild(button);
        });
    } catch (error) {
        console.error("Error loading or processing data:", error);
        boxContainer.innerHTML = `
            <p>An error occurred while loading data. Please check the console for details.</p>
        `;
    }
});
