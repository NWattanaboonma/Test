let account; // Define account outside to make it accessible globally

document.addEventListener("DOMContentLoaded", async () => {


    // Fetch the user list to get the logged-in account
    const fetchUserList = async () => {
        const apiUrl = 'http://localhost:3000/name_list';
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            if (data.error) throw new Error(data.message);

            const list = data.data;
            list.forEach(user => {
                if (user.Name === sessionStorage.getItem(`${user.Name}`)) {
                    account = user.Name; // Set the logged-in account
                    console.log("Logged-in account:", account);
                }
            });
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    await fetchUserList();

    // Set the Developer Name Field
    const gameDevField = document.getElementById("GameDev");
    if (gameDevField) {
        if (account) {
            gameDevField.disabled = true; // Disable the field for consistency
            gameDevField.value = account; // Set it to the logged-in account
        } else {
            console.error("No account found for developer name.");
            gameDevField.value = ""; // Default to empty if account is unavailable
        }
    }

    // Handle type parameter from URL
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');

    if (type === 'gameupload') {
        loadEditForm(type);
        console.log("Preparing form for game upload.");
        // Additional logic for upload-specific behavior can go here
    } else if (type === 'gameedit') {
        console.log("Preparing form for game edit.");
        loadEditForm(type); // Pass the type to load existing data
    } else {
        console.error("Invalid type specified in the URL.");
    }
});



// Function to load the edit form based on type (gameedit, gameupload, user, etc.)
function loadEditForm(type) {
    if (type === 'user') {
        console.log(type)
        const devButton = document.querySelector(".save-dev-button");
        if (devButton) devButton.remove();
        const gameButton = document.querySelector(".save-game-button");
        if (gameButton) gameButton.remove();
        const gameuploadButton = document.querySelector(".upload-game-button");
        if (gameuploadButton) gameuploadButton.remove();
        loadUserEditForm();
    } else if (type === 'gameedit') {
        console.log(type)
        const devButton = document.querySelector(".save-dev-button");
        if (devButton) devButton.remove();
        const userButton = document.querySelector(".save-user-button");
        if (userButton) userButton.remove();
        const gameuploadButton = document.querySelector(".upload-game-button");
        if (gameuploadButton) gameuploadButton.remove();
        loadGameEditForm();
    } else if (type === 'gameupload') {
        console.log(type)
        const devButton = document.querySelector(".save-dev-button");
        if (devButton) devButton.remove();
        const userButton = document.querySelector(".save-user-button");
        if (userButton) userButton.remove();
        const gameButton = document.querySelector(".save-game-button");
        if (gameButton) gameButton.remove();
        loadGameEditForm();  // Update this to load the upload form
    } else if (type === 'dev') {
        console.log(type)
        const userButton = document.querySelector(".save-user-button");
        if (userButton) userButton.remove();
        const gameButton = document.querySelector(".save-game-button");
        if (gameButton) gameButton.remove();  
        const gameuploadButton = document.querySelector(".upload-game-button");
        if (gameuploadButton) gameuploadButton.remove();
        loadDevEditForm();
    } else {
        document.getElementById('container').innerHTML = '<p>Invalid edit type.</p>';
    }
}

// Helper function to remove existing buttons before loading the new form
function removeExistingButtons() {
    // You can define the buttons you want to remove by their class names or IDs
    const buttons = [
        ".save-dev-button",
        ".save-game-button",
        ".upload-game-button",
        ".save-user-button"
    ];

    buttons.forEach(buttonSelector => {
        const button = document.querySelector(buttonSelector);
        if (button) {
            button.remove();
        }
    });
}

// Function to load the game edit form
async function loadGameEditForm() {
    // Ensure the container exists
    const container = document.querySelector('.container');
    if (!container) {
        console.error("Container element not found.");
        return;
    }

    // Change the title to "Edit Game"
    const title = document.querySelector(".user-list-title");
    if (title) {
        title.textContent = "Edit Game";
    }

    // Populate the form
    container.innerHTML = `
        <form id="edit-game-form">
            <label for="GameName">Name:</label>
            <input type="text" id="GameName" name="GameName" disabled><br><br>

            <label for="GameDescription">Description:</label>
            <input type="text" id="GameDescription" name="GameDescription"><br><br>

            <label for="GamePrice">Price:</label>
            <input type="number" id="GamePrice" name="GamePrice"><br><br>

            <label for="GameSpec">Specification:</label>
            <input type="text" id="GameSpec" name="GameSpec"><br><br>

            <label for="GameGenre">Genre:</label>
            <input type="text" id="GameGenre" name="GameGenre"><br><br>

            <label for="GameFeature">Feature:</label>
            <input type="text" id="GameFeature" name="GameFeature"><br><br>

            <label for="GameDev">Developer Name:</label>
            <input type="text" id="GameDev" name="GameDev" disabled><br><br>

            <label for="GamePatch">Patch:</label>
            <input type="text" id="GamePatch" name="GamePatch"><br><br>

            <label for="GameRate">Rating:</label>
            <input type="text" id="GameRate" name="GameRate" disabled><br><br>

            <label for="GameReview">Review:</label>
            <input type="text" id="GameReview" name="GameReview" disabled><br><br>

            <label for="GamePackage">Package:</label>
            <input type="text" id="GamePackage" name="GamePackage"><br><br>

            <label for="fileInput">Choose a file:</label>
            <input type="file" id="fileInput" required>
        </form>
    `;

    document.querySelector("#GameDev").value = account; // Set the developer name

    // Get the gameID from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const gameID = urlParams.get('gameID');
    const gameNameField = document.querySelector("#GameName");

    if (gameID) {
        gameNameField.value = gameID; // Set the value to gameID
    } else {
        console.warn("No gameID found in the URL.");
        gameNameField.disabled = false; // Enable the GameName field if no gameID
    }
    document.querySelector("#GameRate").value = "0.00";

    // Fetch data from the server using gameID
    if (gameID) {
        try {
            const response = await fetch(`http://localhost:3000/get_game?gameID=${encodeURIComponent(gameID)}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch game data: ${response.statusText}`);
            }

            const { data } = await response.json();
            console.log("Fetched game data:", data);

            // Populate form fields with the fetched data
            document.querySelector("#GameName").value = data.GameName || "";
            document.querySelector("#GameDescription").value = data.GameDescription || "";
            document.querySelector("#GamePrice").value = data.GamePrice || "";
            document.querySelector("#GameSpec").value = data.GameSpecification || "";
            document.querySelector("#GameGenre").value = data.GameGenre || "";
            document.querySelector("#GameFeature").value = data.GameFeatures || "";
            document.querySelector("#GameDev").value = data.DeveloperName || account; // Set Developer Name
            document.querySelector("#GamePatch").value = data.GamePatch || "";
            document.querySelector("#GameRate").value = data.GameRatingscore || "";
            document.querySelector("#GameReview").value = data.GameReview || "";
            document.querySelector("#GamePackage").value = data.GamePackage || "";
        } catch (error) {
            console.error("Error fetching game data:", error);
        }
    }
}
// Update user function for submitting edited data
function updateUser(event) {
    event.preventDefault();
    
    // Get form data
    let userID = document.querySelector("#user-id").value;
    let name = document.querySelector("#user-name").value;
    let email = document.querySelector("#user-email").value;
    // Ensure all fields are filled
    if (!userID || !name || !email) {
        alert("All fields are required!");
        return;
    }

    // Construct the URL with the parameters to send to the server
    let rooturl = 'http://localhost:3000/edit_user_list?userID=${encodeURIComponent(userID)}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}';

    console.log("Sending PUT request to:", rooturl);

    // Send PUT request to the server
    fetch(rooturl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.error) {
            alert("Error: No user found or failed to update.");
        } else {
            alert("User has been updated successfully.");
            window.location.href = '/User_list';
        }
    })
    .catch((err) => {
        console.error(err);
        alert("Error updating user.");
    });
}

