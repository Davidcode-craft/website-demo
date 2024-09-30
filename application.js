
// Function to get URL parameters
function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get('name'),
        age: params.get('age'),
        size: params.get('size'),
        gender: params.get('gender'),
        image: params.get('image')
    };
}

// Set the dog data in the adoption page
const dogData = getURLParams();
document.getElementById('petName').textContent = dogData.name;
document.getElementById('petAge').textContent = dogData.age;
document.getElementById('petSize').textContent = dogData.size;
document.getElementById('petGender').textContent = dogData.gender;
document.getElementById('petImage').src = dogData.image;