document.addEventListener("DOMContentLoaded", () => {
    const buyButton = document.getElementById("buy");
    const sellButton = document.getElementById("sell");

    if (buyButton) {
        buyButton.addEventListener("click", goToSearchPage);
    }

    if (sellButton) {
        sellButton.addEventListener("click", goToSellPage); // Add event listener for Sell
    }
});

function goToSearchPage() {
    // Redirect to the /product page
    window.location.href = "/product"; 
}

function goToSellPage() {

    window.location.href = "/sell_Items"; 
}
