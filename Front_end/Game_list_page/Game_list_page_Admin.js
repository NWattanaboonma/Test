let rooturl = "http://localhost:3000/Game_list_page_Admin";
let users = null;

function getGames() {
    fetch(rooturl)
        .then((res) => res.json())
        .then((data) => {
            users = data.data;
            console.log(users);
            addDataToHTML();
        })
        .catch((err) => {
            console.error(err);
        });
}

let listUser = document.querySelector('.big-games');

function addDataToHTML() {
    if (users && users.length > 0) {
        users.forEach(user => {
            // Create new element for each user
            let newUser = document.createElement('div');
            newUser.classList.add('user-list-container');
            newUser.innerHTML = `
                <div id="user-list">
                    <p><strong>ID:</strong> ${user.GameName}</p>
                    <p><strong>Description:</strong> ${user.GameDescription}</p>
                    <p><strong>Price:</strong> ${user.GamePrice}</p>
                    <div class="action-buttons">
                        <button class="approve-button">Approve</button>
                        <button class="reject-button">Reject</button>
                    </div>
                </div>
            `;
            // Find the edit button and attach a click event
            let editButton = newUser.querySelector('.approve-button');
            editButton.addEventListener('click', function () {
                // Show confirmation dialog
                const confirmed = confirm("Are you sure you want to approve this game?");
                
                if (confirmed) {
                    // Proceed with deletion (replace the following line with the actual delete logic)
                    fetch(`${rooturl}/approve/${user.GameName}`, {
                        method: 'PUT'
                    })
                    .then(response => {
                        if (response.ok) {
                            alert("Game approve successfully");
                            // Reload game list to reflect deletion
                            listUser.innerHTML = '';  // Clear existing games
                            getGames(); // Re-fetch games and update list
                        } else {
                            alert("Failed to approve game");
                        }
                    })
                    .catch(err => console.error("Error:", err));
                }
            });


            let rejectButton = newUser.querySelector('.reject-button');
            rejectButton.addEventListener('click', function () {
                // Show confirmation dialog
                const confirmed = confirm("Are you sure you want to reject this game?");
                
                if (confirmed) {
                    // Proceed with deletion (replace the following line with the actual delete logic)
                    fetch(`${rooturl}/reject/${user.GameName}`, {
                        method: 'PUT'
                    })
                    .then(response => {
                        if (response.ok) {
                            alert("Game rejected successfully");
                            // Reload game list to reflect deletion
                            listUser.innerHTML = '';  // Clear existing games
                            getGames(); // Re-fetch games and update list
                        } else {
                            alert("Failed to reject game");
                        }
                    })
                    .catch(err => console.error("Error:", err));
                }
            });

            // Add the game element to the list
            listUser.appendChild(newUser);
        });
    } else {
        console.log("No Customers found.");
    }
}



// Call getProducts function to fetch and display products
getGames();
