function sendSearch() {
    
    const breedName = document.getElementById('breedsearch').value;

    localStorage.setItem("Search_data", breedName);
}
let find = true;

const breedName = localStorage.getItem("Search_data");
if(breedName !=''){
    find = false;
    document.getElementById('breedsearch').value = breedName;
    fetch(`http://localhost:3125/search?query=${encodeURIComponent(breedName)}`)
    .then(response => response.json())
    .then(data => {
        const breedsList = document.getElementById('breeds-list');
        const content = data.map(breed => `
            <div class="breed">
                <img src="${breed.image_url}" alt="${breed.breed_name}" class="img_class">
                <div class="breed-info">
                    <h2>${breed.breed_name}</h2>
                    <div class="breed-details">
                        <p><strong>Group:</strong> ${breed.group}</p>
                        <p><strong>Origin:</strong> ${breed.origin}</p>
                        <p><strong>Size:</strong> ${breed.size}</p>
                    </div>
                    <p><strong>Coat Length:</strong> ${breed.coat_length}</p>
                    <p><strong>Temperament:</strong> ${breed.temperament.join(', ')}</p>
                    <p><strong>Life Expectancy:</strong> ${breed.life_expectancy}</p>
                    <p><strong>Kid Friendly:</strong> ${breed.kid_friendly}</p>
                    <p><strong>Exercise Needs:</strong> ${breed.exercise_needs}</p>
                    <p><strong>Favorite Activities:</strong> ${breed.favorite_activities.join(', ')}</p>
                    <p><strong>Trainability:</strong> ${breed.trainability}</p>
                    <p><strong>Apartment Living:</strong> ${breed.adapts_well_to_apartment_living}</p>
                    <p><strong>Health Concerns:</strong> ${breed.health_concern}</p>
                </div>
            </div>
        `).join('');
        breedsList.innerHTML = content;
    })
    .catch(error => {
        
        console.error('Error fetching data:', error);
    });
}

if(find){
    fetch('http://localhost:3125')
    .then(response => response.json())
    .then(data => {
        const breedsList = document.getElementById('breeds-list');
        const content = data.map(breed => `
            <div class="breed">
                <img src="${breed.image_url}" alt="${breed.breed_name}" class="img_class">
                <div class="breed-info">
                    <h2>${breed.breed_name}</h2>
                    <div class="breed-details">
                        <p><strong>Group:</strong> ${breed.group}</p>
                        <p><strong>Origin:</strong> ${breed.origin}</p>
                        <p><strong>Size:</strong> ${breed.size}</p>
                    </div>
                    <p><strong>Coat Length:</strong> ${breed.coat_length}</p>
                    <p><strong>Temperament:</strong> ${breed.temperament.join(', ')}</p>
                    <p><strong>Life Expectancy:</strong> ${breed.life_expectancy}</p>
                    <p><strong>Kid Friendly:</strong> ${breed.kid_friendly}</p>
                    <p><strong>Exercise Needs:</strong> ${breed.exercise_needs}</p>
                    <p><strong>Favorite Activities:</strong> ${breed.favorite_activities.join(', ')}</p>
                    <p><strong>Trainability:</strong> ${breed.trainability}</p>
                    <p><strong>Apartment Living:</strong> ${breed.adapts_well_to_apartment_living}</p>
                    <p><strong>Health Concerns:</strong> ${breed.health_concern}</p>
                </div>
            </div>
        `).join('');
        breedsList.innerHTML = content;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}



 