function uploadGame(event) {
    event.preventDefault();

    // Gather form data
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a file to upload.');
        return;
      }
    
      // Extract and modify the file name (remove extension and add ".exe")
      const modifiedName = file.name.split('.').slice(0, -1).join('.');   
    const gameData = {
        name: document.querySelector("#GameName").value,
        description: document.querySelector("#GameDescription").value,
        price: parseFloat(document.querySelector("#GamePrice").value),
        spec: document.querySelector("#GameSpec").value,
        genre: document.querySelector("#GameGenre").value,
        feature: document.querySelector("#GameFeature").value,
        developer: document.querySelector("#GameDev").value,
        patch: document.querySelector("#GamePatch").value,
        rating: document.querySelector("#GameRate").value,
        review: document.querySelector("#GameReview").value,
        package: document.querySelector("#GamePackage").value,
        filepatch: modifiedName
    };

    // Validate required fields
    if (!gameData.name || isNaN(gameData.price)) {
        alert("Please fill all required fields and ensure price and rating are valid numbers.");
        return;
    }

    // Send PUT request to update the game
    fetch('http://localhost:3000/add_game_list', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData)
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                alert("Error adding game: " + data.message);
            } else {
                alert("Game added successfully.");
                window.location.href = '/Dev_Game_list';
            }
        })
        .catch((err) => {
            console.error("Error adding game:", err);
            alert("An error occurred while adding the game.");
        });
    
}

