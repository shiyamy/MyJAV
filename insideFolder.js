document.addEventListener("DOMContentLoaded", () => {
    const boxContainer = document.querySelector(".box-container");
    const pageTitle = document.getElementById("page-title");

    const clickedButton = localStorage.getItem("clickedButton");
    pageTitle.textContent = clickedButton || "Folder Details";

    const values = slatData?.[clickedButton] || [];

    for (let i = 0; i < 18; i++) {
        const button = document.createElement("button");
        button.className = "box";

        if (i === 0) {
            button.classList.add("button-box");
            button.innerHTML = "<span>📂</span>";
            button.addEventListener("click", () => {
                window.location.href = "folder.html";
            });
        } else {
            const titleText = values[i - 1] || `ABC-${i.toString().padStart(3, "0")}`;

            const imagePart = document.createElement("div");
            imagePart.className = "image-part";
            const img = document.createElement("img");
            img.src = `Mv/${titleText}.jpg`;
            img.alt = titleText;
            img.onerror = () => {
                img.src = `Mv/${titleText}.png`;
                img.onerror = () => {
                    img.src = `Mv/${titleText}.jpeg`;
                    img.onerror = () => {
                        img.src = "noImage.png";
                    };
                };
            };
            imagePart.appendChild(img);

            const title = document.createElement("div");
            title.className = "title-part";
            title.textContent = titleText;

            button.appendChild(imagePart);
            button.appendChild(title);

            button.addEventListener("click", () => {
                window.location.href = `index.html?id=${encodeURIComponent(titleText)}`;
            });
        }

        boxContainer.appendChild(button);
    }
});
