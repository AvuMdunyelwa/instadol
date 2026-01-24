import {renderGrid,createImageCard, createMemberCard, createAlbumCard, imageView, imgView} from './imageCards.js';
import { createCalendar } from "./calendar.js";
import { hamburger } from '../hamburgerMenu.js';
import {createElements} from './createElements.js';

const gallery = document.querySelector('#gallery');
const members = document.querySelector('#members');
const albums = document.querySelector('#albums');
const pageTitle = document.querySelector('title');
let artistID;


//get dataset id
function getArtistID() {
    const artistURLparam = new URLSearchParams(window.location.search);
    const returnArtistID = artistURLparam.get('id');
    artistID = returnArtistID;
    console.log(artistID);
};
getArtistID()

//data display
async function dataRetrieval() {
    try {
        const response = await fetch('../../artistData/artistData.json');
        const data = await response.json();
        const artist0 = data;
        loadData(artist0);
    }
    catch(error) {
        return error;
    }
    
}
dataRetrieval();

function loadData(data) {
    profileDisplay(data);
    data.forEach(element => {
        if(element.ID == artistID) {
            renderGrid(element.feedImages, gallery, createImageCard);
            renderGrid(element.members, members, createMemberCard);
            renderGrid(element.albums, albums, createAlbumCard);
            imageView();
            imgView(element.members);
        }

    })
    
}

//artist profile page
function profileDisplay(artists) {
    
    artists.forEach(artist => {
        if(artist.ID == artistID) {
            pageTitle.innerHTML = `${artist.name} | instadol`;
            const headerWrapper = document.querySelector('#header');
            const asideContent = document.querySelector('aside');

            //creating profile elements
            const profilePic = createElements('img', {className: 'profile-Image', text: null, src: artist.profileImage});        
            const userName = createElements('h1', {className: 'user-name', text: artist.name, src: null});
            const profileInfo = createElements('p', {className: 'info-about-profile', text: `${artist.listeners}+ monthly listeners <br> ${artist.agency} entertainment`, src: null});
            profileInfo.style.color = 'rgb(247, 247, 247)';

            asideContent.append(userName, profileInfo);
            headerWrapper.append(profilePic, asideContent);

    }
    })
}

//body tabs
const tabs = document.querySelectorAll('#body-menu ul li');
const tabContent = document.querySelectorAll('#main-body .tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {

        //hide content correspondance with tab
        tabContent.forEach(content => {
            content.classList.remove('display');
            content.classList.add('hide');
        });
        
        //highlight active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        //display active tab
        const tabName = tab.dataset.tab;
        const contentDisplay = document.getElementById(tabName);
        contentDisplay.classList.remove('hide');
        contentDisplay.classList.add('display');

    });
});




