window.onload = function() {
    const gallery = document.getElementById('actress-gallery');
    const imageFolder = 'Best/'; // The folder with images
    const extensions = ['.jpg', '.jpeg', '.png']; // Supported image extensions

    actressNames.forEach(actressName => {
        let imagePath = ''; // Variable to store the valid image path

        // Try all extensions for each actress image
        for (let ext of extensions) {
            const potentialPath = `${imageFolder}${actressName}${ext}`;
            
            const img = new Image();
            img.src = potentialPath;

            // If the image is valid (exists and can be loaded), use this path
            img.onload = () => {
                imagePath = potentialPath;

                const button = document.createElement("button");
                button.className = "box";

                const imgElement = document.createElement('img');
                imgElement.src = imagePath;
                imgElement.alt = actressName;

                const p = document.createElement('p');
                p.textContent = actressName;

                button.appendChild(imgElement);
                button.appendChild(p);

                gallery.appendChild(button);

                button.addEventListener("click", () => {
                    window.location.href = `index.html?act=${encodeURIComponent(actressName)}`;
                });
            };

            // Stop the loop if we found a valid image
            if (imagePath) {
                break;
            }
        }

        // If no valid image is found for the actress, log an error (optional)
        if (!imagePath) {
            console.error(`No image found for ${actressName}`);
        }
    });
    document.getElementById("homeBtn").addEventListener("click", () => {
        window.location.href = "index.html";
    });
    document.getElementById("backBtn").addEventListener("click", () => {
        window.location.href = "actress.html";
    });
};
