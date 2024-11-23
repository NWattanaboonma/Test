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

    await fetchUserList();
    console.log("Account:", account); // Log account after it's set

    // code other more under here;
    const productLists = document.querySelector('.productLists');
    const comingSoon = document.querySelector('.comming-soon');

    const fetchInventory = async (username) => {
        const apiUrl = 'http://localhost:3000/inventory';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username }),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            if (data.error) {
                console.error('API Error:', data.message);
            }

            return data;
        } catch (error) {
            console.error('Fetch Error:', error);
        }
    };

    const renderInventory = async () => {
        if (!account) {
            console.warn("No account found for the current session.");
            comingSoon.style.display = 'block';
            productLists.innerHTML = '';
            return;
        }

        const data = await fetchInventory(account);
        console.log(data);
        if (!data || data.error || data.data.length === 0) {
            comingSoon.style.display = 'block';
            productLists.innerHTML = '';
            return;
        }

        comingSoon.style.display = 'none';

        data.data.forEach((item) => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            const price = parseFloat(item.Price);
            productCard.innerHTML = `
                <div class="product-img">
            <img src="${item.img || 'https://via.placeholder.com/150'}" alt="${item.GameName || item.ItemName}">
            </div>
            <div class="product-details">
                <h3>${item.GameName || item.ItemName}</h3>
                <p>Price: $${!isNaN(price) ? price.toFixed(2) : "N/A"}</p>
                <p>Quantity: ${item.Quantity}</p>
                <p>Purchase Date: ${new Date(item.PurchaseDate).toLocaleDateString()}</p>
                <p>Type: ${item.ProductType}</p>
            </div>
            `;

            productLists.appendChild(productCard);
        });
    };

    // Render inventory after account is set
    renderInventory();


});