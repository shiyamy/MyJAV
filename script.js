document.getElementById("searchBtn").addEventListener("click", () => {
    const searchValue = document.getElementById("searchBox").value.trim();
    const photoElement = document.getElementById("photo");
    const idLabel = document.getElementById("idLabel");
    const idBox = document.getElementById("idBox");
    const titleLabel = document.getElementById("titleLabel");
    const titleBox = document.getElementById("titleBox");
    const bottomID = document.getElementById("bottomID");
    const actressContainer = document.getElementById("actressContainer");
    const heartRating = document.getElementById("heartRating");
    const slatContainer = document.getElementById("slatContainer");

    console.log("Search Value:", searchValue);

    const folderPath = './Mv/';
    const extensions = ['png', 'jpg', 'jpeg', 'gif'];

    let imageFound = false;

    // Reset hearts and actress container before updating
    const hearts = heartRating.getElementsByClassName("heart");
    for (const heart of hearts) {
        heart.classList.remove("filled");
    }
    actressContainer.innerHTML = '';

    for (const ext of extensions) {
        const filePath = `${folderPath}${searchValue}.${ext}`;
        console.log("Checking file path:", filePath);

        const img = new Image();
        img.src = filePath;

        img.onload = () => {
            if (!imageFound) {
                photoElement.src = filePath;
                idLabel.textContent = '';
                idBox.textContent = searchValue;
                bottomID.textContent = searchValue; // Update text content instead of value

                titleLabel.textContent = '';
                titleBox.textContent = titleMap[searchValue] || "Title not found";

                // Populate actress names as clickable links
                const actresses = actressMap[searchValue] || [];
                if (actresses.length) {
                    actresses.forEach((actress) => {
                        const actressLink = document.createElement('a');
                        actressLink.textContent = actress;
                        actressLink.href = '#';
                        actressLink.addEventListener('click', () => {
                            displayActressPhotoAndUpdateTitle(actress);
                            updateIDBoxForActress(actress);
                        });
                        actressContainer.appendChild(actressLink);
                        actressContainer.appendChild(document.createTextNode(', '));
                    });
                    actressContainer.lastChild.remove(); // Remove trailing comma
                } else {
                    actressContainer.textContent = "Actress not found";
                }

                // Set rating from ratingMap
                const rating = ratingMap[searchValue] || 0;
                for (let i = 0; i < rating; i++) {
                    hearts[i].classList.add("filled");
                }

                // Finding the folder
                const match = Object.keys(slatData).find(slat => slatData[slat].includes(searchValue));
                slatContainer.innerHTML = ''; // Clear previous IDs
                const slatLink = document.createElement('a');
                slatLink.textContent = match;
                slatLink.href = '#';
                slatLink.addEventListener('click', () => {
                    localStorage.setItem("clickedButton", `${match}`);
                    window.location.href = "insideFolder.html"; 
                });
                slatContainer.appendChild(slatLink);

                imageFound = true;
                console.log("Image loaded successfully:", filePath);
            }
        };

        img.onerror = () => {
            console.log("File not found:", filePath);
        };
    }

    setTimeout(() => {
        if (!imageFound) {
            alert("Image not found!");
            clearAllData();
        }
    }, 500);

    // Clear the search box after performing the search
    document.getElementById("searchBox").value = ''; // Reset search box
});

document.getElementById("searchBox").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const searchValue = document.getElementById("searchBox").value.trim();
        if (searchValue) {
            document.getElementById("searchBtn").click();
        }
    }
});

function displayActressPhotoAndUpdateTitle(actress) {
    const photoElement = document.getElementById("photo");
    const idBox = document.getElementById("idBox");
    const titleBox = document.getElementById("titleBox");
    const heartRating = document.getElementById("heartRating");
    const folderPath = './Act/';
    const extensions = ['png', 'jpg', 'jpeg', 'gif'];
    let photoFound = false;

    // Clear middle section, ID, and rating
    idBox.textContent = ''; // Clear ID
    titleBox.textContent = actress; // Set actress name as title

    // Clear ID in the left side of the bottom part
    const bottomID = document.getElementById("bottomID");
    bottomID.textContent = ''; // Clear the ID on the bottom left panel

    // Reset the hearts
    const hearts = heartRating.getElementsByClassName("heart");
    for (const heart of hearts) {
        heart.classList.remove("filled");
    }

    // Search for actress photo in the Act folder
    for (const ext of extensions) {
        const filePath = `${folderPath}${actress}.${ext}`;
        console.log("Checking actress photo path:", filePath);

        const img = new Image();
        img.src = filePath;

        img.onload = () => {
            if (!photoFound) {
                photoElement.src = filePath;
                photoFound = true;
                console.log("Actress photo loaded:", filePath);
            }
        };

        img.onerror = () => {
            console.log("Actress photo not found:", filePath);
        };
    }

    setTimeout(() => {
        if (!photoFound) {
            alert(`Photo for actress ${actress} not found!`);
        }
    }, 500);
}

