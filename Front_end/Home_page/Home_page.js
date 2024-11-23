document.addEventListener("DOMContentLoaded", async () => {
    fetch('http://localhost:3000/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(result => result.json())
    .then(data => {
        console.log(data);  // Log the fetched data to check its structure
        const products = data.data;  // Ensure 'data' contains the 'data' array
        const list = document.getElementById("list");

        // Loop through each product and create HTML dynamically
        products.forEach(product => {
            const images = product.Img || 'default-image.jpg';  // Use a default image if product.Img is undefined or invalid
            const name = product.GameName;
            const des = product.GameDescription;
            const prices = product.GamePrice;
            const spec = product.GameSpecification;
            const genre = product.GameGenre;
            const feature = product.GameFeatures;
            const devName = product.DeveloperName;
            const patch = product.GamePatch;
            const rating = product.GameRatingscore;
            const review = product.GameReview;
            const package = product.GamePackage;
            const DevID = product.DeveloperID;

            list.innerHTML += `
                <div onclick="gotopage('${name}')" >
                <div class='box' >
                    <div id="number"><img src="${images}" alt="Product Image" class="product-image"></div>
                    <div class="product-info">
                        <div class="product-details">
                            <p><span class="name">${name}</span>, <span class="description">Description: ${des}</span></p>
                            <p><span class="price">Price: ${prices}</span>, Specification: ${spec}</p>
                            <p class="genre">Genre: ${genre}</p>
                            <p class="feature">Feature: ${feature}</p>
                            <p class="devName">Developer Name: ${devName}, Developer ID: ${DevID}</p>
                            <p class="patch">Patch: ${patch}</p>
                            <p class="package">Package: ${package}</p>
                            <p class="rate">Rating: ${rating}, Review: ${review}</p>
                        </div>  
                    </div>
                </div>
                </div>
            `;
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error); 
    });
});

function gotopage(data) { 
    const queryString = new URLSearchParams({ name: data }).toString();
    console.log(queryString);
    window.location.href = '/Product_page?' + queryString;
}