import {renderGrid,createImageCard, createMemberCard, createAlbumCard, imageView, imgView} from './imageCards.js';
import { createCalendar } from "./calendar.js";
import { hamburger } from '../hamburgerMenu.js';

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
            const profilePic = document.createElement('img');
            profilePic.src = artist.profileImage;
        
            const userName = document.createElement('h1');
            userName.classList.add('user-name');
            userName.innerHTML = artist.name;
        
            const profileInfo = document.createElement('p');
            profileInfo.classList.add('info-about-profile');
            profileInfo.innerHTML = `${artist.listeners}+ monthly listeners <br> ${artist.agency} entertainment`;
            profileInfo.style.color = 'rgb(247, 247, 247)';

            asideContent.append(userName, profileInfo);
            headerWrapper.append(profilePic, asideContent);

    }
    })
}

function assembleElemnts(element) {

}

function createElement({type= null, className= null, text= null, src=null}) {
    const element = document.createElement(type);
    element.classList.add(className);
    element.innerHTML = text;
    element.scr = src
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


