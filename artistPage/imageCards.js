import {createElements} from './createElements.js';
//image-gallery
function renderGrid(data, container, createCard) {
    container.innerHTML = '';
        data.forEach(item => {
            const card = createCard(item);
            container.appendChild(card);
          
        });
   
}

//image card builder
function createImageCard(feed) {
    const cell = document.createElement('div');
    cell.classList.add('gallery_cell');

    const img = document.createElement('img');
    img.classList.add('imageCell');
    img.src = feed.image;
    img.alt = feed.imageAbout;

    cell.appendChild(img);
    return cell;
}

//members cards
function createMemberCard(member) {
    const card = createElements('div',{className: 'profile_card', text: null, src: null});
    const img = createElements('img',{className: 'member_img', text: null, src: member.photo});
    img.alt = member.stageName;
    
    const name = createElements('h2',{className: 'member_name', text: member.stageName, src: null});
    memberInfo(member);

    card.append(img, name);
    return card;
}
//album cards
function createAlbumCard(album) {
    const card = createElements('div', {className: 'album_cover', text: null, src: null});
    const img = createElements('img', {className: 'album_img', text: null, src: album.image});
    const albumLink = createElements('a', {className: 'album_link', text: album.name, src: null});
    albumLink.href = album.link;
    albumLink.target = "_blank";

    card.append(img, albumLink);
    return card;
}

// image modal 
function pictureView(src, text) {
    //creating modal
    const modal = createElements('dialog', {className: 'modal', text: null, src: null});
    const modalWrapper = createElements('div', {className: 'modal-wrapper', text: null, src: null});
    const closeModal = createElements('div', {className: 'close-modal', text: null, src: null});
    const imageWrapper = createElements('div', {className: 'image-wrapper', text: null, src: null});
    const closeView = createElements('img', {className: null, text: null, src: '../items/bx-x.svg'});
    const imageView = createElements('img', {className: null, text: null, src: src});
    const imageText = createElements('div', {className: 'backgr-info', text: null, src: null});
    document.querySelector('main').appendChild(modal);

    closeView.onclick = () => {
        modal.remove();
    }

    imageText.append(text);
    closeModal.appendChild(closeView);
    imageWrapper.append(imageView, imageText);

    modalWrapper.append(closeModal, imageWrapper);
    modal.appendChild(modalWrapper);
}

function memberInfo(member, alt) {
    const infoWrapper = document.createElement('div');
    infoWrapper.classList.add('info-Wrapper');
    
    const stageName = document.createElement('h2');
    const name = document.createElement('p');
    const dob = document.createElement('p');
    const height = document.createElement('p');
    const position = document.createElement('p');
    const nationality = document.createElement('p');
    const zodiacSign = document.createElement('p');
    const instagram = document.createElement('p');
    const funFact = document.createElement('p');
    const link = document.createElement('a');
    const instagramLink = document.createElement('div');
    instagramLink.classList.add('links');
    
    
    for(let i = 0; i < member.length; i++) {
        
        if(alt == member[i].stageName) {
            stageName.textContent = member[i].stageName;
            name.textContent = `Birth Name: ${member[i].name}`;
            dob.textContent = `Date of birth: ${member[i].dob}`;
            height.textContent = `Height: ${member[i].height}`;
            position.textContent = `Position: ${member[i].position}`;
            nationality.textContent = `Nationality: ${member[i].nationality}`;
            zodiacSign.textContent = `Zodiac sign: ${member[i].zodiacSign}`;
            link.href = member[i].instagram;
            link.textContent = member[i].instagram_handle;
            link.target = "_blank";
            instagram.textContent = 'instagram:';
            funFact.textContent = `Fun fact: ${member[i].facts}`;

        };
        
    }
    
    instagramLink.style.display = 'flex'
    instagramLink.append(instagram, link);
    infoWrapper.append(stageName,name,dob,height,position,nationality,zodiacSign,instagramLink,funFact);
    return infoWrapper;
}

//image wide view
function imageView() {
    const images = document.querySelectorAll('#gallery img');
    let imgSrc;
    let imgText;

    images.forEach(img => {
        img.addEventListener('click', (e) => {
            imgSrc = e.target.src;
            imgText = e.target.alt;
            pictureView(imgSrc, imgText);
        });
    });
}

//members image wide view
function imgView(arr) {
    const images = document.querySelectorAll('#members img');
    let imgSrc;
    let imgAbout;

    images.forEach(img => {
        img.addEventListener('click', (e) => {
            const imgAlt = e.target.alt;
            imgSrc = e.target.src;
            imgAbout = memberInfo(arr, imgAlt);
            pictureView(imgSrc, imgAbout);
        });
    });
}




export {renderGrid, createImageCard, createMemberCard, createAlbumCard, imageView, imgView};
