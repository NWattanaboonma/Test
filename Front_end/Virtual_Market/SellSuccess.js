document.addEventListener('DOMContentLoaded', async () => { // Declare the function as async
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
    

    let account; // Declare account variable in the outer scope
    await fetchUserList(); // Await the fetchUserList function
    console.log("Account:", account); // Log account after it's set



    const saleDetails = {
        customerName: "John Doe",
        itemName: "The Legend of Zelda: Breath of the Wild",
        salePrice: 1290.00,
        cardType: "Visa",
        lastFourDigits: "1234",
        transactionId: "TX1234567890",
        transactionDate: "November 15, 2024"
    };

    // Display sale details on the confirmation page
    document.getElementById('customerName').innerText = saleDetails.customerName;
    document.getElementById('itemName').innerText = saleDetails.itemName;
    document.getElementById('salePrice').innerText = `$${saleDetails.salePrice.toFixed(2)}`;
    document.getElementById('paymentMethod').innerText = `${saleDetails.cardType} ending in ${saleDetails.lastFourDigits}`;
    document.getElementById('transactionId').innerText = saleDetails.transactionId;
    document.getElementById('transactionDate').innerText = saleDetails.transactionDate;
});


function goToSearchPage() {
    //     // Redirect to the /purchase page if quantity is available
        window.location.href = "/Home";
    }
    document.addEventListener("DOMContentLoaded", () => {
        const buyButton = document.getElementById("success")
    
        if (buyButton) {
            buyButton.addEventListener("click", goToSearchPage);
        }

});