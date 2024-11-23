// document.addEventListener('DOMContentLoaded', () => {
//     // Extract product name from the URL
//     const params = new URLSearchParams(window.location.search);
//     const productName = decodeURIComponent(params.get('name'));

//     let products = null;

//     // API URL to fetch all products
//     const apiUrl = "http://localhost:3000/products";

//     // Function to fetch all products
//     function getProducts() {
//         fetch(apiUrl)
//             .then((res) => {
//                 if (!res.ok) {
//                     throw new Error(`HTTP error! Status: ${res.status}`);
//                 }
//                 return res.json();
//             })
//             .then((data) => {
//                 products = data.data;
//                 if (!products || products.length === 0) {
//                     throw new Error("No products found");
//                 }
//                 showDetail();
//             })
//             .catch((error) => {
//                 console.error("Error fetching products:", error);
//                 // Handle error (e.g., display an error message to the user)
//                 const errorElement = document.getElementById('error-message');
//                 if (errorElement) {
//                     errorElement.innerText = "Failed to load product details. Please try again later.";
//                 }
//             });
//     }

//     // Function to display product details
//     function showDetail() {
//         // Find the product matching the `productName` from URL
//         const product = products.find(p => p.GameName === productName);
//         if (!product) {
//             console.error("Product not found:", productName);
//             const errorElement = document.getElementById('error-message');
//             if (errorElement) {
//                 errorElement.innerText = "Product not found.";
//             }
//             return;
//         }

//         // Update product details on the page
//         document.getElementById('productTitle').innerText = product.GameName || "N/A";
//         document.getElementById('productImage').src = product.ImageURL || "";
//         document.getElementById('productprice').innerText = `$${product.GamePrice || "0.00"}`;
//         document.getElementById('productDescription').innerText = product.GameDescription || "No description available.";
//         document.getElementById('productSpecification').innerText = product.GameSpecification || "N/A";
//         document.getElementById('productGenre').innerText = product.GameGenre || "N/A";
//         document.getElementById('productFeatures').innerText = product.GameFeatures || "N/A";
//         document.getElementById('productPatch').innerText = product.GamePatch || "N/A";
//         document.getElementById('productRating').innerText = product.GameRatingscore || "N/A";
//         document.getElementById('productReview').innerText = product.GameReview || "N/A";
//         document.getElementById('productPackage').innerText = product.GamePackage || "N/A";
//         document.getElementById('productDeveloper').innerText = product.DeveloperName || "N/A";
//     }

//     // Fetch products when the page is fully loaded
//     window.onload = getProducts;

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
// document.addEventListener('DOMContentLoaded', () => {
//     // Extract product name from the URL
//     const params = new URLSearchParams(window.location.search);
//     const productName = decodeURIComponent(params.get('name'));

//     let products = null;
//     let account = null;

//     // API URL to fetch all products
//     const apiUrl = "http://localhost:3000/products";

//     // Function to fetch all products
//     function getProducts() {
//         fetch(apiUrl)
//             .then((res) => {
//                 if (!res.ok) {
//                     throw new Error(`HTTP error! Status: ${res.status}`);
//                 }
//                 return res.json();
//             })
//             .then((data) => {
//                 products = data.data;
//                 if (!products || products.length === 0) {
//                     throw new Error("No products found");
//                 }
//                 showDetail();
//             })
//             .catch((error) => {
//                 console.error("Error fetching products:", error);
//                 // Handle error (e.g., display an error message to the user)
//                 const errorElement = document.getElementById('error-message');
//                 if (errorElement) {
//                     errorElement.innerText = "Failed to load product details. Please try again later.";
//                 }
//             });
//     }

//     // Function to display product details
//     function showDetail() {
//         // Find the product matching the `productName` from URL
//         const product = products.find(p => p.GameName === productName);
//         if (!product) {
//             console.error("Product not found:", productName);
//             const errorElement = document.getElementById('error-message');
//             if (errorElement) {
//                 errorElement.innerText = "Product not found.";
//             }
//             return;
//         }

//         // Update product details on the page
//         document.getElementById('productTitle').innerText = product.GameName || "N/A";
//         document.getElementById('productImage').src = product.ImageURL || "";
//         document.getElementById('productprice').innerText = `$${product.GamePrice || "0.00"}`;
//         document.getElementById('productDescription').innerText = product.GameDescription || "No description available.";
//         document.getElementById('productSpecification').innerText = product.GameSpecification || "N/A";
//         document.getElementById('productGenre').innerText = product.GameGenre || "N/A";
//         document.getElementById('productFeatures').innerText = product.GameFeatures || "N/A";
//         document.getElementById('productPatch').innerText = product.GamePatch || "N/A";
//         document.getElementById('productRating').innerText = product.GameRatingscore || "N/A";
//         document.getElementById('productReview').innerText = product.GameReview || "N/A";
//         document.getElementById('productPackage').innerText = product.GamePackage || "N/A";
//         document.getElementById('productDeveloper').innerText = product.DeveloperName || "N/A";
//     }

