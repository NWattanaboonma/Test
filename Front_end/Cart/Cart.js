document.addEventListener("DOMContentLoaded", async () => {
    let account;

    // Fetch user list to identify the logged-in user
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
                    account = user.Name; // Set the current user account
                }
            });
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    await fetchUserList();
    console.log("Account:", account); // Log account after it's set

    // Function to render the cart table
    async function CartTable() {
        const response = await fetch('http://localhost:3000/cart_list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: account }),
        });

        const data = await response.json();

        if (data.error) {
            console.error('Error fetching cart data:', data.message);
            return;
        }

        const cartTableBody = document.querySelector("#cartTable tbody");
        const totalPriceElement = document.getElementById('totalPrice');
        let totalPrice = 0;

        // Clear existing rows in the cart table
        cartTableBody.innerHTML = "";

        // Loop through the data to add rows for each game
        data.data.forEach(Cart => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${Cart.GameName}</td> <!-- GameName from API -->
                <td>$${parseFloat(Cart.GamePrice).toFixed(2)}</td> <!-- GamePrice -->
                <td><button class="remove-item" data-id="${Cart.CartID}">Remove</button></td>
            `;

            cartTableBody.appendChild(row);

            // Calculate the total price for all items in the cart
            totalPrice += parseFloat(Cart.GamePrice);
        });

        // Update the total price element only if it's not checkout
        if (totalPriceElement) {
            totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
        }
    }

    // Call CartTable to initially populate the cart
    CartTable();

    async function removeFromCart(cartID) {
        const apiUrl = 'http://localhost:3000/remove_cart'; // Ensure this is correct and matches the backend route
        try {
            const response = await fetch(apiUrl, {
                method: 'DELETE', // HTTP method for deleting
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                },
                body: JSON.stringify({ CartID: cartID }), // Send CartID in the request body
            });

            if (!response.ok) {
                throw new Error(`Failed to remove item. Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Item removed successfully:', data.message); // Log success message from server

            // Check if the response contains a message and return true if it's successful
            if (data.message && data.message === 'Item removed successfully') {
                return true;
            } else {
                console.error('Unexpected response:', data);
                return false; // Indicate failure if the response is not what we expected
            }
        } catch (error) {
            console.error('Error removing item:', error); // Log any errors
            return false;
        }
    }

    // Event listener for "Remove" button clicks (on each game row)
    document.querySelector("#cartTable tbody").addEventListener('click', async (event) => {
        console.log('Button clicked'); // This will confirm if the event is being triggered
        if (event.target.classList.contains('remove-item')) {
            const cartID = event.target.getAttribute('data-id');
            console.log(`Removing CartID: ${cartID}`); // This will log the CartID value

            // Remove the item from the cart
            const removed = await removeFromCart(cartID);

            if (removed) {
                const row = event.target.closest('tr'); // Find the row containing the button
                row.remove(); // Remove the row from the table
            }
        }
    });

    // Handle checkout button click to move items to inventory and clear the cart
    document.getElementById('checkoutButton').addEventListener('click', async () => {
        const cartItems = await fetchCartItems(account);

        if (cartItems.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        // Immediately clear the cart table in the front-end and hide total price
        const cartTableBody = document.querySelector("#cartTable tbody");
        const totalPriceElement = document.getElementById('totalPrice');

        // Clear the cart and hide total price
        cartTableBody.innerHTML = "";
        if (totalPriceElement) {
            totalPriceElement.textContent = "";
        }

        // Process purchase: Add each item to the inventory and remove from cart
        for (const item of cartItems) {
            // Add to inventory
            await addToInventory(account, item);

            // Remove the item from the cart
            await removeFromCart(item.CartID);
        }

        // Re-render the cart table (now empty)
        CartTable();
        alert("Purchase successful! Items have been added to your inventory.");
    });

    // Fetch current cart items for purchase
    async function fetchCartItems(username) {
        const response = await fetch('http://localhost:3000/cart_list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username })
        });

        const data = await response.json();
        return data.error ? [] : data.data;
    }

    // Add to inventory function
    async function addToInventory(username, item) {
        const apiUrl = 'http://localhost:3000/move_cart_to_inventory';
        const inventoryItem = {
            username  // Assuming 1 quantity for each game added
        };
    
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inventoryItem),
            });
    
            const data = await response.json();
    
            if (data.error) {
                console.error('Error adding to inventory:', data.message);
            }
        } catch (error) {
            console.error('Error adding to inventory:', error);
        }
    }
});

function goToSearchPage() {
    //     // Redirect to the /purchase page if quantity is available
        window.location.href = "/purchase";
    }
    document.addEventListener("DOMContentLoaded", () => {
        const buyButton = document.getElementById("checkoutButton")
    
        if (buyButton) {
            buyButton.addEventListener("click", goToSearchPage);
        }
    });