function updateIDBoxForActress(actress) {
    const bottomID = document.getElementById("bottomID");

    // Iterate through actressMap to find all IDs where the actress appears
    const matchingIDs = Object.keys(actressMap).filter(id => actressMap[id].includes(actress));

    // Display all matching IDs as clickable links in the ID box on the right side of the bottom part
    bottomID.innerHTML = ''; // Clear previous IDs
    if (matchingIDs.length > 0) {
        matchingIDs.forEach(id => {
            const idLink = document.createElement('a');
            idLink.textContent = id;
            idLink.href = '#';
            idLink.addEventListener('click', () => {
                displayPhotoAndTitleForID(id); // Custom function to handle ID clicks
            });
            bottomID.appendChild(idLink);
            bottomID.appendChild(document.createTextNode(', '));
        });
        bottomID.lastChild.remove(); // Remove trailing comma
    } else {
        bottomID.textContent = "No IDs found";
    }
}

function displayPhotoAndTitleForID(id) {
    const photoElement = document.getElementById("photo");
    const idBox = document.getElementById("idBox");
    const titleBox = document.getElementById("titleBox");
    const heartRating = document.getElementById("heartRating");
    const slatContainer = document.getElementById("slatContainer");
    const folderPath = './Mv/';
    const extensions = ['png', 'jpg', 'jpeg', 'gif'];
    let imageFound = false;

    // Reset the hearts and title
    idBox.textContent = id; // Set ID
    titleBox.textContent = titleMap[id] || "Title not found";

    // Reset the hearts
    const hearts = heartRating.getElementsByClassName("heart");
    for (const heart of hearts) {
        heart.classList.remove("filled");
    }

    // Finding the folder
    const match = Object.keys(slatData).find(slat => slatData[slat].includes(id));
    slatContainer.innerHTML = ''; // Clear previous IDs
    const slatLink = document.createElement('a');
    slatLink.textContent = match;
    slatLink.href = '#';
    slatLink.addEventListener('click', () => {
        localStorage.setItem("clickedButton", `${match}`);
        window.location.href = "insideFolder.html"; 
    });
    slatContainer.appendChild(slatLink);

    for (const ext of extensions) {
        const filePath = `${folderPath}${id}.${ext}`;
        console.log("Checking file path for ID:", filePath);

        const img = new Image();
        img.src = filePath;

        img.onload = () => {
            if (!imageFound) {
                photoElement.src = filePath;
                imageFound = true;
                console.log("Image loaded successfully for ID:", filePath);
            }
        };

        img.onerror = () => {
            console.log("File not found for ID:", filePath);
        };
    }

    setTimeout(() => {
        if (!imageFound) {
            alert("Image not found for ID!");
            clearAllData();
        }
    }, 500);

    // Update Rating for this ID from rating.js
    const rating = ratingMap[id] || 0;
    const heartsRating = heartRating.getElementsByClassName("heart");
    for (let i = 0; i < heartsRating.length; i++) {
        if (i < rating) {
            heartsRating[i].classList.add("filled");
        } else {
            heartsRating[i].classList.remove("filled");
        }
    }

    // Update Actress for this ID from actress.js
    const actresses = actressMap[id] || [];
    const actressContainer = document.getElementById("actressContainer");
    actressContainer.innerHTML = ''; // Clear previous actresses

    if (actresses.length) {
        actresses.forEach((actress) => {
            const actressLink = document.createElement('a');
            actressLink.textContent = actress;
            actressLink.href = '#';
            actressLink.addEventListener('click', () => {
                displayActressPhotoAndUpdateTitle(actress);
                updateIDBoxForActress(actress);
            });
            actressContainer.appendChild(actressLink);
            actressContainer.appendChild(document.createTextNode(', '));
        });
        actressContainer.lastChild.remove(); // Remove trailing comma
    } else {
        actressContainer.textContent = "Actress not found";
    }
}

document.getElementById('folderBtn').addEventListener('click', function() {
    // Open the folder.html file in the same directory
    window.location.href = 'folder.html';  // This will load the folder.html page
});

document.getElementById('actressBtn').addEventListener('click', function() {
    // Open the folder.html file in the same directory
    window.location.href = 'actress.html';  // This will load the folder.html page
});

document.getElementById('rateBtn').addEventListener('click', function() {
    // Open the folder.html file in the same directory
    window.location.href = 'rate.html';  // This will load the folder.html page
});

document.getElementById('titleBtn').addEventListener('click', function() {
    // Open the folder.html file in the same directory
    window.location.href = 'title.html';  // This will load the folder.html page
});

document.addEventListener("DOMContentLoaded", () => {
    // Check if an ID is passed in the query string
    const urlParams = new URLSearchParams(window.location.search);
    const searchValue = urlParams.get('id');
    const searchActress = urlParams.get('act');

    if (searchValue) {
        performSearch(searchValue);
    }
    if (searchActress) {
        document.getElementById("idLabel").textContent = '';
        document.getElementById("titleLabel").textContent = '';
        displayActressPhotoAndUpdateTitle(searchActress);
        updateIDBoxForActress(searchActress);
        document.getElementById("actressContainer").textContent = searchActress;
    }
});

function performSearch(searchValue) {
    const searchBox = document.getElementById("searchBox");
    searchBox.value = searchValue; // Set the search box value for user visibility
    document.getElementById("searchBtn").click(); // Trigger the search
}

function clearAllData() {
    document.getElementById("photo").src = '';
    document.getElementById("idLabel").textContent = 'ID';
    document.getElementById("idBox").textContent = '';
    document.getElementById("titleLabel").textContent = 'Title';
    document.getElementById("titleBox").textContent = '';
    document.getElementById("bottomID").textContent = ''; // Clear text content
    document.getElementById("heartRating").querySelectorAll('.heart').forEach(heart => heart.classList.remove('filled'));
    document.getElementById("actressContainer").textContent = '';
}