let rooturl = "http://localhost:3000/devs_list";
let users = null;

function getDevelopers() {
    fetch(rooturl)
        .then((res) => res.json())
        .then((data) => {
            users = data.data;
            console.log(users);
            addDataToHTML();
        })
        .catch((err) => {
            console.error(err);
            document.querySelector(".comming-soon").innerHTML += "<br><p>No Developers Found</p>";
        });
}

let listUser = document.querySelector('.big-dev');

function addDataToHTML() {
    if (users && users.length > 0) {
        users.forEach(user => {
            // Create new element for each user
            let newUser = document.createElement('div');
            newUser.classList.add('user-list-container');
            newUser.innerHTML = `
                <div id="user-list">
                    <p><strong>ID:</strong> ${user.DeveloperID}</p>
                    <p><strong>Name:</strong> ${user.DevName}</p>
                    <p><strong>Email:</strong> ${user.Email}</p>
                    <div class="action-buttons">
                        <button class="edit-button" data-username="${user.DeveloperID}">Edit</button>
                        <button class="delete-button">Delete</button>
                    </div>
                </div>
            `;
            
            // Find the edit button and attach a click event
            let editButton = newUser.querySelector('.edit-button');
            editButton.addEventListener('click', function() {
                window.location.href = `Edit_User_Page.html?devID=${user.DeveloperID}&type=dev`;
            });

            let deleteButton = newUser.querySelector('.delete-button');
            deleteButton.addEventListener('click', function () {
                // Show confirmation dialog
                const confirmed = confirm("Are you sure you want to delete this developer?");
                
                if (confirmed) {
                    // Proceed with deletion (replace the following line with the actual delete logic)
                    fetch(`${rooturl}/${user.DeveloperID}`, {
                        method: 'DELETE'
                    })
                    .then(response => {
                        if (response.ok) {
                            alert("Developer deleted successfully");
                            // Reload user list to reflect deletion
                            listUser.innerHTML = '';  // Clear existing users
                            getDevelopers(); // Re-fetch users and update list
                        } else {
                            alert("Failed to delete developer");
                        }
                    })
                    .catch(err => console.error("Error:", err));
                }
            });

            // Add the user element to the list
            listUser.appendChild(newUser);
        });
    } else {
        console.log("No Developers found.");
    }
}



// Call getProducts function to fetch and display products
getDevelopers();