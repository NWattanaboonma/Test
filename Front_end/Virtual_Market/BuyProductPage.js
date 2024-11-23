const productNameElement = document.getElementById('productName');
const productDescriptionElement = document.getElementById('productDescription');
const productPriceElement = document.getElementById('productPrice');
const productQuantityDisplay = document.getElementById('productQuantityDisplay');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const buyNowButton = document.getElementById('buyNowButton');
const buyQuantityInput = document.getElementById('productQuantity');
const totalPriceElement = document.getElementById('totalPrice');

let selectedProduct = null;


async function searchProduct() {
    const itemname = document.getElementById('searchInput').value; 
    
    sessionStorage.setItem(`${itemname}`,itemname);
    if (!itemname) {
        alert('Please enter a product name or ID to search.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ItemName: itemname }),
        });
       
        if (response.ok) {
            const product = await response.json(); 
            updateProductDetails(product); 
        } else if (response.status === 404) {
            alert('Product not found.');
            updateProductDetails(null); 
        } else {
            alert('Failed to fetch product. Please try again later.');
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        alert('An error occurred while fetching product data.');
    }
}

function updateProductDetails(product) {
    product = product.data;
    if (product) {
        selectedProduct = product; 
        document.getElementById('productName').innerText = product.ItemName;
        document.getElementById('productDescription').innerText = product.ItemDescription || 'No description available';
        document.getElementById('productPrice').innerText = product.Price || '0.00';
        document.getElementById('productQuantityDisplay').innerText = product.Quantity || '0';

        // Initialize the total price based on the initial quantity input
        updateTotalPrice();
    } else {
        // Clear product details if no product found
        document.getElementById('productName').innerText = 'Product Name';
        document.getElementById('productDescription').innerText = 'Description';
        document.getElementById('productPrice').innerText = '0.00';
        document.getElementById('totalPrice').innerText = '0.00';
        document.getElementById('productQuantityDisplay').innerText = '0';
    }
}

// Add event listener to the search button
document.getElementById('searchButton').addEventListener('click', searchProduct);

// Update total price based on the quantity entered
function updateTotalPrice() {
    const quantity = parseInt(buyQuantityInput.value);
    if (quantity <= 0 || isNaN(quantity) || !selectedProduct) return;

    // Calculate the total price based on the selected product price and quantity
    const totalPrice = selectedProduct.Price * quantity;
    totalPriceElement.textContent = totalPrice.toFixed(2); // Display the total price
}

// Update total price in real-time when quantity input changes
buyQuantityInput.addEventListener('input', () => {
    updateTotalPrice(); // Call the function every time the quantity changes
});

// Validate and handle purchase
buyNowButton.addEventListener('click', () => {
    const buyQuantity = parseInt(buyQuantityInput.value);

    // Check if the product is selected
    if (!selectedProduct) {
        alert("No product selected.");
        return;
    }

    // Check if the product is out of stock
    if (selectedProduct.quantity === 0) {
        alert("Sorry, this product is out of stock.");
        return; // Prevent redirection if the product is out of stock
    }

    // Validate the entered quantity
    if (isNaN(buyQuantity) || buyQuantity <= 0) {
        alert("Invalid quantity. Please enter a valid number.");
        return; // Prevent redirection if the quantity is invalid
    }

    // Check if the user-entered quantity exceeds available stock
    if (buyQuantity > selectedProduct.Quantity) {
        alert(`Requested quantity exceeds available stock. Only ${selectedProduct.Quantity} item(s) available.`);
        return; // Prevent the redirection if the quantity exceeds stock
    }
    // If the quantity is valid and does not exceed stock, update the product quantity
    selectedProduct.quantity -= buyQuantity;
    productQuantityDisplay.textContent = selectedProduct.quantity;

    // Now you can proceed to the purchase page
    window.location.href = "/purchase";  // Redirect to the purchase page
});


function goToSearchPage() {
    //     // Redirect to the /purchase page if quantity is available
        window.location.href = "/purchase";
    }
    document.addEventListener("DOMContentLoaded", () => {
        const buyButton = document.getElementById("success")
    
        if (buyButton) {
            buyButton.addEventListener("click", goToSearchPage);
        }
});