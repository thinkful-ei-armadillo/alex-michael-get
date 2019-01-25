'use strict';

function displayDogImages(responseJson) {
    const imagesArr = responseJson.message.map(imgSrc => imgSrc);
    console.log(imagesArr);
    const imagesHtml = imagesArr.map(imgSrc => {
        return `<img src="${imgSrc}">`; 
    });
    $('.results').html(imagesHtml);
}

function validateUrl(responseJson) {
    if (responseJson.code === "404") {
        throw new TypeError('Breed not found. 404.')
    }
}

function getDogImage(num,breed) {
    fetch(breed ? `https://dog.ceo/api/breed/${breed}/images/random/${num}` : `https://dog.ceo/api/breeds/image/random/${num}`)
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson);
            validateUrl(responseJson);
            displayDogImages(responseJson);
        })
        .catch(error => alert(`Something went wrong. Try again later. ${error}`));
}

function main() {
    $('form').submit(event => {
        event.preventDefault();
        const numberOfDogs = $('input[type=number]').val();
        const breedOfDogs = $('input[type=text]').val().toLowerCase();
        if (breedOfDogs) { $('form').trigger('reset');}
        getDogImage(numberOfDogs, breedOfDogs);
    });
}

$(main);