//     // Function to fetch user list
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

//             console.log("Account:", account); // Log account after fetching is complete

//         } catch (error) {
//             console.error("Fetch error:", error);
//         }
//     };

//     // Fetch products and user list when the page is fully loaded
//     window.onload = () => {
//         getProducts();
//         fetchUserList();
//     };
//     function add(account, productName, productPrice) {
//         // Check if all required parameters are provided
//         if (!account || !productName || !productPrice) {
//             console.error("Missing required fields: account, productName, or productPrice.");
//             return;
//         }
    
//         // API URL to add the item to the cart
//         const apiUrl = 'http://localhost:3000/add_to_Cart';
    
//         // Payload for the POST request
//         const payload = {
//             CustomerUsername: account,
//             GameName: productName,
//             GamePrice: productPrice,
//         };
    
//         // Make a POST request to the server
//         fetch(apiUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(payload),
//         })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 if (data.error) {
//                     console.error("Error adding to cart:", data.message);
//                     alert("Failed to add item to the cart. Please try again.");
//                     return;
//                 }
//                 console.log("Item added to cart successfully:", data.message);
//                 alert("Item added to cart!");
//             })
//             .catch((error) => {
//                 console.error("Error in add function:", error);
//                 alert("Failed to add item to the cart. Please try again.");
//             });
//     }
// });


document.addEventListener('DOMContentLoaded', () => {
    // Extract product name from the URL
    const params = new URLSearchParams(window.location.search);
    const productName = decodeURIComponent(params.get('name'));

    let products = null;
    let account = null;

    // API URL to fetch all products
    const apiUrl = "http://localhost:3000/products";

    // Function to fetch all products
    function getProducts() {
        fetch(apiUrl)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                products = data.data;
                if (!products || products.length === 0) {
                    throw new Error("No products found");
                }
                showDetail();
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                const errorElement = document.getElementById('error-message');
                if (errorElement) {
                    errorElement.innerText = "Failed to load product details. Please try again later.";
                }
            });
    }

    // Function to display product details
    function showDetail() {
        // Find the product matching the `productName` from URL
        const product = products.find(p => p.GameName === productName);
        if (!product) {
            console.error("Product not found:", productName);
            const errorElement = document.getElementById('error-message');
            if (errorElement) {
                errorElement.innerText = "Product not found.";
            }
            return;
        }

        // Update product details on the page
        document.getElementById('productTitle').innerText = product.GameName || "N/A";
        document.getElementById('productImage').src = product.ImageURL || "";
        document.getElementById('productprice').innerText = `$${product.GamePrice || "0.00"}`;
        document.getElementById('productDescription').innerText = product.GameDescription || "No description available.";
        document.getElementById('productSpecification').innerText = product.GameSpecification || "N/A";
        document.getElementById('productGenre').innerText = product.GameGenre || "N/A";
        document.getElementById('productFeatures').innerText = product.GameFeatures || "N/A";
        document.getElementById('productPatch').innerText = product.GamePatch || "N/A";
        document.getElementById('productRating').innerText = product.GameRatingscore || "N/A";
        document.getElementById('productReview').innerText = product.GameReview || "N/A";
        document.getElementById('productPackage').innerText = product.GamePackage || "N/A";
        document.getElementById('productDeveloper').innerText = product.DeveloperName || "N/A";

        // Setup add to cart button after product details are loaded
        setupAddToCartButton(product);
    }

    // Function to fetch user list
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
                    account = user.Name;
                }
            });

            console.log("Account:", account);

        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    // Function to add item to cart
    async function addToCart(product) {
        if (!account) {
            alert("Please login first!");
            return;
        }

        if (!product || !product.GameName || !product.GamePrice) {
            console.error("Invalid product information");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/add_to_Cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    CustomerUsername: account,
                    GameName: product.GameName,
                    GamePrice: product.GamePrice,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.error) {
                throw new Error(data.message);
            }

            alert("Item added to cart successfully!");
            console.log("Added to cart:", data);

        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Failed to add item to cart. Please try again.");
        }
    }

    // Function to setup add to cart button
    function setupAddToCartButton(product) {
        const addToCartButton = document.getElementById('addToCartButton');
        if (addToCartButton) {
            addToCartButton.addEventListener('click', () => {
                addToCart(product);
                window.location.href='/Home/Cart';
            });
        }
    }

    // Initialize everything when page loads
    async function initialize() {
        await fetchUserList();  // Wait for user list to be fetched first
        getProducts();         // Then get products
    }

    // Start initialization when page is loaded
    initialize();
});