function updateGame(event) {
    event.preventDefault();

    // Get gameID from URL
    const gameID = new URLSearchParams(window.location.search).get('gameID');  
    if (!gameID) {
        alert("Game ID is missing in the URL.");
        return;
    }

    // Gather form data
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a file to upload.');
        return;
      }
    
      // Extract and modify the file name (remove extension and add ".exe")
      const modifiedName = file.name.split('.').slice(0, -1).join('.');
      
    
    const gameData = {
        name: document.querySelector("#GameName").value,
        description: document.querySelector("#GameDescription").value,
        price: parseFloat(document.querySelector("#GamePrice").value),
        spec: document.querySelector("#GameSpec").value,
        genre: document.querySelector("#GameGenre").value,
        feature: document.querySelector("#GameFeature").value,
        developer: document.querySelector("#GameDev").value,
        patch: document.querySelector("#GamePatch").value,
        rating: parseFloat(document.querySelector("#GameRate").value),
        review: document.querySelector("#GameReview").value,
        package: document.querySelector("#GamePackage").value,
        filepatch: modifiedName,
        isApproved: 0
    };

    // Validate required fields
    if (!gameData.name || isNaN(gameData.price) || isNaN(gameData.rating)) {
        alert("Please fill all required fields and ensure price and rating are valid numbers.");
        return;
    }

    // Send PUT request to update the game
    fetch('http://localhost:3000/edit_game_list?gameID=${encodeURIComponent(gameID)}', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData)
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.error) {
            alert("Error updating game: " + data.message);
        } else {
            alert("Game updated successfully.");
            // Redirect to /Dev_Game_list after successful update
            window.location.href = '/Dev_Game_list';
        }
    })
    .catch((err) => {
        console.error("Error updating game:", err);
        alert("An error occurred while updating the game.");
    });
}

function updateDev(event) {
    event.preventDefault();
    
    // Get form data
    let devID = document.querySelector("#user-id").value;
    let name = document.querySelector("#user-name").value;
    let email = document.querySelector("#user-email").value;

    // Ensure all fields are filled
    if (!devID || !name || !email) {
        alert("All fields are required!");
        return;
    }

    // Construct the URL with the parameters to send to the server
    let rooturl = 'http://localhost:3000/edit_dev_list?devID=${encodeURIComponent(devID)}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}';

    console.log("Sending PUT request to:", rooturl);

    // Send PUT request to the server
    fetch(rooturl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.error) {
            alert("Error: No developer found or failed to update.");
        } else {
            alert("Developer has been updated successfully.");
            // Redirect to /Dev_Game_list after successful update
            window.location.href = '/Game_Dev_list';
        }
    })
    .catch((err) => {
        console.error(err);
        alert("Error updating developer.");
    });
}