let hasExecuted = false;

document.addEventListener("DOMContentLoaded", async () => {
    // Check if the code has already run
    if (hasExecuted) {
        console.log("Code has already executed");
        return;
    }

    // Set the flag immediately
    hasExecuted = true;

    let account = null;
    let item = null;

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
            // Check sessionStorage once and store the value
            list.forEach(user => {
                const storedUser = sessionStorage.getItem(`${user.Name}`);
                if (user.Name === storedUser) {
                    account = user.Name;
                }
            });
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const fetchItem = async () => {
        const apiUrl = 'http://localhost:3000/item_list';

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
                console.error("Error fetching item list:", data.message);
                return;
            }

            const list = data.data;
            // Check sessionStorage once and store the value
            list.forEach(iteam => {
                const storedItem = sessionStorage.getItem(`${iteam.ItemName}`);
                if (iteam.ItemName === storedItem) {
                    item = iteam.ItemName;
                }
            });
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    // Execute fetches
    await fetchUserList();
    await fetchItem();

    console.log("Account:", account);
    console.log("Item:", item);

    // Only proceed if both account and item are present
    if (account && item) {
        const updateItem = async (itemName, customerUsername) => {
            try {
                const response = await fetch('http://localhost:3000/update_item', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ itemName, customerUsername }),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }

                const message = await response.text();
                console.log('Update item response:', message);
            } catch (error) {
                console.error('Failed to update item:', error);
            }
        };

        const addToInventory = async (itemName, customerUsername) => {
            try {
                const response = await fetch('http://localhost:3000/add_to_inventory', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ itemName, customerUsername }),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }

                const message = await response.text();
                console.log('Add to inventory response:', message);
            } catch (error) {
                console.error('Failed to add item to inventory:', error);
            }
        };

        // Execute both actions sequentially
        await updateItem(item, account);
        await addToInventory(item, account);
        
        // Clear the session storage after successful execution
        sessionStorage.removeItem(`${item}`);
        console.log("Operations completed successfully");
    }
});