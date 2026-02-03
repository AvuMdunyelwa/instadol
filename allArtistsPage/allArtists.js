import { hamburger } from "../hamburgerMenu.js";

const searchInput = document.querySelector('#search');
let allArtists;

async function fetchArtistData() {
    try {
        const response = await fetch('../artistData/artistData.json');
        const data = await response.json();
        allArtists = data;
        pushToArray(allArtists);
    }
    catch(error) {
        return error;
    }
}
fetchArtistData();

//push data to array for easy access
function pushToArray(data) {
    createArtistCard(data);
    searchResults(data);
    searchInput.value = '';
}

function createArtistCard(artistData) {
    const wrapper = document.querySelector('#artists-wrapper');
    wrapper.innerHTML = '';
    
    artistData.forEach(element => {
        viewAllArtists(element);
        wrapper.appendChild(viewAllArtists(element))
    });
}


function viewAllArtists(data) {
    const artistContainer = document.createElement('div');
    const artistProfileLink = document.createElement('a');
    artistProfileLink.classList.add('artist-link');
    
    artistProfileLink.addEventListener('click', (e) => {
        const element = e.target.innerText;
        const currentElement= element.toLowerCase();
        artistProfileLink.href = `../artistPage/artist.html?id=${currentElement}`;
        artistProfileLink.dataset.id = currentElement;
    });
    
    artistContainer.classList.add('artist');
    const nameOfArtist = document.createElement('h2')
    nameOfArtist.classList.add('name-of-artist');
    
    //dom update
    artistContainer.style.backgroundImage = `url(../artistPage/${data.profileImage})`;
    nameOfArtist.innerHTML = data.name;
    
    artistContainer.appendChild(nameOfArtist);
    artistProfileLink.appendChild(artistContainer);
    
    return artistProfileLink;
}


function searchResults(artistData) {
    searchInput.addEventListener('keyup', (e) => {
        let input = e.target.value.toLowerCase();
        const filteredArtists = artistData.filter(artist => 
            artist.name.toLowerCase().includes(input)
        )
        createArtistCard(filteredArtists);
    })
}

