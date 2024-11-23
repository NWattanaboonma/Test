document.addEventListener("DOMContentLoaded", async () => {
    let account;
    let Sell_items;
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

    await fetchUserList();
    console.log("Account:", account); // Log account after it's set

    let selectedProduct = null; // Initialize selectedProduct as null

    // Function to update product details
    async function updateProductDetails(product) {
        if (product) {
            selectedProduct = product;  // Store the selected product
            // Update the product details on the UI
            document.getElementById('productName').innerText = product.ItemName;
            document.getElementById('productPrice').innerText = `$${product.Price}`;  // Format price to 2 decimals
            document.getElementById('productQuantityDisplay').innerText = product.Quantity || '0';

            // Initialize the total price based on the initial quantity input
            updateTotalPrice(product); // Ensure total price is updated
        } else {
            // If no product is provided, clear product details
            document.getElementById('productName').innerText = 'Product Name';
            document.getElementById('productPrice').innerText = '$0.00';
            document.getElementById('totalPrice').innerText = '$0.00';
            document.getElementById('productQuantityDisplay').innerText = '0';
        }
    }

    // Added function to update inventory details in the UI
    function updateInventoryDetails(inventoryData) {
        if (inventoryData && inventoryData.length > 0) {
            // Clear any previous error messages
            document.getElementById('errorMessage')?.remove();
            
            // Update UI with the first product found
            const product = inventoryData[0];
            updateProductDetails(product);
        } else {
            // Clear product details
            updateProductDetails(null);
            
            // Display error message
            const errorDiv = document.createElement('div');
            errorDiv.id = 'errorMessage';
            errorDiv.className = 'error-message';
            errorDiv.innerText = 'No product found with the specified name.';
            
            // Insert error message after the search input
            const searchInput = document.getElementById('searchInput');
            searchInput.parentNode.insertBefore(errorDiv, searchInput.nextSibling);
        }
    }

    async function searchInventory() {
        const username = account; 
        const itemName = document.getElementById('searchInput').value; 
        Sell_items= itemName;
        // Validate if both fields are filled
        if (!username || !itemName) {
            alert('Please enter both Customer Username and Item Name');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/sell_item_inventory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, itemName })
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Inventory data:', result.data); 
                updateInventoryDetails(result.data);
                // If there's a product to update, call updateProductDetails
                if (result.data && result.data.length > 0) {
                    updateProductDetails(result.data[0]); // Assuming the first product is the one you want to display
                }
            } else if (response.status === 404) {
                updateInventoryDetails(null);
            } else {
                // Handle other possible errors
                console.error('Server error:', response.status);
                alert('An error occurred while searching the inventory. Please try again.');
            }
        } catch (error) {
            console.error('Error fetching inventory:', error);
            alert('An error occurred while searching the inventory. Please try again.');
        }
    }

    // Function to update the total price based on the selected quantity
    function updateTotalPrice(product) {
        if (product) {
            const sellQuantity = parseInt(document.getElementById('sellQuantity').value, 10);
            
            // Ensure sellQuantity is a valid number
            if (isNaN(sellQuantity) || sellQuantity <= 0) {
                document.getElementById('totalPrice').innerText = '$0.00';
                return;
            }
    
            // Check if sellQuantity is more than available stock
            if (sellQuantity > product.Quantity) {
                document.getElementById('totalPrice').innerText = 'Not enough stock available';
                // Optionally, disable the "Sell" button or redirect to a different page
                document.getElementById('sellButton').disabled = true; // Disable the sell button
            } else {
                const totalPrice = product.Price * sellQuantity;
                document.getElementById('totalPrice').innerText = `$${totalPrice.toFixed(2)}`;
                // Enable the "Sell" button if quantity is valid
                // document.getElementById('sellButton').disabled = false;
            }
        }
    }
    
    // Add event listener to the sell quantity input to update price in real-time
    document.getElementById('sellQuantity').addEventListener('input', () => {
        updateTotalPrice(selectedProduct); // Update the total price when quantity is changed
    });

    // Add event listener to your search button
    document.getElementById('searchButton').addEventListener('click', searchInventory);

    // New function to validate quantity before redirecting
    function validateQuantityBeforeRedirect() {
        const sellQuantity = parseInt(document.getElementById('sellQuantity').value, 10);

        // If the sellQuantity exceeds the available stock, show an alert but still update the price
        if (sellQuantity > selectedProduct.Quantity) {
            alert('Error: Not enough stock available.');
            document.getElementById('totalPrice').innerText = 'Error: Not enough stock available';
            // Disable the "Sell" button or show an error state if necessary
            document.getElementById('sellButton').disabled = true; // Optional: disable the sell button
        } else {
            // Update the price as usual
            updateTotalPrice(selectedProduct);
            document.getElementById('sellButton').disabled = false; // Enable the sell button if stock is sufficient
        }
    }

    // Modified goToSearchPage function to include validation
    function goToSearchPage() {
        // console.log("test");
        const sellQuantity = parseInt(document.getElementById('sellQuantity').value, 10);

        // Check if the quantity exceeds the available stock
        if (sellQuantity > selectedProduct.Quantity) {
            alert('Error: Not enough stock available.');
            return; // Prevent redirection if quantity exceeds available stock
        }

        // Proceed with redirection if the quantity is valid
        const sellItem = async (username, itemName) => {
            try {
              const response = await fetch('http://localhost:3000/sell_inventory_item', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, itemName })
              });
          
              const result = await response.json();
          
              if (response.ok) {
                console.log("Success:", result.message);
                console.log("Deleted Item:", result.deletedItem);
              } else {
                console.error("Error:", result.message);
                if (result.details) {
                  console.error("Details:", result.details);
                }
              }
            } catch (error) {
              console.error("Fetch error:", error.message);
            }
          };
          // Usage
          sellItem(account, Sell_items);

        window.location.href = "/sell_success";
    }

    // Add event listener to the "Buy" button
    const buyButton = document.getElementById("sellNowButton");
    if (buyButton) {
        buyButton.addEventListener("click", goToSearchPage);
    }
});
