// let rooturl = "http://localhost:3000/Game_list_page_Dev";
// let users = null;

// function getGames() {
//     fetch(rooturl)
//         .then((res) => res.json())
//         .then((data) => {
//             users = data.data;
//             console.log(users);
//             addDataToHTML();
//         })
//         .catch((err) => {
//             console.error(err);
//         });
// }

// let listUser = document.querySelector('.big-games');

// function addDataToHTML() {
//     if (users && users.length > 0) {
//         users.forEach(user => {
//             // Create new element for each user
//             let newUser = document.createElement('div');
//             newUser.classList.add('user-list-container');
            
//             let uploadStatus;
//             let statusColor;
            
//             if (user.isApproved === 0) {
//                 uploadStatus = "Pending Approval";
//                 statusColor = "orange"; // Set color for pending
//             } else if (user.isApproved === 1) {
//                 uploadStatus = "Approved";
//                 statusColor = "green"; // Set color for approved
//             } else {
//                 uploadStatus = "Rejected";
//                 statusColor = "red"; // Set color for rejected
//             }
            
//             newUser.innerHTML = `
//                 <div id="user-list">
//                     <p><strong>ID:</strong> ${user.GameName}</p>
//                     <p><strong>Description:</strong> ${user.GameDescription}</p>
//                     <p><strong>Price:</strong> ${user.GamePrice}</p>
//                     <p><strong>Status:</strong> <span style="color: ${statusColor};">${uploadStatus}</span></p>
//                     <div class="action-buttons">
//                         <button class="edit-button" data-username="${user.GameSpecification}">Edit</button>
//                         <button class="delete-button">Delete</button>
//                     </div>
//                 </div>
//             `;            

//             // Find the edit button and attach a click event
//             let editButton = newUser.querySelector('.edit-button');
//             editButton.addEventListener('click', function() {
//                 window.location.href = `Edit_User_Page.html?gameID=${user.GameName}&type=gameedit`;
//             });


//             let deleteButton = newUser.querySelector('.delete-button');
//             deleteButton.addEventListener('click', function () {
//                 // Show confirmation dialog
//                 const confirmed = confirm("Are you sure you want to delete this game?");
                
//                 if (confirmed) {
//                     // Proceed with deletion (replace the following line with the actual delete logic)
//                     fetch(`${rooturl}/${user.GameName}`, {
//                         method: 'DELETE'
//                     })
//                     .then(response => {
//                         if (response.ok) {
//                             alert("Game deleted successfully");
//                             // Reload game list to reflect deletion
//                             listUser.innerHTML = '';  // Clear existing games
//                             getGames(); // Re-fetch games and update list
//                         } else {
//                             alert("Failed to delete game");
//                         }
//                     })
//                     .catch(err => console.error("Error:", err));
//                 }
//             });

//             // Add the game element to the list
//             listUser.appendChild(newUser);
//         });
//     } else {
//         console.log("No Customers found.");
//     }
// }



// // Call getProducts function to fetch and display products
// getGames();

// let addButton = document.querySelector('.add-user-button');
// addButton.addEventListener('click', function() {
//     window.location.href = `Edit_User_Page.html?type=gameupload`; // No gameID in the URL
// });
// document.addEventListener("DOMContentLoaded", async () => {
//     let account;

//     const fetchUserList = async () => {
//         const apiUrl = 'http://localhost:3000/name_list'; 

//         try {
//             const response = await fetch(apiUrl, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();

//             if (data.error) {
//                 console.error("Error fetching user list:", data.message);
//                 return;
//             }
            
//             const list = data.data;
//             list.forEach(user => {
//                 if (user.Name === sessionStorage.getItem(`${user.Name}`)) {
//                     account = user.Name; // Set account here
//                 }
//             });

//         } catch (error) {
//             console.error("Fetch error:", error);
//         }
//     };

//     await fetchUserList();
//     console.log("Account:", account);
// });
document.addEventListener("DOMContentLoaded", async () => {
    let account;

    const fetchUserList = async () => {
        const apiUrl = 'http://localhost:3000/name_list';

        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.error) {
                console.error("Error fetching user list:", data.message);
                return;
            }

            const list = data.data;
            list.forEach(user => {
                if (user.Name === sessionStorage.getItem(`${user.Name}`)) {
                    account = user.Name; // Set account here
                }
            });

        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const fetchGames = async () => {
        const apiUrl = 'http://localhost:3000/Game_list_page_Dev';

        if (!account) {
            console.error("No account set. Cannot fetch games.");
            return;
        }

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    owner: account // Use account as owner
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.error) {
                console.error("Error fetching games:", data.message);
                return;
            }

            const users = data.data;
            console.log("Games:", users);

            addDataToHTML(users);

        } catch (error) {
            console.error("Fetch error:", error);
        }
    };
    const addDataToHTML = (users) => {
        let listUser = document.querySelector('.big-games');

        if (users && users.length > 0) {
            users.forEach(user => {
                let newUser = document.createElement('div');
                newUser.classList.add('user-list-container');

                let uploadStatus;
                let statusColor;

                if (user.isApproved === 0) {
                    uploadStatus = "Pending Approval";
                    statusColor = "orange";
                } else if (user.isApproved === 1) {
                    uploadStatus = "Approved";
                    statusColor = "green";
                } else {
                    uploadStatus = "Rejected";
                    statusColor = "red";
                }

                newUser.innerHTML = `
                    <div id="user-list">
                        <p><strong>ID:</strong> ${user.GameName}</p>
                        <p><strong>Description:</strong> ${user.GameDescription}</p>
                        <p><strong>Price:</strong> ${user.GamePrice}</p>
                        <p><strong>Status:</strong> <span style="color: ${statusColor};">${uploadStatus}</span></p>
                        <div class="action-buttons">
                            <button class="edit-button" data-username="${user.GameSpecification}">Edit</button>
                            <button class="delete-button">Delete</button>
                        </div>
                    </div>
                `;

                let editButton = newUser.querySelector('.edit-button');
                editButton.addEventListener('click', function() {
                    window.location.href = `Edit_User_Page.html?gameID=${user.GameName}&type=gameedit`;
                });
                apiUrl = 'http://localhost:3000/Game_list_page_Dev'
                let deleteButton = newUser.querySelector('.delete-button');
                deleteButton.addEventListener('click', function () {
                    const confirmed = confirm("Are you sure you want to delete this game?");
                    
                    if (confirmed) {
                        fetch(`${apiUrl}/${user.GameName}`, {
                            method: 'DELETE'
                        })
                        .then(response => {
                            if (response.ok) {
                                alert("Game deleted successfully");
                                listUser.innerHTML = '';
                                fetchGames();
                            } else {
                                alert("Failed to delete game");
                            }
                        })
                        .catch(err => console.error("Error:", err));
                    }
                });

                listUser.appendChild(newUser);
            });
        } else {
            console.log("No games found.");
        }
    };
    await fetchUserList();
    console.log("Account:", account);
    await fetchGames();
    document.querySelector('.add-user-button').addEventListener('click', () => {
        const url = 'http://localhost:1234/Edit_User_Page.html?type=gameupload';
        console.log("Redirecting to:", url); // Debugging step
        window.location.href = url;
    });
    
});
