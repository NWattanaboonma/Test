let rooturl = "http://localhost:3000/users_list";
let users = null;

function getCustomers() {
    fetch(rooturl)
        .then((res) => res.json())
        .then((data) => {
            users = data.data;
            console.log(users);
            addDataToHTML();
        })
        .catch((err) => {
            console.error(err);
            document.querySelector(".comming-soon").innerHTML += "<br><p>No Customers Found</p>";
        });
}

let listUser = document.querySelector('.big-user');

function addDataToHTML() {
    if (users && users.length > 0) {
        users.forEach(user => {
            // Create new element for each user
            let newUser = document.createElement('div');
            newUser.classList.add('user-list-container');
            newUser.innerHTML = `
                <div id="user-list">
                    <p><strong>ID:</strong> ${user.Username}</p>
                    <p><strong>Name:</strong> ${user.FirstName}</p>
                    <p><strong>Email:</strong> ${user.Email}</p>
                    <div class="action-buttons">
                        <button class="edit-button" data-username="${user.Username}">Edit</button>
                        <button class="delete-button">Delete</button>
                    </div>
                </div>
            `;
            
            // Find the edit button and attach a click event
            let editButton = newUser.querySelector('.edit-button');
            editButton.addEventListener('click', function() {
                window.location.href = `Edit_User_Page.html?userID=${user.Username}&type=user`;
            });

            let deleteButton = newUser.querySelector('.delete-button');
            deleteButton.addEventListener('click', function () {
                // Show confirmation dialog
                const confirmed = confirm("Are you sure you want to delete this user?");
                
                if (confirmed) {
                    // Proceed with deletion (replace the following line with the actual delete logic)
                    fetch(`${rooturl}/${user.Username}`, {
                        method: 'DELETE'
                    })
                    .then(response => {
                        if (response.ok) {
                            alert("User deleted successfully");
                            // Reload user list to reflect deletion
                            listUser.innerHTML = '';  // Clear existing users
                            getCustomers(); // Re-fetch users and update list
                        } else {
                            alert("Failed to delete user");
                        }
                    })
                    .catch(err => console.error("Error:", err));
                }
            });

            // Add the user element to the list
            listUser.appendChild(newUser);
        });
    } else {
        console.log("No Customers found.");
    }
}



// Call getProducts function to fetch and display products
getCustomers();