// // document.getElementById("login-form").addEventListener("submit", signin);

// // function signin(event) {
// //     event.preventDefault(); // Prevent default form submission behavior

// //     let username = document.querySelector("#Username").value;
// //     let password = document.querySelector("#password").value;

// //     if (!username || !password) {
// //         alert("Please enter both username and password.");
// //         return;
// //     }

    
// // let rooturl = `http://localhost:3000/signin`;

// // function setLoggedInState() {
// //     sessionStorage.setItem('loggedIn', 'true');
// // }

// // fetch(rooturl, {
// //     method: 'PUT',
// //     headers: {
// //         'Content-Type': 'application/json'
// //     },
// //     body: JSON.stringify({
// //         "Login_Info": {
// //             "L_username": username,
// //             "L_password": password
// //         }
// //     })
// // })
// // .then(response => {
// //     if (!response.ok) {
// //         throw new Error('Network response was not ok');
// //     }
// //     return response.json();
// // })
// // .then(data => {
// //     console.log(data);
// //     if (!data.error) {
// //         setLoggedInState();
// //         alert("Login successful");
// //         sessionStorage.setItem(`${username}`,username);
// //         // Handle redirection based on the response
// //         const fetchUserList = async () => {
// //             const apiUrl = 'http://localhost:3000/name_list';
// //             try {
// //               const response = await fetch(apiUrl, {
// //                 method: 'GET',
// //                 headers: {
// //                   'Content-Type': 'application/json',
// //                 },
// //               });
// //               const data = await response.json();
// //               if (data.error) {
// //                 console.error("Error fetching user list:", data.message);
// //                 return;
// //               }
// //               const list = data.data;
// //               list.forEach(user => {
// //                 if (user.Name === sessionStorage.getItem(`${user.Name}`)) {
// //                   if(user.Name === username){
// //                     sessionStorage.setItem(`${username}`, username);
// //                   } else {
// //                     sessionStorage.removeItem(`${user.Name}`);
// //                   }
// //                 }
// //               });
// //             } catch (error) {
// //               console.error("Fetch error:", error);
// //             }
// //           };
// //           fetchUserList();
// //         // work
// //         if (data.redirect) {
// //             window.location.href = data.redirect; // Redirect to the URL provided in the response
// //         } else {
// //             window.location.href = "/"; // Fallback if no redirect URL is provided
// //         }
// //     } else {
// //         alert(data.message);
// //     }
// // })
// // .catch(error => {
// //         console.error('Fetch error:', error);
// //         alert("Username or password is incorrect. Try again");
// // });
// // }
// 
document.getElementById("login-form").addEventListener("submit", signin);

function signin(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const username = document.querySelector("#Username").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    const rootUrl = `http://localhost:3000/signin`;

    // Utility to set logged-in state
    function setLoggedInState(username) {
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem(`${username}`, username); // Store username for session
    }

    // Utility to fetch user list and update session storage
    async function updateUserSession(username) {
        const apiUrl = 'http://localhost:3000/name_list';
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();

            if (data.error) {
                console.error("Error fetching user list:", data.message);
                return;
            }

            const list = data.data;
            list.forEach(user => {
                if (user.Name === sessionStorage.getItem(`${user.Name}`)) {
                    if (user.Name === username) {
                        sessionStorage.setItem(`${username}`, username);
                    } else {
                        sessionStorage.removeItem(`${user.Name}`);
                    }
                }
            });
        } catch (error) {
            console.error("Fetch error during user list update:", error);
        }
    }

    // Perform login request
    fetch(rootUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "Login_Info": {
                "L_username": username,
                "L_password": password
            }
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(async data => {
            console.log(data);

            if (!data.error) {
                setLoggedInState(username); // Set login state in session
                await updateUserSession(username); // Update user session

                alert("Login successful");

                // Log the account
                console.log(`Logged in account: ${username}`);

                // Redirect based on server response
                const redirectUrl = data.redirect || "/";
                window.location.href = redirectUrl; // Use provided redirect or fallback
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            alert("Please check your username and password and try again.");
        });
}

