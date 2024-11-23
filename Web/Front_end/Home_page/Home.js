        fetch('http://localhost:3125/')
        .then(response => response.json())
        .then(data => {
            const breedsList = document.getElementById('breeds-list');
            const content = data.map(breed => `
                <div class="breed">
                    <img src="${breed.image_url}" alt="${breed.breed_name}" class="img_class">
                    <h2>${breed.breed_name}</h2>
                </div>
            `).join('');
            breedsList.innerHTML = content;
           
        })
        function sendSearch() {
            // Get the value from the input field
            const breedName = document.getElementById('breedsearch').value;
        
            localStorage.setItem("Search_data", breedName);
        
            console.log("Searching for:", breedName);
        
        
        }
           